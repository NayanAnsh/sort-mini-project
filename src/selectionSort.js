export function selectionSort(arr, x) {
  var steps = [];
  var currents = [];
  var inner = [];
  var step = -1;

  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    let j = i + 1;
    for (; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
      if (x) {
        step++;

        currents[step] = i;
        steps[step] = [...arr];
        inner[step] = j;
      }
    }
    if (minIndex !== i) {
      // Swap arr[i] and arr[minIndex]
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    arr[j + 1] = arr[minIndex];
    steps[step] = [...arr];
    currents[step] = i;
    inner[step] = j + 1;
  }

  return [steps, currents, inner];
}
