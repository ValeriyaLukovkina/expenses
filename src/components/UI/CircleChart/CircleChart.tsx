import { FC } from 'react';

interface IData {
  color: string;
  percentage: number;
}

interface CircleChartProps {
  data: IData[];
}

const CircleChart: FC<CircleChartProps> = ({ data }) => {
  let cumulativePercent = 0;

  const calculateCoordinates = (percent: number) => {
    const angle = (percent / 100) * 2 * Math.PI;
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    return { x, y };
  };

  return (
    <svg width={200} height={200} viewBox='-1 -1 2 2' style={{ transform: 'rotate(-90deg)' }}>
      {data.map((value, index) => {
        const percent = value.percentage;
        const startCoordinates = calculateCoordinates(cumulativePercent * 100);
        cumulativePercent += percent / 100;
        const endCoordinates = calculateCoordinates(cumulativePercent * 100);
        const largeArcFlag = percent > 50 ? 1 : 0;

        const midPercent = cumulativePercent - percent / (2 * 100);
        const labelCoordinates = calculateCoordinates(midPercent * 100);
        const labelX = labelCoordinates.x * 0.5;
        const labelY = labelCoordinates.y * 0.5;

        return (
          <g key={index}>
            <path
              d={`M ${startCoordinates.x} ${startCoordinates.y} A 1 1 0 ${largeArcFlag} 1 ${endCoordinates.x} ${endCoordinates.y} L 0 0`}
              fill={value.color}
            />
            <text
              x={labelX}
              y={labelY}
              textAnchor='middle'
              dominantBaseline='middle'
              fontSize='0.2'
              fill='white'
            >
              {Math.round(percent)}%
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default CircleChart;
