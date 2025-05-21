import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {
  Canvas,
  Circle,
  Group,
  Line,
  useFont,
  vec,
} from '@shopify/react-native-skia';
import {WindDirectionSpec} from '../../../utils/DTO';
import {normalizeWindData} from '../utils.ts';

interface WindRiseChartProps {
  data: WindDirectionSpec[];
  size?: number;
  strokeColor?: string;
  style?: StyleProp<ViewStyle>;
}

const WindRoseChart = ({
  data,
  style,
  size = 300,
  strokeColor = '#29b6f6',
}: WindRiseChartProps) => {
  const radius = size / 2;
  const center = vec(radius, radius);
  const strokeWidth = 2;

  const normalized = normalizeWindData(data);


  return (
    <Canvas style={style}>
      {/* Background circle */}
      <Circle cx={center.x} cy={center.y} r={radius - 5} color="#eee" />

      {/* Wind lines */}
      <Group>
        {normalized.map((entry, index) => {
          const angleRad = (entry.compass_degrees * Math.PI) / 180;
          const length = radius * entry.ct;

          const x = center.x + length * Math.cos(angleRad);
          const y = center.y + length * Math.sin(angleRad);

          return (
            <Line
              key={index}
              p1={center}
              p2={vec(x, y)}
              color={strokeColor}
              strokeWidth={strokeWidth}
            />
          );
        })}
      </Group>
    </Canvas>
  );
};

export default WindRoseChart;
