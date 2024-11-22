const CircleChart = ({ data, colors, size = 200 }) => {
  let cumulativePercent = 0;

  const calculateCoordinates = (percent) => {
    const angle = (percent / 100) * 2 * Math.PI;
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    return { x, y };
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="-1 -1 2 2"
      style={{ transform: "rotate(-90deg)" }}
    >
      {data.map((value, index) => {
        const percent = value;
        const startCoordinates = calculateCoordinates(cumulativePercent * 100);
        cumulativePercent += percent / 100;
        const endCoordinates = calculateCoordinates(cumulativePercent * 100);
        const largeArcFlag = percent > 50 ? 1 : 0;

        // Calculate the position for the percentage label
        const midPercent = cumulativePercent - percent / (2 * 100);
        const labelCoordinates = calculateCoordinates(midPercent * 100);
        const labelX = labelCoordinates.x * 0.5; // Adjust the radius for label
        const labelY = labelCoordinates.y * 0.5;

        return (
          <g key={index}>
            {/* Path for the chart segment */}
            <path
              d={`M ${startCoordinates.x} ${startCoordinates.y} A 1 1 0 ${largeArcFlag} 1 ${endCoordinates.x} ${endCoordinates.y} L 0 0`}
              fill={colors[index]}
            />
            {/* Percentage label */}
            <text
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="0.2"
              fill="white"
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
