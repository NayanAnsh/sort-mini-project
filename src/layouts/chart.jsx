import React, { useEffect, useState } from 'react'
import chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { insertionSort } from '../insertionSort';
import { bubbleSort  } from '../bubbleSort';

const size = 180;
const range = 50;
const timeInterval = 80;//ms total animation time = (timeInterval * steps.length) ms
const arr =[];
const DEFAULTBARCOLOR  = "#ABF7E4";
const CURRENTBAR = "#0000FF";
const ACTIVEBAR = "#FF00FF"
for(let i = 0; i < size ; i++){
    arr[i] =  parseInt(Math.random() * range);
}
const pos = [];
for(let i = 0; i < size ; i++){
    pos[i] = i;
}

const Chart = () => {
   
    const d = {
        labels : pos,
        datasets :[
            {
                label: "sample 1",
                data : arr
                
            }
        ]
    }
    const[data,setData] = useState(
        d
    )
    var steps;
    
    
    function animate(step,current,end,posArr,innerPos){
        var backgroundColor = Array(size).fill(DEFAULTBARCOLOR); // #ffbdbd
        backgroundColor[posArr[current]] = CURRENTBAR//"#FF0000"
        backgroundColor[innerPos[current]] = ACTIVEBAR//"#FF00FF"
        setData(
            {
                labels : pos,

                datasets : [
                    {
                        
                        label: "sample 1",
                        data : step[current],
                        backgroundColor : backgroundColor
                    }
                ]
            }
        );
        if(current < end-1){
            setTimeout(()=>{requestAnimationFrame(()=>{animate(step,current+1,end,posArr,innerPos)})},timeInterval)
        }
    }

    function excecuteInsertionSort(isCountOnlyOuterInsert){
        var [steps,posArr,innerPosArr] =  insertionSort(arr,isCountOnlyOuterInsert);
        var end =  steps.length;
        
        animate(steps,0,end,posArr,innerPosArr)
}
function excecuteBubbleSort(isCountOnlyOuter){
    var steps,posArr,innerPosArr;
    
         [steps,posArr,innerPosArr] =  bubbleSort(arr,isCountOnlyOuter);
    
     
   
    var end =  steps.length;
    
    animate(steps,0,end,posArr,innerPosArr)
}

  return (
    <div>

    <Bar  data={data} />
    <button onClick={()=>{excecuteInsertionSort(0)}} >outer loop insert sort</button>
    <button onClick={()=>{excecuteInsertionSort(1)}}> insertion sort</button>
    
        <button onClick={()=>{excecuteBubbleSort(0); }} >Bubble sort</button>
        
        <button onClick={()=>{excecuteBubbleSort(1); }} > outer loop Bubble sort</button>
         
    
    
    </div>

  )
}

export default Chart