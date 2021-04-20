import React, { FunctionComponent } from 'react';
import {
  VictoryAxis, VictoryBar, VictoryChart, VictoryClipContainer, VictoryLabel,
} from 'victory';
import styled from 'styled-components';

interface ChartProps {
  data: any;
  title: string;
  version: string | number
}

const StyledChart = styled.div`
  display: inline-block;
  padding: 10px;
  width: 50%;
  height: 65%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Chart: FunctionComponent<ChartProps> = (props: ChartProps) => {
  const playerType = props.data.map(({ isCurrentPlayer }) => isCurrentPlayer);

  return (
    <StyledChart>
      <VictoryChart domainPadding={10} height={400} width={400} horizontal>
        <VictoryLabel
          text={props.title}
          y={20}
          style={{
            fill: 'black',
          }}
        />
        <VictoryAxis
          dependentAxis
          standalone={false}
          tickLabelComponent={<VictoryLabel renderInPortal />}
          style={{
            tickLabels: {
              fill: 'black',
            },
            axis: {
              stroke: 'black',
            },
          }}
        />
        <VictoryAxis
          standalone={false}
          groupComponent={<VictoryClipContainer />}
          tickLabelComponent={<CustomLabel data={props.data} version={props.version} />}
          tickValues={props.data.map(({ x }, index: number) => `${x} (${index})`)}
          style={{
            tickLabels: {
              fill: ({ index }) => (playerType[index] ? 'green' : 'black'),
            },
            axis: {
              stroke: 'black',
            },
          }}
        />
        <VictoryBar
          style={{
            data: { fill: ({ datum }) => (datum.isCurrentPlayer ? 'green' : 'black') },
            labels: {
              fill: ({ datum }: any) => (datum.isCurrentPlayer ? 'green' : 'black'),
            },
          }}
          data={props.data.map(({ x, y, isCurrentPlayer }, index: number) => ({ x: `${x} (${index})`, y, isCurrentPlayer }))}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel dy={0} />}
        />
      </VictoryChart>
    </StyledChart>
  );
};

interface CustomLabelProps {
  // eslint-disable-next-line react/no-unused-prop-types
  x?: number
  // eslint-disable-next-line react/no-unused-prop-types
  y?: number
  // eslint-disable-next-line react/no-unused-prop-types
  data?: any[]
  // eslint-disable-next-line react/no-unused-prop-types
  datum?: any
  // eslint-disable-next-line react/no-unused-prop-types
  index?: number
  version: number | string
}

const CustomLabel = (props: CustomLabelProps) => {
  if (!props.data || (!props.index && props.index !== 0)) {
    return null;
  }

  return (
    <foreignObject y={(props.y || 0) - 10} x={23} style={{ height: '20px', width: '20px' }}>
      <img alt="champion" src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/champion/${props.data[props.index].x}.png`} style={{ height: '20px', width: '20px' }} />
      <span>{props.data[props.index].player}</span>
    </foreignObject>
  );
};

export default Chart;
