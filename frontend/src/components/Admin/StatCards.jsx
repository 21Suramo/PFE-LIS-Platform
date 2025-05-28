export default function StatCards({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white/80 rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-lisBlue">{stat.value}</div>
          <div className="text-gray-700 mt-2 text-base">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
