import React from 'react';
import { Dimensions } from 'react-native';
import {
  Canvas,
  Circle,
  Group,
  Line,
  Text as SkiaText,
  vec,
  useFont,
} from '@shopify/react-native-skia';

type WDEntry = {
  compass_degrees: number;
  compass_point: string;
  compass_right: number;
  compass_up: number;
  ct: number;
};

type WDProps = {
  WD: Record<string, WDEntry>;
};

const WindRoseChartSkia: React.FC<WDProps> = ({ WD }) => {
  const data = Object.entries(WD)
    .filter(([key]) => !isNaN(Number(key)))
    .map(([_, val]) => val);

  const maxCt = Math.max(...data.map((d) => d.ct));
  const { width } = Dimensions.get('window');
  const size = width - 40;
  const center = size / 2;
  const radius = center - 20;

  const scale = (ct: number) => (ct / maxCt) * radius;
  const font = useFont(require('./../../../assets/font/Roboto_Condensed-Medium.ttf'), 12);

  return (
    <Canvas style={{ width: size, height: size }}>
      <Group transform={[{ translateX: center }, { translateY: center }]}>
        {/* Grid Circles */}
        {[0.25, 0.5, 0.75, 1].map((f, i) => (
          <Circle
            key={i}
            cx={0}
            cy={0}
            r={radius * f}
            color="#ddd"
            style="stroke"
            strokeWidth={1}
          />
        ))}

        {/* Spokes + Labels */}
        {data.map((entry, idx) => {
          const len = scale(entry.ct);
          const x = entry.compass_right * len;
          const y = -entry.compass_up * len;
          const labelX = entry.compass_right * (radius + 10);
          const labelY = -entry.compass_up * (radius + 10);

          return (
            <Group key={idx}>
              <Line
                p1={vec(0, 0)}
                p2={vec(x, y)}
                color="#3399ff"
                strokeWidth={4}
              />
              <SkiaText
                x={labelX}
                y={labelY}
                text={entry.compass_point}
                color="black"
                font={font}
              />
            </Group>
          );
        })}
      </Group>
    </Canvas>
  );
};

export default WindRoseChartSkia;
