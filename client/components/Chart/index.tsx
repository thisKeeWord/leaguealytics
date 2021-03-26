import React, { FunctionComponent } from 'react';
import { VictoryBar, VictoryChart, VictoryLabel } from 'victory';

interface ChartProps {
  data: any;
  title: string;
}

const Chart: FunctionComponent<ChartProps> = (props: ChartProps) => {
  return (
    <svg viewBox='0 0 400 400' height='80%' width='50%'>
      <VictoryChart standalone={false} domainPadding={10} height={400} width={400} horizontal>
        <VictoryLabel text={props.title} y={20} />
        <VictoryBar
          style={{
            data: { fill: '#c43a31' },
          }}
          data={props.data}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel dy={0} />}
        />
      </VictoryChart>
    </svg>
  );
};

export default Chart;
