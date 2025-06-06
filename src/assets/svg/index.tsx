import * as React from 'react';
import Svg, {Circle, Path, Rect, SvgProps} from 'react-native-svg';

export type SvgProps2 = SvgProps & {
  fill2?: string;
  fill3?: string;
  fill4?: string;
};

export * from './campfire.tsx';

export const HomeLinearSVG = ({
  width = 24,
  height = 24,
  fill = '#979797',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} fill={fill} {...props}>
    <Path
      fill="#979797"
      d="m13.893 11.267 3.773-2.527a.827.827 0 0 0 .227-1.146L16.68 5.787a.827.827 0 0 0-1.147-.227L11.76 8.087l2.133 3.18Z"
    />
    <Path
      fill="#979797"
      d="m13.68 10.947-1.173.787-1.78 1.193-.234.153-.106-.16-1.494-2.226-.106-.16L11.973 8.4l1.707 2.547Z"
    />
    <Path
      fill="#979797"
      d="m7.76 14.68 2.633-1.76L8.9 10.694l-2.634 1.76a.666.666 0 0 0-.18.926l.754 1.12c.2.307.613.387.92.18Z"
    />
    <Path
      fill="#979797"
      d="M15.04 18.54a.58.58 0 0 1-.207.047.508.508 0 0 1-.46-.3l-2.486-5.494-2.52 5.5a.514.514 0 0 1-.46.294.581.581 0 0 1-.207-.047.51.51 0 0 1-.247-.667l2.274-4.946 1.78-1.194 2.78 6.147a.503.503 0 0 1-.247.66Z"
      opacity={0.4}
    />
    <Path
      fill="#979797"
      d="M22 9.75c-.41 0-.75-.34-.75-.75V7c0-2.58-1.67-4.25-4.25-4.25H7C4.42 2.75 2.75 4.42 2.75 7v2c0 .41-.34.75-.75.75s-.75-.34-.75-.75V7c0-3.44 2.31-5.75 5.75-5.75h10c3.44 0 5.75 2.31 5.75 5.75v2c0 .41-.34.75-.75.75ZM17 22.75H7c-3.44 0-5.75-2.31-5.75-5.75v-2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 2.58 1.67 4.25 4.25 4.25h10c2.58 0 4.25-1.67 4.25-4.25v-2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 3.44-2.31 5.75-5.75 5.75Z"
    />
  </Svg>
);

export const HomeFillSVG = ({
  width = 24,
  height = 24,
  fill = '#0D2A80',
  fill2 = '#fff',
  ...props
}: SvgProps2) => (
  <Svg width={width} height={height} {...props}>
    <Rect width={21} height={21} x={1.5} y={1.5} fill={fill} rx={5.5} />
    <Path
      fill={fill2}
      d="m13.893 11.267 3.773-2.527a.827.827 0 0 0 .227-1.146L16.68 5.787a.827.827 0 0 0-1.147-.227L11.76 8.087l2.133 3.18Z"
    />
    <Path
      fill={fill2}
      d="m13.68 10.947-1.173.787-1.78 1.193-.234.153-.106-.16-1.494-2.226-.106-.16L11.973 8.4l1.707 2.547Z"
    />
    <Path
      fill={fill2}
      d="m7.76 14.68 2.633-1.76L8.9 10.694l-2.634 1.76a.666.666 0 0 0-.18.926l.754 1.12c.2.307.613.387.92.18Z"
    />
    <Path
      fill={fill2}
      d="M15.04 18.54a.58.58 0 0 1-.207.047.508.508 0 0 1-.46-.3l-2.486-5.494-2.52 5.5a.514.514 0 0 1-.46.294.581.581 0 0 1-.207-.047.51.51 0 0 1-.247-.667l2.274-4.946 1.78-1.194 2.78 6.147a.503.503 0 0 1-.247.66Z"
      opacity={0.4}
    />
  </Svg>
);

