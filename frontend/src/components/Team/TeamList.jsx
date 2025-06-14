import TeamCard from "./TeamCard";
import { motion, AnimatePresence } from "framer-motion";

export default function TeamList({ teams, onOpenDetails, ...rest }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}>
      <AnimatePresence>
        {teams.map((team) => (
          <motion.div
          key={team._id || team.id}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: 40, scale: 0.8 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            layout>
            <TeamCard team={team} onOpenDetails={onOpenDetails} {...rest} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
