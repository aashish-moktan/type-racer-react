import { useState, useEffect } from "react";

const passage = `Imagine this: Here we are, a plane full of grown human beings, many of us partially educated, and they're actually taking time out to describe the intricate workings of a belt buckle.`;

const playersData = [
  { id: "you", name: "Guest (You)", color: "bg-blue-500", wpm: 0, progress: 0 },
  { id: "p2", name: "Guest", color: "bg-pink-400", wpm: 0, progress: 0 },
  { id: "p3", name: "akhil", color: "bg-green-500", wpm: 0, progress: 0 },
];

export default function TypingRace() {
  const [players, setPlayers] = useState(playersData);
  const [input, setInput] = useState("");

  // Calculate your progress
  useEffect(() => {
    const myProgress = Math.min((input.length / passage.length) * 100, 100);
    const myWpm = Math.round((input.split(" ").length / 1) * 60); // fake WPM for demo
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === "you" ? { ...p, progress: myProgress, wpm: myWpm } : p
      )
    );
  }, [input]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Race Tracks */}
      <div className="space-y-4 mb-8">
        {players.map((player) => (
          <div key={player.id} className="relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`${player.color} h-full transition-all`}
                style={{ width: `${player.progress}%` }}
              />
            </div>
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${player.progress}%` }}
            >
              🚗
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>{player.name}</span>
              <span>{player.wpm} wpm</span>
            </div>
          </div>
        ))}
      </div>

      {/* Passage */}
      <div className="border p-4 rounded-md mb-4 bg-white">
        <p>
          {passage.split("").map((char, idx) => {
            let color = "";
            if (idx < input.length) {
              color = char === input[idx] ? "text-green-600" : "text-red-500";
            }
            return (
              <span key={idx} className={color}>
                {char}
              </span>
            );
          })}
        </p>
      </div>

      {/* Typing Input */}
      <textarea
        rows={3}
        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Start typing here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