export const SearchLinearSVG = ({
  width = 24,
  height = 24,
  fill = '#979797',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} {...props}>
    <Path
      fill={fill}
      d="M11 20.75c-5.38 0-9.75-4.37-9.75-9.75S5.62 1.25 11 1.25s9.75 4.37 9.75 9.75-4.37 9.75-9.75 9.75Zm0-18c-4.55 0-8.25 3.7-8.25 8.25s3.7 8.25 8.25 8.25 8.25-3.7 8.25-8.25-3.7-8.25-8.25-8.25ZM20.16 22.79c-.08 0-.16-.01-.23-.02-.47-.06-1.32-.38-1.8-1.81-.25-.75-.16-1.5.25-2.07.41-.57 1.1-.89 1.89-.89 1.02 0 1.82.39 2.18 1.08.36.69.26 1.57-.31 2.42-.71 1.07-1.48 1.29-1.98 1.29Zm-.6-2.3c.17.52.41.78.57.8.16.02.46-.17.77-.62.29-.43.31-.74.24-.88s-.35-.29-.87-.29c-.31 0-.54.1-.67.27-.12.17-.14.43-.04.72Z"
    />
  </Svg>
);

export const SearchFillSVG = ({
  width = 24,
  height = 24,
  fill = '#0D2A80',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} {...props}>
    <Path
      fill={fill}
      d="M11.01 20.02a9.01 9.01 0 1 0 0-18.02 9.01 9.01 0 0 0 0 18.02ZM21.99 18.95c-.33-.61-1.03-.95-1.97-.95-.71 0-1.32.29-1.68.79-.36.5-.44 1.17-.22 1.84.43 1.3 1.18 1.59 1.59 1.64.06.01.12.01.19.01.44 0 1.12-.19 1.78-1.18.53-.77.63-1.54.31-2.15Z"
    />
  </Svg>
);

export const MissionTrackerSVG = ({
  width = 24,
  height = 24,
  fill = '#979797',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...props}>
    <Path
      fill={fill}
      d="M20.36 12.73c-.37 0-.68-.28-.72-.65a7.614 7.614 0 0 0-3.24-5.44.723.723 0 0 1-.18-1.01c.23-.33.68-.41 1.01-.18a9.115 9.115 0 0 1 3.86 6.48c.04.4-.25.76-.65.8h-.08ZM3.74 12.78h-.07a.73.73 0 0 1-.65-.8 9.083 9.083 0 0 1 3.8-6.49c.32-.23.78-.15 1.01.17.23.33.15.78-.17 1.01a7.632 7.632 0 0 0-3.19 5.45c-.04.38-.36.66-.73.66ZM15.99 21.1c-1.23.59-2.55.89-3.93.89-1.44 0-2.81-.32-4.09-.97a.715.715 0 0 1-.32-.97c.17-.36.61-.5.97-.33.63.32 1.3.54 1.98.67.92.18 1.86.19 2.78.03.68-.12 1.35-.33 1.97-.63.37-.17.81-.03.97.34.18.36.04.8-.33.97ZM12.05 2.01c-1.55 0-2.82 1.26-2.82 2.82 0 1.56 1.26 2.82 2.82 2.82 1.56 0 2.82-1.26 2.82-2.82 0-1.56-1.26-2.82-2.82-2.82ZM5.05 13.87c-1.55 0-2.82 1.26-2.82 2.82 0 1.56 1.26 2.82 2.82 2.82 1.56 0 2.82-1.26 2.82-2.82 0-1.56-1.27-2.82-2.82-2.82ZM18.95 13.87c-1.55 0-2.82 1.26-2.82 2.82 0 1.56 1.26 2.82 2.82 2.82 1.56 0 2.82-1.26 2.82-2.82 0-1.56-1.26-2.82-2.82-2.82ZM11.976 16.388c-.41 0-.75-.34-.75-.75v-2.31l-1.81-.9a.763.763 0 0 1-.34-1.01c.19-.37.64-.52 1.01-.34l1.89.94 1.89-.94c.37-.18.82-.04 1.01.34.19.37.04.82-.34 1.01l-1.81.9v2.31c0 .41-.34.75-.75.75Z"
    />
  </Svg>
);

