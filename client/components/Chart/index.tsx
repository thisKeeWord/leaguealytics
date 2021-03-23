import React, { FunctionComponent } from 'react';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';

interface ChartProps {
  data: any;
}

const Chart: FunctionComponent<ChartProps> = (props: ChartProps) => {
  console.log(props.data, 'data');
  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
      <VictoryBar
        style={{
          data: { fill: '#c43a31' },
        }}
        data={props.data}
      />
    </VictoryChart>
  );
};

export default Chart;
