import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSocket } from "../context/socketContext";

function Home() {
  const socket = useSocket();
  const location = useLocation();  
  useEffect(()=>{
    // In most cases, it should be fine to leave your code as-is,
    //  since the useEffect will only run once in production.
      const {event,payload} = socket.buildSiteChangeEvent(location)
      console.log(payload)
      socket.trackEvent(event,payload);
    },[location])

const visualButtonHandle = ()=>{
  const {event , payload} = socket.buildButtonClickEvent("Array Update")
  socket.trackEvent(event,payload)
}
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Sorting Algorithm Visualizer</h1>
      <p className="text-lg mb-6">
        Welcome to the Sorting Algorithm Visualizer project! This platform
        allows you to visualize the working of popular sorting algorithms,
        including Bubble Sort and Insertion Sort.
      </p>

      <h2 className="text-2xl font-bold mb-4">About the Project:</h2>
      <p className="mb-6">
        The Sorting Algorithm Visualizer project is developed as part of the Web
        Development course at VIT under the guidance of professor Ezhil Arasi V.
        The project aims to provide an interactive way for students to
        understand the functioning of sorting algorithms through visualization.
      </p>

      <h2 className="text-2xl font-bold mb-4">Sorting Algorithms:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Bubble Sort</h3>
          <p className="mb-4">
            Bubble Sort is a simple sorting algorithm that repeatedly steps
            through the list, compares adjacent elements, and swaps them if they
            are in the wrong order.
          </p>
          <pre className="bg-gray-200 p-4 rounded-lg text-sm whitespace-pre-line">
            {`// Pseudo code for Bubble Sort
function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr, j, j+1);
            }
        }
    }
}`}
          </pre>
        </div>
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Insertion Sort</h3>
          <p className="mb-4">
            Insertion Sort is a simple sorting algorithm that builds the final
            sorted array one element at a time by repeatedly picking the next
            element and placing it in the correct position.
          </p>
          <pre className="bg-gray-200 p-4 rounded-lg text-sm whitespace-pre-line">
            {`// Pseudo code for Insertion Sort
function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`}
          </pre>
        </div>
      </div>

      <p className="mt-8">
        Start visualizing sorting algorithms now and gain a deeper understanding
        of their operations!
      </p>
      <Link
        to="/Visualizer"
        onClick={visualButtonHandle}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block"
      >
        Go to Visualizer
      </Link>
    </div>
  );
}

export default Home;