export const CrossSVG = ({
  fill = '#fff',
  height = 24,
  width = 24,
}: SvgProps) => (
  <Svg width={width} height={height} viewBox={'0 0 24 24'} fill="none">
    <Path
      fill={fill}
      d="M4.88 21c-.477 0-.955-.176-1.333-.553a1.897 1.897 0 0 1 0-2.666l14.24-14.234c.729-.73 1.936-.73 2.666 0s.73 1.936 0 2.666L6.213 20.447c-.351.377-.855.553-1.333.553Z"
    />
    <Path
      fill={fill}
      d="M19.12 21c-.479 0-.957-.176-1.334-.553L3.547 6.213a1.897 1.897 0 0 1 0-2.666c.73-.73 1.937-.73 2.667 0l14.239 14.234c.73.73.73 1.936 0 2.666a1.866 1.866 0 0 1-1.334.553Z"
    />
  </Svg>
);

export const ArrowDownSVG = ({
  fill = '#fff',
  height = 24,
  width = 24,
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} {...props}>
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2.5}
      d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
    />
  </Svg>
);

export const ArrowNextSVG = ({
  width = 24,
  height = 24,
  fill = '#fff',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...props}>
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2.5}
      d="m8.91 19.92 6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.08"
    />
  </Svg>
);

export const ArrowUpSVG = ({
  width = 24,
  height = 24,
  fill = '#fff',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...props}>
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2.5}
      d="M19.92 15.05 13.4 8.53c-.77-.77-2.03-.77-2.8 0l-6.52 6.52"
    />
  </Svg>
);

export const ArrowPrevSVG = ({
  width = 24,
  height = 24,
  fill = '#fff',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...props}>
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2.5}
      d="M15 19.92 8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08"
    />
  </Svg>
);

