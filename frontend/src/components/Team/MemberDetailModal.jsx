import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getFileUrl } from "../../utils/fileUrl";

export default function MemberDetailModal({ member, onClose }) {
  if (!member) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 relative"
          initial={{ scale: 0.93, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-xl text-gray-600 hover:text-lisBlue"
            aria-label="Fermer"
          >
            &times;
          </button>
          <div className="flex flex-col items-center gap-3">
            <img
              src={getFileUrl(member.avatar)}
              alt={member.nom}
              className="w-24 h-24 rounded-full object-cover border"
            />
            <h3 className="text-lg font-bold text-gray-800">{member.nom}</h3>
            {member.speciality && (
              <p className="text-sm text-gray-500">{member.speciality}</p>
            )}
            {member.link1 && (
              <a
                href={member.link1}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lisBlue underline break-words"
              >
                {member.link1}
              </a>
            )}
            {member.link2 && (
              <a
                href={member.link2}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lisBlue underline break-words"
              >
                {member.link2}
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}