const LeaderBoardTable = () => {
  const players = [
    { name: "Charlie", speed: "190 wpm", time: "7 minutes ago" },
    { name: "Paul", speed: "108 wpm", time: "59 minutes ago" },
    { name: "Nate", speed: "230 wpm", time: "23 minutes ago" },
    { name: "Olivia", speed: "176 wpm", time: "25 minutes ago" },
    { name: "Bob", speed: "215 wpm", time: "52 minutes ago" },
    { name: "Mona", speed: "175 wpm", time: "31 minutes ago" },
    { name: "Henry", speed: "232 wpm", time: "43 minutes ago" },
    { name: "Sam", speed: "175 wpm", time: "37 minutes ago" },
    { name: "Olivia", speed: "206 wpm", time: "34 minutes ago" },
    { name: "Charlie", speed: "166 wpm", time: "29 minutes ago" },
    { name: "Henry", speed: "217 wpm", time: "15 minutes ago" },
    { name: "Rose", speed: "253 wpm", time: "39 minutes ago" },
    { name: "Ivy", speed: "262 wpm", time: "34 minutes ago" },
    { name: "Alice", speed: "122 wpm", time: "22 minutes ago" },
    { name: "John", speed: "228 wpm", time: "6 minutes ago" },
    { name: "Mona", speed: "252 wpm", time: "20 minutes ago" },
    { name: "Sam", speed: "153 wpm", time: "15 minutes ago" },
    { name: "Quinn", speed: "288 wpm", time: "6 minutes ago" },
    { name: "Bob", speed: "112 wpm", time: "44 minutes ago" },
    { name: "Rose", speed: "206 wpm", time: "34 minutes ago" },
  ];

  return (
    <div className="w-full max-w-4xl bg-white shadow rounded-md p-6">
      <div className="flex gap-3">
        <div className="flex-1 text-center">Latest High Scores</div>
        <div className="flex-1 text-center">My Scores</div>
        <div className="flex-1 text-center">Hall of Fame</div>
        <div className="flex-1 text-center">Competitions</div>
      </div>

      <table
        className="min-w-full border border-gray-300 divide-y divide-gray-200"
        border={1}
      >
        <thead className="bg-blue-900">
          <tr>
            <th></th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-white">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-white">
              Speed
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-white">
              Last Active
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {players.map((player, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="text-center">{index + 1}</td>
              <td className="px-4 py-2 whitespace-nowrap">{player.name}</td>
              <td className="px-4 py-2 whitespace-nowrap">{player.speed}</td>
              <td className="px-4 py-2 whitespace-nowrap">{player.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoardTable;
