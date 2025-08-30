import React from "react";
import { motion } from "framer-motion";
import { FileText, Eye, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const documents = [
  { id: 1, title: "Crime Reporting Guide", description: "Step-by-step process to report crimes effectively.", link: "/New folder/Comprehensive Crime Reporting guide.pdf" },
  { id: 2, title: "Legal Rights Handbook", description: "Know your basic rights in criminal and civil cases.", link: "/New folder/Legal Rights Handbook.pdf" },
  { id: 3, title: "Emergency Contacts", description: "Important helpline numbers you should always keep.", link: "/New folder/Emergency Contact.pdf" },
  { id: 4, title: "Cybercrime Awareness", description: "Learn how to protect yourself from online fraud.", link: "/New folder/CyberCrime Awareness.pdf" },
  { id: 5, title: "Community Safety Guide", description: "How to keep your neighborhood safe and secure.", link: "/New folder/Community Safety Guides.pdf" },
  { id: 6, title: "Self Protection Tips", description: "Basic safety moves and awareness for everyone.", link: "/New folder/Self Protection tips.pdf" },
  { id: 7, title: "Women Safety Guide", description: "Special guidelines for women’s safety and security.", link: "/New folder/Women Safety Guides.pdf" },
  { id: 8, title: "Children Safety Manual", description: "Tips to protect children from crimes and abuse.", link: "/New folder/Childre Safety Manual.pdf" },
  { id: 9, title: "Senior Citizen Safety", description: "Guidelines for elderly safety and crime prevention.", link: "/New folder/Senior Citizen SAfety.pdf" },
  { id: 10, title: "Workplace Safety Rules", description: "Important safety rules for workplaces.", link: "/New folder/Work Place Safety Rules.pdf" },
  { id: 11, title: "Disaster Response Manual", description: "Steps to follow in natural disasters.", link: "/New folder/Disaster.pdf" },
  { id: 12, title: "Road Safety Handbook", description: "Traffic rules and accident prevention tips.", link: "/New folder/Complete Road Safety.pdf" },
  { id: 13, title: "Home Security Checklist", description: "How to secure your house from burglary.", link: "/New folder/Home Security.pdf" },
  { id: 14, title: "Fraud Awareness Guide", description: "Spot and avoid common fraud tricks.", link: "/New folder/Fraud Awareness.pdf" },
  { id: 15, title: "Police Complaint Guide", description: "How to file FIRs and police complaints.", link: "/New folder/Comprehensive Crime Reporting guide.pdf" },
  { id: 16, title: "Victim Support Guide", description: "Resources and help for crime victims.", link: "/New folder/Comprehensive Victim Support Guide.pdf" },
  { id: 17, title: "Neighborhood Watch Plan", description: "Organize a community crime watch.", link: "/New folder/📖 Neighborhood Watch Plan with Crime Reporting System.pdf" },
  { id: 18, title: "Digital Privacy Guide", description: "Protect your personal data online.", link: "/New folder/Digital Privacy Guide.pdf" },
  { id: 19, title: "Travel Safety Tips", description: "Stay safe while traveling locally & abroad.", link: "/New folder/Travel Safety Tips.pdf" },
  { id: 20, title: "Fire Safety Manual", description: "Prevent and respond to fire emergencies.", link: "/New folder/Fire Safety Manual.pdf" },
];

export default function DocumentsScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 relative">
      {/* X Close Button */}
      <button
        onClick={() => navigate("/user/dashboard")}
        className="absolute top-4 right-4 p-2 rounded-full bg-red-600 hover:bg-red-700 transition"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Heading */}
      <div className="flex justify-center mb-10">
        <h1 className="text-3xl font-bold text-white px-6 py-3 rounded-xl bg-red-600 shadow-lg w-fit">
          Helpful Documents
        </h1>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
          >
            <div>
              <FileText className="w-12 h-12 text-red-500 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                {doc.title}
              </h2>
              <p className="text-gray-400 text-sm">{doc.description}</p>
            </div>

            {/* Button */}
            <div className="mt-4 flex justify-end">
              <a
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
              >
                <Eye className="w-4 h-4 mr-2" /> View
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
