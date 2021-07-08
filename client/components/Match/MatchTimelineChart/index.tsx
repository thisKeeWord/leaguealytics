import React, { FunctionComponent } from 'react';
import Chart from '../../Chart';
import { convertTimestamp } from '../../../../utils/helper';
import { TimelineChartStyled } from './styles';

interface TimelineChartProps {
  data: any;
  title: string;
  version: string | number
  className?: string
  testId?: string
  initialTimeframe: number
  currTimeframe: number
}

const TimelineChart: FunctionComponent<TimelineChartProps> = (props: TimelineChartProps) => (
  <TimelineChartStyled>
    <div data-testid={props.testId} className={props.className}>
      <h4>{props.title}</h4>

      <div className="time-range">
        {props.currTimeframe > 0 && `${convertTimestamp(props.initialTimeframe)} - `}
        {convertTimestamp(props.currTimeframe)}
      </div>

      {props.data && (
        <Chart version={props.version} data={props.data} className="base-chart" />
      )}
    </div>
  </TimelineChartStyled>
);

export default TimelineChart;
