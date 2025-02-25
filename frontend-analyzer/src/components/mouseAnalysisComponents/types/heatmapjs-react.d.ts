// types/heatmapjs-react.d.ts
declare module '@sarpere/heatmapjs-react' {
    import { ComponentType } from 'react';
  
    interface HeatmapConfig {
      radius?: number;
      blur?: number;
      gradient?: Record<string, string>;
      maxOpacity?: number;
      minOpacity?: number;
    }
  
    interface HeatmapProps {
      max: number;
      data: Array<{ x: number; y: number; value: number }>;
      unit?: 'percent' | 'decimal';
      config?: HeatmapConfig;
    }
  
    export const Heatmap: ComponentType<HeatmapProps>;
  }
  