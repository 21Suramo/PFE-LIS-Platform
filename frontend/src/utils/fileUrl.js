export function getFileUrl(path) {
    if (!path) return '';
    const base = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/api$/, '');
    return path.startsWith('http') ? path : `${base}${path}`;
  }