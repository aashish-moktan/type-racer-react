import { Link } from "react-router-dom";

// components/Header.jsx
export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">🚀 TypeRacer</h1>
        <nav className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/practice-race">Practice</Link>
          <Link to="/">Races</Link>
          <Link to="/">Leaderboard</Link>
          <a href="#" className="hover:text-blue-400 transition">
            Leaderboard
          </a>
        </nav>
      </div>
    </header>
  );
}
