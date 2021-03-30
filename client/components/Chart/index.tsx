import React, { FunctionComponent } from 'react';
import { CallbackArgs, VictoryAxis, VictoryBar, VictoryChart, VictoryLabel } from 'victory';
import styled from 'styled-components';

interface ChartProps {
  data: any;
  title: string;
}

const StyledChart = styled.div`
  display: inline-block;
  padding: 40px;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Chart: FunctionComponent<ChartProps> = (props: ChartProps) => {
  const playerType = props.data.map(({ isCurrentPlayer }) => isCurrentPlayer);

  return (
    <StyledChart>
      <VictoryChart domainPadding={10} height={400} width={400} horizontal>
        <VictoryLabel text={props.title} y={20} />
        <VictoryAxis
          dependentAxis
          standalone={false}
          tickLabelComponent={<VictoryLabel renderInPortal={true} />}
        />
        <VictoryAxis
          standalone={false}
          tickLabelComponent={<VictoryLabel renderInPortal={true} />}
          style={{
            tickLabels: {
              fill: ({ index }) => (playerType[index] ? 'green' : 'black'),
            },
          }}
        />
        <VictoryBar
          style={{
            data: { fill: '#c43a31' },
            labels: {
              fill: ({ datum }: any) => (datum.isCurrentPlayer ? 'green' : 'black'),
            },
          }}
          data={props.data}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel dy={0} />}
        />
      </VictoryChart>
    </StyledChart>
  );
};

export default Chart;
