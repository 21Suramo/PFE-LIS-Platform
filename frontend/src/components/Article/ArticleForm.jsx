// src/components/Article/ArticleForm.jsx
import React, { useState } from 'react';

export default function ArticleForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) return;
    onSubmit({
      id: Date.now().toString(),
      title,
      author,
      status: 'PENDING'
    });
    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Titre</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Auteur</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-primaryDark text-white py-2 px-4 rounded"
      >
        Soumettre
      </button>
    </form>
  );
}
