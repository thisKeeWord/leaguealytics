import React, { FunctionComponent } from 'react';
import { VictoryBar, VictoryChart, VictoryContainer, VictoryLabel, VictoryTheme } from 'victory';

interface ChartProps {
  data: any;
  title: string;
}

const Chart: FunctionComponent<ChartProps> = (props: ChartProps) => {
  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={10} height={400} width={400}>
      <VictoryLabel text={props.title} y={20} />
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
