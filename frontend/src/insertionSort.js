export function insertionSort(arr,x){
    var steps = [];
    var currents = [];
    var inner = [];
    var step =-1;
    for(let i = 1; i < arr.length ; i++){

            var key = arr[i];
            var j = i-1;
        //    currents[i-1] = i
            while (j >= 0 && arr[j]> key  ){
                arr[j+1] = arr[j];
                j--;
                if(x){
                step++;
                
                currents[step] = i
                steps[step] = [...arr];
                inner[step] = j
                }
                
                
            }
            step++;
            arr[j+1] = key;
            steps[step] = [...arr]
            currents[step] = i
            inner[step] = j+1
            
            

            }
            console.log(...currents);
            console.log(steps)
            console.log(currents.length + " " +steps.length)
            return [steps,currents,inner];
        }
//insertionSort([3,5,7,4,2,47,78,5,32]); // debuging


