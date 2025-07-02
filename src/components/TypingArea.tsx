import { useEffect, useState, useRef } from "react";
import { socket } from "../config/socket";

interface Player {
  id: string;
  progress: number;
}

export default function TypingArea() {
  const [passage, setPassage] = useState("");
  const [input, setInput] = useState("");
  const [wpm, setWPM] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [players, setPlayers] = useState<Record<string, Player>>({});
  const [myId, setMyId] = useState("");

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const words = passage.trim().split(/\s+/);
  const inputWords = input.trim().split(/\s+/);

  useEffect(() => {
    fetch("http://localhost:3000/passage")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log({ data });
        setPassage(data.text);
      })
      .catch((err) => {
        console.log("Error :: ", err);
      });

    socket.on("connect", () => {
      setMyId(socket.id);
      socket.emit("joinRace", "race1");
    });

    socket.on(
      "raceData",
      ({
        passage,
        players: existingPlayers,
      }: {
        passage: string;
        players: Player[];
      }) => {
        setPassage(passage);
        const map: Record<string, Player> = {};
        existingPlayers.forEach((p) => (map[p.id] = p));
        setPlayers(map);
        setStartTime(Date.now());
        setInput("");
        setFinished(false);
      }
    );

    socket.on("playerJoined", ({ playerId }: { playerId: string }) => {
      setPlayers((prev) => ({
        ...prev,
        [playerId]: { id: playerId, progress: 0 },
      }));
    });

    socket.on(
      "playerProgress",
      ({ playerId, progress }: { playerId: string; progress: number }) => {
        setPlayers((prev) => ({
          ...prev,
          [playerId]: { id: playerId, progress },
        }));
      }
    );

    socket.on("playerLeft", ({ playerId }: { playerId: string }) => {
      setPlayers((prev) => {
        const copy = { ...prev };
        delete copy[playerId];
        return copy;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function handleInput(value: string) {
    if (!startTime) setStartTime(Date.now());
    setInput(value);

    const wordsTyped = value.trim().split(/\s+/).length;
    const timeElapsed = (Date.now() - (startTime ?? Date.now())) / 60000;
    setWPM(Math.round(wordsTyped / (timeElapsed || 1)));

    const myProgress = value.length / passage.length;
    setPlayers((prev) => ({
      ...prev,
      [myId]: { id: myId, progress: myProgress },
    }));

    socket.emit("progress", {
      raceId: "race1",
      progress: myProgress,
    });

    if (value === passage && !finished) {
      setFinished(true);
      alert(`Finished! WPM: ${wpm}`);
      if (inputRef.current) inputRef.current.blur();
    }
  }

  function getWordClass(index: number) {
    if (index < inputWords.length) {
      return inputWords[index] === words[index]
        ? "text-green-600 font-semibold"
        : "text-red-600 font-semibold";
    }
    if (index === inputWords.length) return "underline bg-yellow-100";
    return "text-gray-700";
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-3xl w-full p-8">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
          Type Racer
        </h1>

        <div className="mb-6 max-h-48 overflow-y-auto px-6 py-4 border border-gray-200 rounded-lg bg-gray-50 text-lg leading-relaxed select-none">
          {words.map((word, i) => (
            <span key={i} className={`${getWordClass(i)} mr-1`}>
              {word}
            </span>
          ))}
        </div>

        <textarea
          ref={inputRef}
          rows={4}
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="Start typing here..."
          className="w-full px-5 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 resize-none"
          spellCheck={false}
          disabled={finished}
        />

        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-700 font-semibold text-xl">
            WPM: <span className="text-indigo-600">{wpm}</span>
          </div>
        </div>

        {/* Multiple cars with flag */}
        <div className="space-y-6 mt-10">
          {Object.values(players).map((player) => (
            <div key={player.id} className="relative h-8">
              {/* Track */}
              <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 rounded-full transform -translate-y-1/2" />

              {/* Car */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300"
                style={{ left: `calc(${player.progress * 100}% - 16px)` }}
              >
                <span className="text-2xl">🚗</span>
              </div>

              {/* Flag */}
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-xl">
                🏁
              </div>

              {/* Player name */}
              <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                {player.id === myId ? "You" : `Player ${player.id.slice(0, 4)}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
