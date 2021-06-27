import React, { FunctionComponent, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { MapStyled } from './styles';
import { getParticipant, getStrokeColor } from '../../../../utils/helper';

interface MapProps {
  participantFrames: Record<any, any>
  participants: Record<any, any>[]
  currentPlayer: Record<any, any>
  mapId: number
  version: number | string
  matchId: string
}

const Map: FunctionComponent<MapProps> = (props: MapProps) => {
  const [matchMap, setMatchMap] = useState<d3.Selection<d3.BaseType, unknown, HTMLElement, any>>();

  const width = 486;
  const height = 486;
  const bg = `https://s3-us-west-1.amazonaws.com/riot-developer-portal/docs/map${props.mapId}.png`;
  let domain = {
    min: { x: -120, y: -120 },
    max: { x: 14870, y: 14980 },
  };

  if (props.mapId === 12) {
    domain = {
      min: { x: -28, y: -19 },
      max: { x: 12849, y: 12858 },
    };
  }

  const xScale = d3.scaleLinear()
    .domain([domain.min.x, domain.max.x])
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([domain.min.y, domain.max.y])
    .range([height, 0]);

  useEffect(() => {
    d3.select('#backdrop').remove();

    const svg = d3.select('#map').append('svg:svg')
      .attr('id', 'backdrop')
      .attr('width', width)
      .attr('height', height);

    svg.append('image')
      .attr('xlink:href', bg)
      .attr('x', '0')
      .attr('y', '0')
      .attr('width', width)
      .attr('height', height);

    setMatchMap(svg);
  }, [props.matchId]);

  useEffect(() => {
    if (matchMap && props.participantFrames && props.participantFrames.length) {
      d3.selectAll('.champIcons').remove();
      d3.selectAll('.champBorders').remove();

      props.participantFrames.forEach(({ position, participantId }) => {
        const participantObj = getParticipant(props.participants, participantId);
        const isCurrentPlayer = props.currentPlayer.participantId === participantId;

        matchMap.append('svg:g')
          .attr('class', 'champIcons')
          .selectAll('image')
          .data([[position.x, position.y]])
          .enter()
          .append('image')
          .attr(
            'xlink:href',
            `http://ddragon.leagueoflegends.com/cdn/${props.version}/img/champion/${participantObj?.championImg}.png`,
          )
          .attr('x', (d) => xScale(d[0]))
          .attr('y', (d) => yScale(d[1]));

        matchMap.append('svg:g')
          .attr('class', 'champBorders')
          .selectAll('rect')
          .data([[position.x, position.y]])
          .enter()
          .append('rect')
          .attr('x', (d) => xScale(d[0]))
          .attr('y', (d) => yScale(d[1]))
          .style('stroke-width', 2)
          .style('stroke', getStrokeColor(participantId, isCurrentPlayer))
          .attr('fill', 'transparent');
      });
    }
  }, [props.participantFrames, props.currentPlayer, props.mapId, matchMap]);

  if (props.mapId === 21 || !props.mapId) {
    return null;
  }

  return (
    <MapStyled>
      <div id="map" data-testid="map" />
    </MapStyled>
  );
};

export default Map;
