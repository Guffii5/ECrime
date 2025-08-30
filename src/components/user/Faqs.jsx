import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Plus, Minus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Faqs() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "How do I report anonymously?", a: "Select 'Anonymous Report' when submitting the report form." },
    { q: "What details should I include?", a: "Include date, location, description, and people involved." },
    { q: "How long until I get a response?", a: "Emergency reports: immediate. Others: within 24 hours." },
    { q: "Can I track my report?", a: "Yes, use the 'Track Report' feature with your case ID." },
    { q: "Is my data secure?", a: "Yes, all reports are encrypted and confidential." },
    { q: "Can I edit a submitted report?", a: "Edits are not allowed. Submit a new report with corrections." },
    { q: "Will authorities contact me?", a: "If you share details, yes. Anonymous reports won’t get follow-ups." },
    { q: "Do I need an account?", a: "For tracking and updates, yes. Anonymous reports don’t need one." },
    { q: "Can I attach files?", a: "Yes, you can upload images, videos, or documents as evidence." },
    { q: "What happens after submitting?", a: "The report is verified and forwarded to concerned authorities." },
    { q: "Can I delete my account?", a: "Yes, you can request deletion in settings." },
    { q: "What if I submit a fake report?", a: "Fake reports may lead to account ban or legal action." },
  ];

  const handleClose = () => {
    navigate("/user/dashboard");
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-gray-900 rounded-2xl border border-red-600/40 w-full max-w-4xl h-full overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
          <h3 className="text-2xl font-bold text-red-400 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" /> Frequently Asked Questions
          </h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-white">
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* FAQ List */}
        <div className="divide-y divide-gray-800">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5">
              <button
                onClick={() => toggleFAQ(i)}
                className="flex justify-between items-center w-full text-left text-white font-semibold text-lg"
              >
                {faq.q}
                {openIndex === i ? (
                  <Minus className="w-6 h-6 text-red-400" />
                ) : (
                  <Plus className="w-6 h-6 text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-2"
                  >
                    <p className="text-gray-400">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
