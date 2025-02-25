import Chart from "./layouts/chart";
import "./App.css";
import { useSocket } from "./context/socketContext";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {

   const socket = useSocket();
    const location = useLocation(); 
    
    

    useEffect(()=>{
          // In most cases, it should be fine to leave your code as-is,
    //  since the useEffect will only run once in production.
        const {event,payload} = socket.buildSiteChangeEvent(location)
        console.log(payload)
        socket.trackEvent(event,payload);
      },[location])
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
