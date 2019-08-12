import React from 'react';
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
} from 'victory-native';

export default ({
  target,
  targetList,
  text,
  valueArray,
  tickFormat,
  domain
}) => {
  if (targetList.length > 0) {
    return (
      <VictoryChart
        theme={VictoryTheme.material}
        scale={{ x: 'time' }}
        domain={{ y: domain }}
        domainPadding={{ x: 5 }}
        padding={{
          top: 40,
          bottom: 40,
          left: 60,
          right: 60
        }}
        animate={{ duration: 1000 }}
      >
        <VictoryLabel text={text} x={190} y={20} textAnchor="middle" />
        <VictoryAxis />
        <VictoryAxis
          dependentAxis
          tickValues={valueArray}
          tickFormat={tickFormat}
          style={chartStyle.axisY}
        />
        <VictoryLine
          data={targetList}
          interpolation="natural"
          x="time"
          y={target}
          style={chartStyle.line}
        />
      </VictoryChart>
    );
  }
  return null;
};

const chartStyle = {
  line: {
    data: {
      stroke: '#ad1b11',
      strokeWidth: 3
    },
    label: {
      fontSize: 5,
      padding: 15
    }
  },
  axisY: {
    grid: {
      stroke: 'silver',
      strokeWidth: 2
    }
  }
};
