import React, { useState, useEffect, useRef, useCallback } from "react";
import { Bell, CheckCircle, AlertTriangle, Info, XCircle, X, Loader, Sliders } from "lucide-react"; 
import clsx from "clsx";

// Icon mapping for different alert types
const alertIcons = {
  success: <CheckCircle className="text-green-500 w-6 h-6" />,
  danger: <XCircle className="text-red-500 w-6 h-6" />,
  warning: <AlertTriangle className="text-yellow-500 w-6 h-6" />,
  info: <Info className="text-blue-500 w-6 h-6" />,
  loading: <Loader className="text-gray-500 w-6 h-6 animate-spin" />, 
  custom: <Sliders className="text-purple-500 w-6 h-6" />, 
};

// Color mapping for different alert types
const alertColors = {
  success: "bg-green-800/80 border-green-600 text-green-200", 
  danger: "bg-red-800/80 border-red-600 text-red-200",
  warning: "bg-yellow-800/80 border-yellow-600 text-yellow-200",
  info: "bg-blue-800/80 border-blue-600 text-blue-200",
  loading: "bg-gray-800/80 border-gray-600 text-gray-200",
  custom: "bg-purple-800/80 border-purple-600 text-purple-200",
};

// Progress bar colors for different alert types
const progressBarColors = {
  success: "bg-green-500",
  danger: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
  loading: "bg-gray-500",
  custom: "bg-purple-500",
};

/**
 * A versatile and visually appealing alert notification component.
 * Supports various types (success, danger, warning, info, loading, custom),
 * auto-dismissal with a progress bar, pause on hover, and custom actions.
 *
 * @param {Array<Object>} alerts 
 * Each object should have:
 * - `id`: A unique identifier for the alert.
 * - `type`: (Optional) 'success', 'danger', 'warning', 'info', 'loading', 'custom'. Defaults to 'info'.
 * - `title`: The main title of the alert.
 * - `message`: The detailed message of the alert.
 * - `duration`: (Optional) How long the alert stays visible in ms. Defaults to 5000ms. Set to 0 for permanent.
 * - `actionText`: (Optional) Text for a clickable action button.
 * - `onActionClick`: (Optional) Callback function when the action button is clicked.
 */
export default function Alerts({ alerts = [] }) {
  const [activeAlerts, setActiveAlerts] = useState([]);
  const timerRefs = useRef({}); 
  const progressRefs = useRef({}); 

  useEffect(() => {
    const newAlertsToAdd = alerts.filter(
      (newAlert) => !activeAlerts.some((existingAlert) => existingAlert.id === newAlert.id)
    );

    if (newAlertsToAdd.length > 0) {
      setActiveAlerts((prev) => [...prev, ...newAlertsToAdd]);
    }
  }, [alerts, activeAlerts]); 

  const removeAlert = useCallback((id) => {
    setActiveAlerts((prev) => prev.filter((alert) => alert.id !== id));
    if (timerRefs.current[id]) {
      clearTimeout(timerRefs.current[id]);
      delete timerRefs.current[id];
    }
  }, []);

  // Manage auto-dismissal timers and progress bar animations for active alerts
  useEffect(() => {
    activeAlerts.forEach((alert) => {
      if (alert.duration > 0 && !timerRefs.current[alert.id]) {
        // Set the auto-dismissal timer
        timerRefs.current[alert.id] = setTimeout(() => {
          removeAlert(alert.id);
        }, alert.duration);

        // Start progress bar animation
        if (progressRefs.current[alert.id]) {
          progressRefs.current[alert.id].style.transition = `width ${alert.duration}ms linear`;
          progressRefs.current[alert.id].style.width = "0%";
        }
      }
    });

    // Cleanup timers when component unmounts or alerts change
    return () => {
      Object.values(timerRefs.current).forEach(clearTimeout);
      timerRefs.current = {}; // Reset ref
    };
  }, [activeAlerts, removeAlert]); // Re-run effect when active alerts change

  const handleMouseEnter = (id) => {
    if (timerRefs.current[id]) {
      clearTimeout(timerRefs.current[id]);
      // Pause the progress bar animation
      if (progressRefs.current[id]) {
        const computedStyle = getComputedStyle(progressRefs.current[id]);
        const currentWidth = computedStyle.width;
        progressRefs.current[id].style.transition = 'none'; // Stop transition
        progressRefs.current[id].style.width = currentWidth; // Maintain current width
      }
    }
  };

  const handleMouseLeave = (alert) => {
    if (alert.duration > 0) {
      // Calculate remaining time for the timer
      // This is a simplification; a more robust solution would track start time
      // For this example, we'll restart the timer, which is usually acceptable
      timerRefs.current[alert.id] = setTimeout(() => {
        removeAlert(alert.id);
      }, alert.duration); // Restart full duration for simplicity

      // Restart progress bar animation
      if (progressRefs.current[alert.id]) {
        const computedStyle = getComputedStyle(progressRefs.current[alert.id]);
        const currentWidth = parseFloat(computedStyle.width) / parseFloat(computedStyle.parent.width) * 100;
        const remainingDuration = (currentWidth / 100) * alert.duration; // Estimate remaining time

        progressRefs.current[alert.id].style.transition = `none`; // Reset transition
        progressRefs.current[alert.id].style.width = `${currentWidth}%`; // Set to current width

        // Force reflow
        void progressRefs.current[alert.id].offsetWidth;

        progressRefs.current[alert.id].style.transition = `width ${remainingDuration}ms linear`;
        progressRefs.current[alert.id].style.width = "0%";
      }
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col space-y-4 w-[90%] max-w-sm">
      {activeAlerts.map((alert) => (
        <div
          key={alert.id}
          className={clsx(
            "relative p-4 rounded-lg shadow-xl border-l-4 flex flex-col overflow-hidden transform translate-x-0 transition-transform duration-300 ease-out",
            alertColors[alert.type || "info"]
          )}
          onMouseEnter={() => handleMouseEnter(alert.id)}
          onMouseLeave={() => handleMouseLeave(alert)}
        >
          {/* Progress Bar (for auto-dismissing alerts) */}
          {alert.duration > 0 && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
              <div
                ref={(el) => (progressRefs.current[alert.id] = el)}
                className={clsx("h-full w-full", progressBarColors[alert.type || "info"])}
                style={{ width: '100%' }} // Initial state for animation
              ></div>
            </div>
          )}

          <div className="flex items-start justify-between space-x-4">
            {/* Icon and Content */}
            <div className="flex items-start space-x-3 flex-grow">
              <div className="flex-shrink-0 mt-0.5">
                {alertIcons[alert.type || "info"]}
              </div>
              <div>
                <p className="font-bold text-lg leading-snug">{alert.title}</p>
                <p className="text-sm leading-normal mt-1 opacity-90">{alert.message}</p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeAlert(alert.id)}
              className="flex-shrink-0 p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-200 ml-2"
              aria-label="Dismiss alert"
              title="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Optional Action Button */}
          {alert.actionText && alert.onActionClick && (
            <button
              onClick={() => {
                alert.onActionClick();
                removeAlert(alert.id); // Dismiss alert after action
              }}
              className="mt-3 px-3 py-1.5 self-end rounded-md text-sm font-semibold bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
              {alert.actionText}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

