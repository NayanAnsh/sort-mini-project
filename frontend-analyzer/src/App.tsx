import React, { useEffect, useState } from "react";
import { buttonStream, buttonData } from "./lib/ButtonStream";
import { StreamItem } from "./lib/Stream";
import { siteData, siteStream } from "./lib/SiteStream";
import TimeSeriesChart from "./components/buttonAnalysisCompoenents/main";
import { MouseData, mouseStream } from "./lib/mouseStream";
import MouseHeatmap from "./components/mouseAnalysisComponents/mouseHeatmap"
const ButtonStreamComponent: React.FC = () => {
  const [buttonDataList, setButtonDataList] = useState<
    StreamItem<buttonData>[]
  >([]);

  useEffect(() => {
    const handleListUpdate = (updatedList: StreamItem<buttonData>[]) => {
      setButtonDataList([...updatedList]);
    };

    buttonStream.registerforEvents(handleListUpdate);

    return () => {
      buttonStream.deRegisterForEvents(handleListUpdate);
    };
  }, []);

  const [siteDataList, setSiteDataList] = useState<StreamItem<siteData>[]>([]);
  useEffect(() => {
    const handleListUpdate = (updatedList: StreamItem<siteData>[]) => {
      setSiteDataList([...updatedList]);
    };

    siteStream.registerforEvents(handleListUpdate);

    return () => {
      siteStream.deRegisterForEvents(handleListUpdate);
    };
  });

 const [mouseDataList, setMouseDataList] = useState<StreamItem<MouseData>[]>([]);
  useEffect(() => {
    const handleMouseListUpdate = (updatedList: StreamItem<MouseData>[]) => {
      console.log("3456789098765434567890987654")
      console.log(updatedList)
      setMouseDataList([...updatedList]);
    };
    console.log("moudfihgkudfriufliaegSS")
    mouseStream.registerforEvents(handleMouseListUpdate);

    return () => {
      mouseStream.deRegisterForEvents(handleMouseListUpdate);
    };
  });

  // Function to simulate adding a new button click
  const simulateButtonClick = () => {
    const newClickData = JSON.stringify({
      type: "Site_switch",
      hash: "",
      current: "/Visualizer",
      params: "",
      timeStamp: 1740430456029,
    });
    siteStream.add(newClickData);
    console.log("useState", buttonDataList);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Button Stream Data
      </h2>

      <div className="mb-8">
        <TimeSeriesChart events={buttonDataList} />
      </div>
      <div className="dashboard">
      <h2>User Interaction Heatmap</h2>
      <MouseHeatmap 
        data={mouseDataList}
        width="800px"
        height="600px"
      />
    </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={simulateButtonClick}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Simulate Button Click
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Button Data
          </h3>
          <ul className="space-y-2">
            {buttonDataList.map((data) => (
              <li key={data.key} className="bg-white p-3 rounded shadow-sm">
                <span className="font-medium text-blue-600">{data.type}</span>
                <br />
                <span className="text-gray-600">
                  Component: {data.component}
                </span>
                <br />
                <span className="text-gray-500 text-sm">
                  {new Date(data.timeStamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Site Data
          </h3>
          <ul className="space-y-2">
            {siteDataList.map((data) => (
              <li key={data.key} className="bg-white p-3 rounded shadow-sm">
                <span className="font-medium text-green-600">{data.type}</span>
                <br />
                <span className="text-gray-600">Current: {data.current}</span>
                <br />
                <span className="text-gray-500 text-sm">
                  {new Date(data.timeStamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Mouse Datank
          </h3>
          <ul className="space-y-2">
            {mouseDataList.map((data) => (
              <li key={data.key} className="bg-white p-3 rounded shadow-sm">
                <span className="font-medium text-green-600">{data.type}</span>
                <br />
                <span className="text-gray-600">Current: {data.x },{ data.y}</span>
                <br />
                <span className="text-gray-500 text-sm">
                  {new Date(data.timeStamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ButtonStreamComponent;
