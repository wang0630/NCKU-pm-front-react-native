import React from 'react';
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel
} from 'victory-native';

export default ({
  target,
  targetList,
  text,
  valueArray,
  tickFormat
}) => (
  <VictoryChart
    theme={VictoryTheme.material}
    scale={{ x: 'time' }}
    domain={{ y: [20, 80] }}
    domainPadding={20}
    padding={60}
  >
    <VictoryLabel text={text} x={200} y={30} textAnchor="middle" />
    <VictoryAxis />
    <VictoryAxis
      dependentAxis
      tickValues={valueArray}
      tickFormat={tickFormat}
    />
    <VictoryLine
      data={targetList}
      x="time"
      y={target}
    />
  </VictoryChart>
);
