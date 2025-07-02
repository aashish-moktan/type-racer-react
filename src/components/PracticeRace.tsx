import { useState, useEffect } from "react";

const passage = `The odds are that you will generally meet the worst of them. The reason is that men who have something going for them in their lives, men who passionately live life with a purpose, are usually too busy living their dreams to hang out "trolling for chicks."`;

export default function PracticeRace() {
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState(0);
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    const p = Math.min((input.length / passage.length) * 100, 100);
    const wordsTyped = input.trim().split(/\s+/).length;
    setProgress(p);
    setWpm(Math.round(wordsTyped * (60 / 1)));
  }, [input]);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-4 text-blue-900 font-semibold">Practice Racetrack</div>
      <div className="mb-4 text-sm text-gray-600">
        You are in a <span className="font-semibold">single-player</span> race.
      </div>

      {/* Progress Track */}
      <div className="relative mb-8">
        <div className="h-1 bg-yellow-300 rounded-full">
          <div
            className="h-1 bg-green-500 transition-all rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="absolute top-1/2 -translate-y-1/2">🚗</div>
        <div className="flex justify-between text-sm text-gray-700 mt-1">
          <span>Guest (you)</span>
          <span>{wpm} wpm</span>
        </div>
      </div>

      {/* Passage */}
      <div className="border p-4 rounded-md bg-gray-50 font-mono leading-relaxed mb-4">
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
      </div>

      {/* Typing Input */}
      <textarea
        rows={3}
        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Start typing here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Leave Button */}
      <button className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded shadow">
        Main menu (leave practice)
      </button>
    </div>
  );
}
