import { getFileUrl } from "../../utils/fileUrl";

export default function ArticleDetail({ article }) {
  if (!article) return null;
  const filePath = article.fileUrl || article.pdfUrl || article.pdf;
  const link = article.link;
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-lisBlue">{article.title || article.titre}</h2>
      <p className="text-xs text-gray-500 mb-2">
        {new Date(article.createdAt || article.dateSoumission).toLocaleDateString()}
      </p>
      <div className="mb-2">{article.content || article.resume}</div>
      <div className="mt-2 text-sm text-gray-600">
        {article.equipe && (
          <>
            Équipe : <span className="font-semibold">{article.equipe.name || article.equipe}</span>
          </>
        )}
        {article.author || article.auteur ? (
          <>
            {" "}— Membre : <span className="font-semibold">{article.author?.nom || article.author || article.auteur}</span>
          </>
        ) : null}
     
      


        {article.statut !== "APPROVED" && (
          <span
            className={`inline-block text-xs px-2 py-1 rounded ml-2 ${
              article.statut === "APPROVED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {article.statut}
          </span>
        )}

      </div>
      {filePath && (
        <div className="mt-4">
          <a
            href={getFileUrl(filePath)}
            download
            className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition font-semibold"
          >
            Télécharger le fichier
          </a>
        </div>
      )}
      <div className="mt-4">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-green-600 text-white text-sm rounded-full hover:bg-green-700 transition font-semibold"
          >
            Consulter l'article
          </a>
        ) : (
          <button
            disabled
            className="px-4 py-2 bg-gray-300 text-gray-600 text-sm rounded-full cursor-not-allowed"
          >
            Pas de lien
          </button>
        )}
      </div>
   
    </div>
  );
}