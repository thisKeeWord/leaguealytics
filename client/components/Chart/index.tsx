import React, { FunctionComponent, useState } from 'react';
import {
  VictoryAxis, VictoryBar, VictoryChart, VictoryClipContainer, VictoryLabel,
} from 'victory';
import cx from 'classnames';
import { StyledChart } from './styles';

interface ChartProps {
  data: any;
  title: string;
  version: string | number
  className?: string
  needsFloor?: boolean
}

const Chart: FunctionComponent<ChartProps> = (props: ChartProps) => {
  const [sortBy, setSortBy] = useState('');
  const reversedData = props.data.reverse();
  const sortedData = sortBy ? [...reversedData].sort((a, b) => {
    if (sortBy === 'ascending') {
      return b.y - a.y;
    }
    if (sortBy === 'descending') {
      return a.y - b.y;
    }

    return 0;
  }) : reversedData;
  const playerType = sortedData.map(({ isCurrentPlayer }) => isCurrentPlayer);

  return (
    <StyledChart className={cx(props.className)}>
      <div className="sort">
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">no sort</option>
          <option value="ascending">ascending</option>
          <option value="descending">descending</option>
        </select>
      </div>
      <svg
        viewBox="0 0 430 430"
        height="100%"
        width="100%"
      >
        <VictoryChart domainPadding={10} height={410} width={410} horizontal standalone={false}>
          <VictoryLabel
            text={props.title}
            y={20}
            style={{ fill: 'black', paddingLeft: '20px' }}
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
            tickLabelComponent={<VictoryLabel renderInPortal />}
            style={{
              tickLabels: { fill: 'black' },
              axis: { stroke: 'black' },
            }}
            tickFormat={(d: number) => (props.needsFloor ? Math.floor(d) : d)}
          />
          <VictoryAxis
            standalone={false}
            groupComponent={<VictoryClipContainer />}
            tickLabelComponent={<CustomLabel data={sortedData} version={props.version} />}
            tickValues={sortedData.map(({ x }, index: number) => `${x} (${index})`)}
            style={{
              tickLabels: {
                fill: ({ index }) => (playerType[index] ? 'green' : 'black'),
              },
              axis: { stroke: 'black' },
            }}
          />
          <VictoryBar
            style={{
              data: {
                fill: ({ datum }) => {
                  if (datum.isCurrentPlayer) {
                    return datum.team === 100 ? '#1b31a2' : '#8e1719';
                  }
                  if (datum.team === 100) {
                    return '#2747e8';
                  }
                  if (datum.team === 200) {
                    return '#cb2124';
                  }

                  return 'black';
                },
              },
              labels: {
                fill: ({ datum }: any) => {
                  if (datum.isCurrentPlayer) {
                    return datum.team === 100 ? '#1b31a2' : '#8e1719';
                  }
                  if (datum.team === 100) {
                    return '#2747e8';
                  }
                  if (datum.team === 200) {
                    return '#cb2124';
                  }

                  return 'black';
                },
              },
            }}
            data={sortedData.map(({
              x, y, isCurrentPlayer, team,
            }, index: number) => ({
              x: `${x} (${index})`, y, isCurrentPlayer, team,
            }))}
            labels={({ datum }) => datum.y}
            labelComponent={<VictoryLabel dy={0} />}
          />
        </VictoryChart>
      </svg>
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
      {/* eslint-disable-next-line max-len */}
      <img alt="champion" src={`http://ddragon.leagueoflegends.com/cdn/${props.version}/img/champion/${props.data[props.index].x}.png`} style={{ height: '20px', width: '20px' }} />
      <span>{props.data[props.index].player}</span>
    </foreignObject>
  );
};

export default Chart;
