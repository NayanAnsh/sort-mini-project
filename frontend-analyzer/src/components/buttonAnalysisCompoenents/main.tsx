import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  TimeScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ButtonEvent {
    key:number,
  type: string;
  component: string;
  timeStamp: number;
}

interface Props {
  events: ButtonEvent[];
}

const TimeSeriesChart: React.FC<Props> = ({ events }) => {
  // Process data into hourly buckets
  const { labels, datasets } = useMemo(() => {
    // Group events by component and hour
    const groups: Record<string, Record<number, number>> = {};
    const components = Array.from(new Set(events.map(e => e.component)));

    events.forEach(event => {
      const hour = new Date(event.timeStamp).setMinutes(0, 0, 0);
      const component = event.component;
      
      if (!groups[component]) groups[component] = {};
      groups[component][hour] = (groups[component][hour] || 0) + 1;
    });

    // Generate labels for time axis
    const allHours = Array.from(new Set(
      events.map(e => new Date(e.timeStamp).setMinutes(0, 0, 0))
    )).sort();

    const labels = allHours.map(hour => new Date(hour));

    // Generate datasets
    const colors = [
      '#FF6B6B',
      '#4ECDC4',
      '#45B7D1',
      '#96CEB4',
      '#FFEEAD',
      '#D4A5A5'
    ];

    const datasets = components.map((component, i) => ({
      label: component,
      data: labels.map(date => groups[component][date.getTime()] || 0),
      backgroundColor: colors[i % colors.length],
      borderWidth: 0
    }));

    return { labels, datasets };
  }, [events]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Button Click Frequency by Component',
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'hour' as const,
          tooltipFormat: 'MMM dd, yyyy - HH:mm',
          displayFormats: {
            hour: 'MMM dd HH:mm'
          }
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Clicks'
        }
      }
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto' }}>
      <Bar
        options={options}
        data={{ labels, datasets }}
      />
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <small>Click and drag to zoom | Double-click to reset view</small>
      </div>
    </div>
  );
};

export default TimeSeriesChart;
