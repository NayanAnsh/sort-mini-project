
import { Scatter } from 'react-chartjs-2';
import { StreamItem } from '../../lib/Stream';
import { interactionTypeEnum, MouseData } from '../../lib/mouseStream';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {faker} from '@faker-js/faker';
const MAX_X_AXIS = 850
const MAX_Y_AXIS = 400
interface MouseHeatmapProps {
  data: StreamItem<MouseData>[];
  width?: string | number;
  height?: string | number;
  max?: number;
}
function generateMouseData(): StreamItem<MouseData> {
  return {
    key:faker.number.int({ min: 0, max: 100 }),
    type: faker.helpers.arrayElement(['mousedown', 'mouseup', 'mousemove']),
    x: faker.number.int({ min: 0, max: 1920 }),
    y: faker.number.int({ min: 0, max: 1080 }),
    interactionType: faker.helpers.enumValue(interactionTypeEnum),
    timeStamp: faker.date.recent().getTime()
  };
}
const MouseHeatmap = ({ 
  data, 
  width = '100%', 
  height = '100vh',
  max = 5
}: MouseHeatmapProps) => {
  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);
  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: 0,
        max: MAX_X_AXIS,
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        type: 'linear',
        min: 0,
        max: MAX_Y_AXIS,
        ticks: {
          autoSkip: false,
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };
  
    const mouseDataset = Array.from({ length: 10 }, generateMouseData);


     const datA = {
  datasets: [
    {
      label: 'A dataset',
      data: data.map((item) => {
        const X  = (item.x)%MAX_X_AXIS
        const Y = MAX_Y_AXIS - (item.y)%MAX_Y_AXIS

       return ({
          x:X,
          y: Y,
          type: item.type,
          timeStamp: item.timeStamp,
        }
        
    )
  }
    
    ),
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

const mappedData = {
  datasets: Object.values(interactionTypeEnum).map(interactionType => ({
    label: `${interactionType} Interactions`,
    data: data
      .filter(item => item.interactionType === interactionType)
      .map((item) => {
        const X  = MAX_X_AXIS - (item.x)%MAX_X_AXIS
        const Y = MAX_Y_AXIS - (item.y)%MAX_Y_AXIS

       return ({
          x:X,
          y: Y,
          type: item.type,
          timeStamp: item.timeStamp,
        }
        
    )
  }
),
    backgroundColor: faker.color.rgb({ format: 'css' }),
  })),
};


  return (
    <div style={{ width, height, position: 'relative' }}>
    <Scatter
    options={options}
    data={datA}
   
      />  
      
    </div>
  );
};

export default MouseHeatmap;
// import React from 'react';
// import {
//   Chart as ChartJS,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Scatter } from 'react-chartjs-2';
// import faker from 'faker';

// ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

// export const options = {
//   scales: {
//     y: {
//       beginAtZero: true,
//     },
//   },
// };

// export const data = {
//   datasets: [
//     {
//       label: 'A dataset',
//       data: Array.from({ length: 100 }, () => ({
//         x: faker.datatype.number({ min: -100, max: 100 }),
//         y: faker.datatype.number({ min: -100, max: 100 }),
//       })),
//       backgroundColor: 'rgba(255, 99, 132, 1)',
//     },
//   ],
// };

// export function App() {
//   return <Scatter options={options} data={data} />;
// }
