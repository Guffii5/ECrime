import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck,
  Eye,
  PhoneCall,
  Lock,
  Key,
  Bell,
  MapPin,
  Camera,
  WifiOff,
  AlertTriangle,
  Home,
  Car,
  Compass,
  Smartphone,
  Lightbulb,
  Users,
  DoorClosed,
  Battery,
  FileCheck,
  Globe,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const tips = [
  { icon: <Eye className="w-6 h-6 text-red-400" />, title: "Stay Alert", description: "Be aware of your surroundings, especially at night or in unfamiliar areas." },
  { icon: <ShieldCheck className="w-6 h-6 text-red-400" />, title: "Secure Valuables", description: "Keep belongings close and avoid displaying expensive items publicly." },
  { icon: <PhoneCall className="w-6 h-6 text-red-400" />, title: "Emergency Contact", description: "Save local police and emergency numbers in your phone for quick access." },
  { icon: <Lock className="w-6 h-6 text-red-400" />, title: "Lock Doors", description: "Always lock your doors and windows when leaving your home." },
  { icon: <Key className="w-6 h-6 text-red-400" />, title: "Protect Keys", description: "Never leave spare keys under mats or obvious hiding spots." },
  { icon: <Bell className="w-6 h-6 text-red-400" />, title: "Use Alarms", description: "Install alarms and security systems to deter intruders." },
  { icon: <MapPin className="w-6 h-6 text-red-400" />, title: "Share Location", description: "Share your live location with trusted friends when traveling alone." },
  { icon: <Camera className="w-6 h-6 text-red-400" />, title: "CCTV Coverage", description: "Install or stay near areas with CCTV for added safety." },
  { icon: <WifiOff className="w-6 h-6 text-red-400" />, title: "Limit Public WiFi", description: "Avoid using public WiFi for sensitive transactions." },
  { icon: <AlertTriangle className="w-6 h-6 text-red-400" />, title: "Trust Instincts", description: "If something feels unsafe, leave the situation immediately." },
  { icon: <Home className="w-6 h-6 text-red-400" />, title: "Neighborhood Watch", description: "Get to know your neighbors and watch out for each other." },
  { icon: <Car className="w-6 h-6 text-red-400" />, title: "Car Safety", description: "Lock your car and never leave valuables in plain sight." },
  { icon: <Compass className="w-6 h-6 text-red-400" />, title: "Know Routes", description: "Familiarize yourself with safe routes before traveling." },
  { icon: <Smartphone className="w-6 h-6 text-red-400" />, title: "Battery Backup", description: "Keep your phone charged and carry a power bank." },
  { icon: <Lightbulb className="w-6 h-6 text-red-400" />, title: "Well-Lit Areas", description: "Walk in well-lit streets instead of dark alleys." },
  { icon: <Users className="w-6 h-6 text-red-400" />, title: "Stay in Groups", description: "Avoid walking alone late at night; stay with friends if possible." },
  { icon: <DoorClosed className="w-6 h-6 text-red-400" />, title: "Check Before Entering", description: "Look through peepholes before opening doors for strangers." },
  { icon: <Battery className="w-6 h-6 text-red-400" />, title: "Flashlight Handy", description: "Carry a small flashlight when traveling at night." },
  { icon: <FileCheck className="w-6 h-6 text-red-400" />, title: "Keep Documents Safe", description: "Store your IDs, passports, and important documents securely." },
  { icon: <Globe className="w-6 h-6 text-red-400" />, title: "Online Safety", description: "Avoid sharing personal info on social media with strangers." },
];

export default function SafetyTips() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/user/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-6 relative">
      {/* X button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 text-gray-400 hover:text-white"
      >
        <X className="w-8 h-8" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold text-red-500 mb-4">Safety Tips</h2>
        <p className="mb-8 text-gray-300">
          Follow these essential safety guidelines to stay secure in daily life.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-red-500/30 transition duration-300"
            >
              <div className="flex justify-center mb-4">{tip.icon}</div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">{tip.title}</h3>
              <p className="text-gray-300 text-sm">{tip.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
