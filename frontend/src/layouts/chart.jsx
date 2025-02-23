import React, { useEffect, useState } from "react";
import chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { insertionSort } from "../insertionSort";
import { bubbleSort } from "../bubbleSort";
import { selectionSort } from "../selectionSort";
import { useSocket } from "../context/socketContext";

const sizeR = 80;
const rangeR = 30;
//const timeInterval = 80; //ms total animation time = (timeInterval * steps.length) ms
const randomArr = [];
const DEFAULTBARCOLOR = "#ABF7E4";
const CURRENTBAR = "#0000FF";
const ACTIVEBAR = "#FF00FF";
for (let i = 0; i < sizeR; i++) {
  randomArr[i] = parseInt(Math.random() * rangeR);
}
const pos = [];
for (let i = 0; i < sizeR; i++) {
  pos[i] = i;
}

const Chart = () => {
  const [rawArray, setRawData] = useState(randomArr);
  const [arrayInput, setArrayInput] = useState("3, 5, 2, 1, 2,4,4,3,2,5,6");
  //const [size, setSize] = useState(180);
  const [range, setRange] = useState(50);
  const [timeInterval, setTimeInterval] = useState(400);

  const d = {
    labels: pos,
    datasets: [
      {
        label: "sample 1",
        display: true,
        data: rawArray,
      },
    ],
  };
  const [graphData, setgraphData] = useState(d);
  var steps;

  function animate(step, current, end, posArr, innerPos) {
    var backgroundColor = Array(rawArray.length).fill(DEFAULTBARCOLOR); // #ffbdbd
    backgroundColor[posArr[current]] = CURRENTBAR; //"#FF0000"
    backgroundColor[innerPos[current]] = ACTIVEBAR; //"#FF00FF"
    setgraphData({
      labels: pos,

      datasets: [
        {
          label: "sample 1",
          data: step[current],

          backgroundColor: backgroundColor,
        },
      ],
    });
    if (current < end - 1) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          animate(step, current + 1, end, posArr, innerPos);
        });
      }, timeInterval);
    }
  }
  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: "black",
      },
    },
    legend: {
      display: false,
    },
  };

  const socketmanager = useSocket();
  const handleSubmit = () => {
    // Convert arrayInput string to an array of integers
    const {event , payload} = socketmanager.buildButtonClickEvent("Array Update")
    socketmanager.trackEvent(event,payload)
    const inputDataArray = arrayInput
      .split(",")
      .map((str) => parseInt(str.trim()));
    setRawData(inputDataArray);
    setgraphData({
      labels: pos,
      datasets: [
        {
          label: "sample 1",

          data: inputDataArray,
        },
      ],
    });
    // Call onSubmit callback with the input values
  };
  function executeInsertionSort(isCountOnlyOuterInsert) {
    var [steps, posArr, innerPosArr] = insertionSort(
      rawArray,
      isCountOnlyOuterInsert
    );
    var end = steps.length;

    animate(steps, 0, end, posArr, innerPosArr);
  }
  function executeBubbleSort(isCountOnlyOuter) {
    var steps, posArr, innerPosArr;

    [steps, posArr, innerPosArr] = bubbleSort(rawArray, isCountOnlyOuter);

    var end = steps.length;

    animate(steps, 0, end, posArr, innerPosArr);
  }
  function executeSelectionSort(isCountOnlyOuter) {
    var steps, posArr, innerPosArr;

    [steps, posArr, innerPosArr] = selectionSort(rawArray, isCountOnlyOuter);

    var end = steps.length;

    animate(steps, 0, end, posArr, innerPosArr);
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Time Interval: {timeInterval} ms
        </label>
        <input
          type="range"
          min="1"
          max="2000"
          value={timeInterval}
          onChange={(e) => setTimeInterval(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          Array (comma-separated):
        </label>
        <input
          type="text"
          value={arrayInput}
          onChange={(e) => setArrayInput(e.target.value)}
          className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., 5, 10, 15, ..."
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 my-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
      {/* Chart Component */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex w-full overflow-x-scroll space-x-2">
          {rawArray.map((value, index) => (
            <div
              key={index}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              {value}
            </div>
          ))}
        </div>
        <div className=" w-full flex justify-center">
          <Bar className="" options={options} data={graphData} />
        </div>

        <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-2">
          <button
            onClick={() => {
              const {event , payload} = socketmanager.buildButtonClickEvent("executeInsertionSort:Outer")
              socketmanager.trackEvent(event,payload)
              executeInsertionSort(0);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Outer Loop Insertion Sort
          </button>
          <button
            onClick={() => {
              const {event , payload} = socketmanager.buildButtonClickEvent("executeInsertionSort:Inner")
              socketmanager.trackEvent(event,payload)
              executeInsertionSort(1);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Insertion Sort
          </button>
          <button
            onClick={() => {
              const {event , payload} = socketmanager.buildButtonClickEvent("executeBubbleSort:Inner")
              socketmanager.trackEvent(event,payload)
              executeBubbleSort(0);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Bubble Sort
          </button>
          <button
            onClick={() => {
              const {event , payload} = socketmanager.buildButtonClickEvent("executeBubbleSort:Outer")
              socketmanager.trackEvent(event,payload)
              executeBubbleSort(1);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Outer Loop Bubble Sort
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chart;
