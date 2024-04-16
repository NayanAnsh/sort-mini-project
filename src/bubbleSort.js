function swap(arr, xp, yp)
{
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}
 
export function bubbleSort(arr, isCountOnlyOuter){
    var steps = [];
    var currents = [];
    var inner = [];
    var step =-1;
    var i, j;
    var c = isCountOnlyOuter;
for (i = 0; i < arr.length-1; i++)
{
    step++;
    steps[step] = [...arr]
    currents[step] = i;
    for (j = 0; j < arr.length-i-1; j++)
    {
        
        if (arr[j] > arr[j+1])
        {
        swap(arr,j,j+1);
        
        }
        if(!c){
            step++;
        
        steps[step] = [...arr]
        currents[step] = j+1;
        inner[step] = j;
        }
    }
    inner[step] = j;
  
}
            console.log(...currents);
            console.log(steps)
            console.log(currents.length + " " +steps.length)
            return [steps,currents,inner];
        }
        
//bubbleSort([3,5,7,4,2,47,78,5,32],1); // debuging


