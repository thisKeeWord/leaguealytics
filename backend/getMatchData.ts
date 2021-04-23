// import util from 'util';
import api from '../api';

export const getMatchData = async (req, res) => {
  const { username, matchId } = req.params;

  try {
    const firestoreMatchDoc = api.users
      .doc(username)
      .collection('match')
      .doc(matchId);
    const firestoreMatchData = (await firestoreMatchDoc.get()).data() || {};

    if (firestoreMatchData.size > 0 && firestoreMatchData.byTimeframe) {
      res.send(firestoreMatchData);

      return;
    }

    const matchTimelineData = (await api.riotAPI.match.timeline.get(matchId)).data;

    // eslint-disable-next-line prefer-const
    let byTimeframe: Record<any, any>[] = [];
    // eslint-disable-next-line prefer-const
    let participantFrames: Record<string, any> = {};
    for (let i = 0; i < matchTimelineData.info.frames.length; i++) {
      // eslint-disable-next-line prefer-const
      let frame = matchTimelineData.info.frames[i];
      const events: Record<any, any>[] = [];
      // eslint-disable-next-line prefer-const, no-restricted-syntax, guard-for-in
      for (let key in frame.participantFrames) {
        participantFrames[key] = {
          ...participantFrames[key],
          participantId: frame.participantFrames[key].participantId,
          // eslint-disable-next-line max-len
          minionsKilled: frame.participantFrames[key].minionsKilled + frame.participantFrames[key].jungleMinionsKilled,
          position: frame.participantFrames[key].position,
          totalGold: frame.participantFrames[key].totalGold,
          // eslint-disable-next-line max-len
          damageDoneToChampions: frame.participantFrames[key].damageStats.totalDamageDoneToChampions,
          damageTaken: frame.participantFrames[key].damageStats.totalDamageTaken,

        };
      }
      for (let j = 0; j < frame.events.length; j++) {
        const {
          // eslint-disable-next-line max-len, no-unused-vars
          type, creatorId, victimId, position, killerId, assistingParticipantIds, timestamp, itemId, participantId, beforeId, afterId,
        } = frame.events[j];

        // console.log(participantFrames, 'participantFrames');

        if (type === 'CHAMPION_KILL') {
          events.push(frame.events[j]);
          if (assistingParticipantIds) {
            assistingParticipantIds.forEach((assistId) => {
              if (!participantFrames[assistId].assists) {
                participantFrames[assistId].assists = 1;
              } else {
                participantFrames[assistId].assists++;
              }
            });
          }
          if (!participantFrames[victimId].deaths) {
            participantFrames[victimId].deaths = 1;
          } else {
            participantFrames[victimId].deaths++;
          }
          if (killerId !== 0) {
            if (!participantFrames[killerId].kills) {
              participantFrames[killerId].kills = 1;
            } else {
              participantFrames[killerId].kills++;
            }
          }
        }

        if (type === 'BUILDING_KILL') {
          events.push(frame.events[j]);
        }
        if (type === 'WARD_PLACED') {
          if (!participantFrames[creatorId].wardsPlaced) {
            participantFrames[creatorId].wardsPlaced = 1;
          } else {
            participantFrames[creatorId].wardsPlaced++;
          }
        }
        if (type === 'WARD_KILL') {
          if (!participantFrames[killerId].wardsKilled) {
            participantFrames[killerId].wardsKilled = 1;
          } else {
            participantFrames[killerId].wardsKilled++;
          }
        }
        // if (['ITEM_SOLD', 'ITEM_DESTROYED'].includes(type)) {
        //   // eslint-disable-next-line max-len
        //   if (Array.isArray(participantFrames[participantId].items)) {
        // eslint-disable-next-line max-len
        //     participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(itemId), 1);
        //   }
        // }
        // if (type === 'ITEM_PURCHASED') {
        //   if (!participantFrames[participantId].items) {
        //     participantFrames[participantId].items = [itemId];
        //   } else {
        //     participantFrames[participantId].items.push(itemId);
        //   }
        //   // control ward
        //   if (itemId === 2055) {
        //     // eslint-disable-next-line max-len
        //     if (!participantFrames[participantId].wardsPurchased) {
        //       participantFrames[participantId].wardsPurchased = 1;
        //     } else {
        //       participantFrames[participantId].wardsPurchased++;
        //     }
        //   }
        // }
        // if (type === 'ITEM_UNDO') {
        //   if (Array.isArray(afterId)) {
        //   // eslint-disable-next-line max-len
        // eslint-disable-next-line max-len
        //     participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(beforeId), 1, ...afterId);
        //   } else if (afterId) {
        //     // eslint-disable-next-line max-len
        // eslint-disable-next-line max-len
        //     participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(beforeId), 1, afterId);
        //   } else {
        //     // eslint-disable-next-line max-len
        // eslint-disable-next-line max-len
        //     participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(beforeId), 1);
        //   }
        // }
      }

      // eslint-disable-next-line max-len
      const modifiedParticipantFrames = Object.keys(participantFrames).map((key) => participantFrames[key]);

      // eslint-disable-next-line max-len
      byTimeframe.push({ timestamp: frame.timestamp, events, participantFrames: modifiedParticipantFrames });
    }

    // console.log(byTimeframe.length, matchTimelineData.info.frames.length);

    await firestoreMatchDoc.set({ byTimeframe }, { merge: true });

    res.send({ ...firestoreMatchData, byTimeframe: Object.values(byTimeframe) });
  } catch (error) {
    res.send({ error: error.message });
  }
};