export const QuestionSVG = ({
  fill = '#fff',
  width = 24,
  height = 24,
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
    viewBox={'0 0 24 24'}>
    <Path
      fill={fill}
      d="M17 18.43h-4l-4.45 2.96A.997.997 0 0 1 7 20.56v-2.13c-3 0-5-2-5-5v-6c0-3 2-5 5-5h10c3 0 5 2 5 5v6c0 3-2 5-5 5Z"
      opacity={0.4}
    />
    <Path
      fill={fill}
      d="M12 12.11c-.41 0-.75-.34-.75-.75v-.21c0-1.16.85-1.73 1.17-1.95.37-.25.49-.42.49-.68 0-.5-.41-.91-.91-.91s-.91.41-.91.91c0 .41-.34.75-.75.75s-.75-.34-.75-.75c0-1.33 1.08-2.41 2.41-2.41s2.41 1.08 2.41 2.41c0 1.14-.84 1.71-1.15 1.92-.39.26-.51.43-.51.71v.21c0 .42-.34.75-.75.75ZM12 14.6a.749.749 0 1 1-.002-1.498A.749.749 0 0 1 12 14.6Z"
    />
  </Svg>
);

export const CalendarSVG = ({
  width = 24,
  height = 24,
  fill = '#000',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 512 512" {...props}>
    <Rect
      width={416}
      height={384}
      x={48}
      y={80}
      fill="none"
      stroke={fill}
      strokeLinejoin="round"
      strokeWidth={32}
      rx={48}
    />
    <Circle fill={fill} cx={296} cy={232} r={24} />
    <Circle fill={fill} cx={376} cy={232} r={24} />
    <Circle fill={fill} cx={296} cy={312} r={24} />
    <Circle fill={fill} cx={376} cy={312} r={24} />
    <Circle fill={fill} cx={136} cy={312} r={24} />
    <Circle fill={fill} cx={216} cy={312} r={24} />
    <Circle fill={fill} cx={136} cy={392} r={24} />
    <Circle fill={fill} cx={216} cy={392} r={24} />
    <Circle fill={fill} cx={296} cy={392} r={24} />
    <Path
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M128 48v32m256-32v32"
    />
    <Path
      fill="none"
      stroke={fill}
      strokeLinejoin="round"
      strokeWidth={32}
      d="M464 160H48"
    />
  </Svg>
);

export const ArrowLoadSVG = ({
  width = 24,
  height = 24,
  fill = '#fff',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...props}>
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M22 12c0 5.52-4.48 10-10 10s-8.89-5.56-8.89-5.56m0 0h4.52m-4.52 0v5M2 12C2 6.48 6.44 2 12 2c6.67 0 10 5.56 10 5.56m0 0v-5m0 5h-4.44"
    />
  </Svg>
);

export const CloudSVG = ({
  width = 24,
  height = 24,
  fill = '#fff',
  viewBox = '0 0 24 24',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox={viewBox} {...props}>
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11a4 4 0 0 1 0 8H6a5 5 0 0 1-.331-9.99A7.002 7.002 0 0 1 18.929 11H19Z"
    />
  </Svg>
);

export const ThunderStormSVG = ({
  width = 24,
  height = 24,
  fill = '#fff',
  strokeWidth = 32,
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 512 512"
    preserveAspectRatio="xMidYMid meet"
    {...props}>
    <Path
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="m120 352-24 48m40 32-16 32m280-112-24 48m40 32-16 32M208 304l-16 96h48v80l80-112h-48l16-64m116.33-151.11H392.2C384.71 84.85 326.14 32 256 32a136.39 136.39 0 0 0-128.63 90.67h-4.57c-49.94 0-90.8 40.8-90.8 90.66h0C32 263.2 72.86 304 122.8 304h281.53C446 304 480 270 480 228.44h0c0-41.55-34-75.55-75.67-75.55z"
    />
  </Svg>
);

export const SunnySVG = (props: SvgProps) => {
  const {width = 24, height = 24, fill = '#fff', ...restProps} = props;

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 512 512"
      preserveAspectRatio="xMidYMid meet"
      {...restProps}>
      <Path
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M256 48v48m0 320v48m147.08-355.08-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48m-320 0H48m355.08 147.08-33.94-33.94M142.86 142.86l-33.94-33.94"
      />
      <Circle
        cx={256}
        cy={256}
        r={80}
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
      />
    </Svg>
  );
};

export const SearchSVG = ({fill = '#FFF', ...props}: SvgProps) => (
  <Svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512" {...props}>
    <Path
      fill="none"
      stroke={fill}
      strokeMiterlimit={10}
      strokeWidth={32}
      d="M256 80a176 176 0 1 0 176 176A176 176 0 0 0 256 80z"
    />
    <Path
      fill="none"
      stroke={fill}
      strokeMiterlimit={10}
      strokeWidth={32}
      d="M232 160a72 72 0 1 0 72 72 72 72 0 0 0-72-72z"
    />
    <Path
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={32}
      d="M283.64 283.64 336 336"
    />
  </Svg>
);

export const MoonSVG = ({fill = '#r000', ...props}: SvgProps) => (
  <Svg viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet" {...props}>
    <Path
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
    />
  </Svg>
);

export const SpeedometerSVG = ({fill = '#fff', ...props}: SvgProps) => (
  <Svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512" {...props}>
    <Path d="m326.1 231.9-47.5 75.5a31 31 0 0 1-7 7 30.11 30.11 0 0 1-35-49l75.5-47.5a10.23 10.23 0 0 1 11.7 0 10.06 10.06 0 0 1 2.3 14z" />
    <Path
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M256 64C132.3 64 32 164.2 32 287.9a223.18 223.18 0 0 0 56.3 148.5c1.1 1.2 2.1 2.4 3.2 3.5a25.19 25.19 0 0 0 37.1-.1 173.13 173.13 0 0 1 254.8 0 25.19 25.19 0 0 0 37.1.1l3.2-3.5A223.18 223.18 0 0 0 480 287.9C480 164.2 379.7 64 256 64z"
    />
    <Path
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={32}
      d="M256 128v32m160 128h-32m-256 0H96m69.49-90.51-22.63-22.63m203.65 22.63 22.63-22.63"
    />
  </Svg>
);

export const CompassSVG = ({fill = '#fff', ...props}: SvgProps) => (
  <Svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512" {...props}>
    <Path
      fill="none"
      stroke={fill}
      strokeMiterlimit={10}
      strokeWidth={32}
      d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
    />
    <Path d="m350.67 150.93-117.2 46.88a64 64 0 0 0-35.66 35.66l-46.88 117.2a8 8 0 0 0 10.4 10.4l117.2-46.88a64 64 0 0 0 35.66-35.66l46.88-117.2a8 8 0 0 0-10.4-10.4zM256 280a24 24 0 1 1 24-24 24 24 0 0 1-24 24z" />
  </Svg>
);

export const AlertCircleSVG = ({fill = '#000', ...props}: SvgProps) => (
  <Svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512" {...props}>
    <Path
      fill="none"
      stroke={fill}
      strokeMiterlimit={10}
      strokeWidth={32}
      d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
    />
    <Path
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M250.26 166.05 256 288l5.73-121.95a5.74 5.74 0 0 0-5.79-6h0a5.74 5.74 0 0 0-5.68 6z"
    />
    <Path d="M256 367.91a20 20 0 1 1 20-20 20 20 0 0 1-20 20z" />
  </Svg>
);

export const NotifyOutLineSVG = ({
  width = 24,
  height = 24,
  fill = '#000',
  ...props
}: SvgProps) => (
  <Svg viewBox="0 0 512 512" height={height} width={width} {...props}>
    <Path
      fill="none"
      stroke={fill}
      strokeMiterlimit={10}
      strokeWidth={32}
      d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
    />
    <Path d="M365.2 313c-16.33-19.34-27.86-27.47-27.86-80.8 0-48.86-25.78-66.23-47-74.67a11.39 11.39 0 0 1-6.34-6.68C280.29 138.6 269.88 128 256 128s-24.31 10.6-28 22.86a11.35 11.35 0 0 1-6.33 6.68c-21.24 8.46-47 25.8-47 74.67 0 53.33-11.54 61.46-27.87 80.8-6.77 8-.65 23 11.19 23H354C365.77 336 371.94 321 365.2 313zm-144.96 39a4 4 0 0 0-4 4.42C218.49 375.14 235.11 384 256 384c20.67 0 37.14-9.15 39.66-27.52a4 4 0 0 0-4-4.48z" />
  </Svg>
);

export const RocketSVG = ({
  width = 24,
  height = 24,
  fill = '#000',
  ...props
}: SvgProps) => (
  <Svg viewBox="0 0 512 512" width={width} height={height} {...props}>
    <Path
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M461.81 53.81a4.4 4.4 0 0 0-3.3-3.39c-54.38-13.3-180 34.09-248.13 102.17a294.9 294.9 0 0 0-33.09 39.08c-21-1.9-42-.3-59.88 7.5-50.49 22.2-65.18 80.18-69.28 105.07a9 9 0 0 0 9.8 10.4l81.07-8.9a180.29 180.29 0 0 0 1.1 18.3 18.15 18.15 0 0 0 5.3 11.09l31.39 31.39a18.15 18.15 0 0 0 11.1 5.3 179.91 179.91 0 0 0 18.19 1.1l-8.89 81a9 9 0 0 0 10.39 9.79c24.9-4 83-18.69 105.07-69.17 7.8-17.9 9.4-38.79 7.6-59.69a293.91 293.91 0 0 0 39.19-33.09c68.38-68 115.47-190.86 102.37-247.95zM298.66 213.67a42.7 42.7 0 1 1 60.38 0 42.65 42.65 0 0 1-60.38 0z"
    />
    <Path
      fill="none"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
      d="M109.64 352a45.06 45.06 0 0 0-26.35 12.84C65.67 382.52 64 448 64 448s65.52-1.67 83.15-19.31A44.73 44.73 0 0 0 160 402.32"
    />
  </Svg>
);

export const Planet = ({width = 24, height = 24, fill = '#000', ...props}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 512 512"
    {...props}>
    <Path
      fill="none"
      stroke={fill}
      strokeMiterlimit={10}
      strokeWidth={32}
      d="M413.48 284.46c58.87 47.24 91.61 89 80.31 108.55-17.85 30.85-138.78-5.48-270.1-81.15S.37 149.84 18.21 119c11.16-19.28 62.58-12.32 131.64 14.09"
    />
    <Circle
      cx={256}
      cy={256}
      r={160}
      fill="none"
      stroke={fill}
      strokeMiterlimit={10}
      strokeWidth={32}
    />
  </Svg>
);
