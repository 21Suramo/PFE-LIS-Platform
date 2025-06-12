import { motion } from "framer-motion";

export default function ArticleCard({ article, onOpenDetails }) {
  return (
    <motion.div
      className="border rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer bg-white/80"
      whileHover={{ scale: 1.04, boxShadow: "0 6px 40px #003e7433" }}
      onClick={() => onOpenDetails && onOpenDetails(article)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpenDetails && onOpenDetails(article);
      }}
      role="button"
      aria-label={`Voir le détail de l'article ${article.titre}`}>
      <h2 className="text-xl font-semibold text-primaryDark">
        {article.titre}
      </h2>
      <div className="mt-1 text-xs text-gray-500">
        {article.equipe && (
          <>
            Équipe : <span className="font-semibold">{article.equipe}</span>
          </>
        )}
        {article.auteur && (
          <>
            {" "}
            — Membre : <span className="font-semibold">{article.auteur}</span>
          </>
        )}
      </div>
      <p className="mt-2 text-xs text-gray-500">{article.dateSoumission}</p>
      <p className="mt-2 text-base text-gray-700 line-clamp-3">
        {article.resume}
      </p>
    </motion.div>
  );
}
