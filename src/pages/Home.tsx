import FeaturedUniverses from "../components/FeaturedUniverses";
import LeaderBoardTable from "../components/LeaderBoardTable";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-green-50 flex flex-col items-center py-10 px-4">
      {/* Banner */}
      <div className="bg-blue-900 text-white w-full max-w-4xl rounded-md flex justify-between items-center px-6 py-4 mb-6">
        <p>Record your races with a TypeRacer Account!</p>
        <button className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded">
          Create Your Account
        </button>
      </div>

      {/* Hero */}
      <div className="bg-white shadow rounded-md p-8 w-full max-w-4xl mb-8 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900 mb-2">
            TypeRacer – The Global Typing Competition
          </h1>
          <p className="mb-4 text-gray-700">
            Increase your typing speed while racing against others!
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded font-semibold">
            Enter a Typing Race
          </button>
          <div className="mt-4 text-sm text-gray-500 space-x-4">
            <span>Language: English</span>
            <span>Instant Death Mode: Off</span>
            <span>Theme: Responsive</span>
          </div>
        </div>
        <div className="mt-6 md:mt-0">
          {/* Car Illustration — placeholder emoji for now */}
          <div className="text-8xl">🏎️</div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-8">
        <div className="bg-white shadow rounded-md p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">
            Typing Test
          </h2>
          <p className="mb-4 text-gray-600">
            Improve your typing skills on your own
          </p>
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded">
            Practice Yourself
          </button>
        </div>
        <div className="bg-white shadow rounded-md p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">
            Race your friends
          </h2>
          <p className="mb-4 text-gray-600">
            Create your own racetrack and play with friends
          </p>
          <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded">
            Create Racetrack
          </button>
        </div>
      </div>

      <FeaturedUniverses />
      <LeaderBoardTable />
    </div>
  );
};

export default Home;
