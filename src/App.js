import Chart from "./layouts/chart";
import "./App.css";

function App() {
  return (
    <div className="relative">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">Sorting Algorithm Visualizer</h2>
        {/* Description */}
        <p className="mb-4">
          This visualizer allows you to see how various sorting algorithms work
          in real-time.
        </p>

        {/* Chart Component */}
        <Chart />
      </div>
    </div>
  );
}

export default App;
