// src/components/Dashboard/StatsCard.jsx
import React from 'react';

export default function StatsCard({ label, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center">
      <p className="text-3xl font-bold text-primaryDark">{value}</p>
      <p className="mt-2 text-gray-600">{label}</p>
    </div>
  );
}
