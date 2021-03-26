import React, { FunctionComponent } from 'react';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryClipContainer,
  VictoryContainer,
  VictoryLabel,
  VictoryPortal,
} from 'victory';
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
        />
        <VictoryBar
          style={{
            data: { fill: '#c43a31' },
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
