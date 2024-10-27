# VIT Sorting Algorithm Visualizer

Welcome to the Sorting Algorithm Visualizer project! This platform allows you to visualize the working of popular sorting algorithms, including Bubble Sort and Insertion Sort.

## About the Project

The Sorting Algorithm Visualizer project is developed as part of the Web Development course at VIT under the guidance of professor Ezhil Arasi V. The project aims to provide an interactive way for students to understand the functioning of sorting algorithms through visualization.

## How to Run
To view the project live, visit: [Sorting Algorithm Visualizer.](http://65.2.123.63:3000/)
## Sorting Algorithms

### Bubble Sort

Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

```javascript
// Pseudo code for Bubble Sort
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
}
```

### Insertion Sort

Insertion Sort is a simple sorting algorithm that builds the final sorted array one element at a time by repeatedly picking the next element and placing it in the correct position.

```javascript
// Pseudo code for Insertion Sort
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
}
```

Start visualizing sorting algorithms now and gain a deeper understanding of their operations!

## How to Run

To run this project locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the dependencies.
4. Run `npm start` to start the development server.
5. Open your browser and visit `http://localhost:3000` to view the project.
