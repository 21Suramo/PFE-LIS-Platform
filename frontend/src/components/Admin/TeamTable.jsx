export default function TeamTable({ equipes }) {
  return (
    <div className="bg-white/80 rounded-2xl shadow p-6">
      <h2 className="font-bold text-lg text-lisBlue mb-3">Équipes</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b">
            <th>Équipe</th>
            <th>Spécialité</th>
            <th>Leader</th>
            <th>Membres</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {equipes.map((eq) => (
            <tr
              key={eq.id}
              className="border-b last:border-b-0 hover:bg-blue-50">
              <td className="font-medium">{eq.nom}</td>
              <td>{eq.specialite}</td>
              <td>{eq.leaderId}</td>
              <td>{eq.membres.length}</td>
              <td>
                <button className="px-2 py-1 bg-lisBlue/90 text-white rounded hover:bg-lisBlue transition text-xs">
                  Gérer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
