export default function RecentEvents({ events }) {
  return (
    <div className="bg-white/80 rounded-2xl shadow p-5">
      <h2 className="font-bold text-lg text-lisBlue mb-3">
        Événements à venir
      </h2>
      <ul>
        {events.map((ev) => (
          <li
            key={ev.id}
            className="flex justify-between py-1 border-b last:border-b-0">
            <span>{ev.titre}</span>
            <span className="text-xs px-2 rounded bg-blue-100 text-blue-700">
              {ev.date}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
