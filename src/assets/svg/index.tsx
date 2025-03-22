import * as React from 'react';
import Svg, {Path, Rect, SvgProps} from 'react-native-svg';

export type SvgProps2 = SvgProps & {
  fill2?: string;
  fill3?: string;
  fill4?: string;
};

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
  <Svg width={width} height={height} fill="none">
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
  <Svg width={width} height={height} fill="none" {...props} viewBox={`0 0 24 24`}>
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

export const CalendarSVG = ({width = 24, height = 24, fill = '#fff', ...props}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z"
    />
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.995 13.7h.01M8.294 13.7h.01M8.294 16.7h.01"
    />
  </Svg>
)
