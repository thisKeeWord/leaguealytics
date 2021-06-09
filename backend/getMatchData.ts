import api from '../api';

export const getMatchData = async (req, res) => {
  const { username, matchId } = req.params;

  try {
    const firestoreMatchDoc = api.users
      .doc(username)
      .collection('match')
      .doc(matchId);
    const firestoreMatchData = (await firestoreMatchDoc.get()).data() || {};

    // just in case frontend allowed api call to get timeline
    // even though already saved
    if (firestoreMatchData.size > 0 && firestoreMatchData.byTimeframe) {
      res.send(firestoreMatchData);

      return;
    }

    const matchTimelineData = (await api.riotAPI.match.timeline.get(matchId)).data;

    // eslint-disable-next-line prefer-const
    let byTimeframe: Record<any, any>[] = [];
    // eslint-disable-next-line prefer-const
    let participantFrames: Record<string, any>[] = [];
    for (let i = 0; i < matchTimelineData.info.frames.length; i++) {
      // eslint-disable-next-line prefer-const
      let frame = matchTimelineData.info.frames[i];
      const events: Record<any, any>[] = [];
      // eslint-disable-next-line prefer-const, no-restricted-syntax, guard-for-in
      for (let key in frame.participantFrames) {
        participantFrames[key] = {
          ...participantFrames[key],
          participantId: frame.participantFrames[key].participantId,
          minionsKilled: frame.participantFrames[key].minionsKilled + frame.participantFrames[key].jungleMinionsKilled,
          position: frame.participantFrames[key].position,
          totalGold: frame.participantFrames[key].totalGold,
          damageDoneToChampions: frame.participantFrames[key].damageStats.totalDamageDoneToChampions,
          damageTaken: frame.participantFrames[key].damageStats.totalDamageTaken,
          items: (Boolean(participantFrames[key]) && participantFrames[key].items) || [],
          assists: (Boolean(participantFrames[key]) && participantFrames[key].assists) || 0,
          deaths: (Boolean(participantFrames[key]) && participantFrames[key].deaths) || 0,
          kills: (Boolean(participantFrames[key]) && participantFrames[key].kills) || 0,
          wardsPlaced: (Boolean(participantFrames[key]) && participantFrames[key].wardsPlaced) || 0,
          wardsPurchased: (Boolean(participantFrames[key]) && participantFrames[key].wardsPurchased) || 0,
          wardsKilled: (Boolean(participantFrames[key]) && participantFrames[key].wardsKilled) || 0,

        };
      }
      for (let j = 0; j < frame.events.length; j++) {
        const {
          // eslint-disable-next-line max-len, no-unused-vars
          type, creatorId, victimId, position, killerId, assistingParticipantIds, timestamp, itemId, participantId, beforeId, afterId, wardType,
        } = frame.events[j];

        if (type === 'CHAMPION_KILL') {
          events.push(frame.events[j]);
          if (assistingParticipantIds) {
            assistingParticipantIds.forEach((assistId) => {
              participantFrames[assistId].assists++;
            });
          }
          participantFrames[victimId].deaths++;
          if (killerId !== 0) {
            participantFrames[killerId].kills++;
          }
        }

        if (type === 'ELITE_MONSTER_KILL' || type === 'BUILDING_KILL') {
          events.push(frame.events[j]);
        }

        if (type === 'WARD_PLACED') {
          events.push(frame.events[j]);
          if (wardType !== 'UNDEFINED') {
            participantFrames[creatorId].wardsPlaced++;
          }
        }
        if (type === 'WARD_KILL') {
          events.push(frame.events[j]);
          if (wardType !== 'UNDEFINED') {
            participantFrames[killerId].wardsKilled++;
          }
        }

        // ITEM HANDLING MAY REMOVED AS IT REQUIRES POTENTIAL FREQUENT UPDATES
        if (type === 'ITEM_SOLD') {
          participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(itemId), 1);
        }
        // ITEM HANDLING MAY REMOVED AS IT REQUIRES POTENTIAL FREQUENT UPDATES
        /* special cases for later since they are, with the exception of
        ** stopwatch and broken stopwatch, items not bought:
        ** - biscuit (2410)
        ** - commencing stopwatch (2419)
        ** - stopwatch (2420)
        ** - broken stopwatch (2421)
        ** - minion dematerializer (2403)
        ** - slightly magical footwear (2422)
        ** - your cut - pyke's ultimate (3400)
        ** - eye of the herald (3513)
        ** items that automatically transform without further purchases:
        ** - archangel's staff (3003) -> 3040
        ** - manamune (3004) -> 3042
        ** - spellthief's edge (3850) -> 3851
        ** - frostfang (3851) -> 3853
        ** - steel shoulderguards (3854) -> 3855
        ** - runesteel spaulders (3855) -> 3857
        ** - relic shield (3858) -> 3859
        ** - targon's buckler (3859) -> 3860
        ** - spectral sickle (3862) -> 3863
        ** - harrowing crescent (3863) -> 3864
        ** if item is destroyed or sold and is in inventory
        */
        if (type === 'ITEM_DESTROYED') {
          if (itemId === 3003) {
            participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(itemId), 1, 3040);
          } else if (itemId === 3004) {
            participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(itemId), 1, 3042);
          } else if (itemId === 3850) {
            participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(itemId), 1, 3851);
          } else if (itemId === 3851) {
            participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(itemId), 1, 3853);
          } else if (itemId === 3854) {
            participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(itemId), 1, 3855);
          } else if (itemId === 3855) {
            participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(itemId), 1, 3857);
          } else if (itemId === 3858) {
            participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(itemId), 1, 3859);
          } else if (itemId === 3859) {
            participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(itemId), 1, 3860);
          } else if (itemId === 3862) {
            participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(itemId), 1, 3863);
          } else if (itemId === 3863) {
            participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(itemId), 1, 3864);
          } else {
            participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(itemId), 1);
          }
        }
        // ITEM HANDLING MAY REMOVED AS IT REQUIRES POTENTIAL FREQUENT UPDATES
        if (type === 'ITEM_PURCHASED') {
          participantFrames[participantId].items.push(itemId);
          // control ward
          if (itemId === 2055) {
            participantFrames[participantId].wardsPurchased++;
          }
        }
        // ITEM HANDLING MAY REMOVED AS IT REQUIRES POTENTIAL FREQUENT UPDATES
        if (type === 'ITEM_UNDO') {
          if (Array.isArray(afterId)) {
            participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(beforeId), 1, ...afterId);
          } else if (afterId) {
            participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(beforeId), 1, afterId);
          } else {
            participantFrames[participantId].items.splice(participantFrames[participantId].items.lastIndexOf(beforeId), 1);
          }
        }
      }

      const filteredParticipantFrames = participantFrames.filter((participantFrame) => !!participantFrame);
      // ITEM HANDLING MAY REMOVED AS IT REQUIRES POTENTIAL FREQUENT UPDATES
      const updatedParticipantFrames = filteredParticipantFrames.map((filteredFrame) => {
        // not sure why the 'items' array is always being set to the last one
        filteredFrame.itemSet = { ...filteredFrame.items };

        return filteredFrame;
      });

      byTimeframe.push({ timestamp: frame.timestamp, events, participantFrames: updatedParticipantFrames });
    }

    await firestoreMatchDoc.set({ byTimeframe }, { merge: true });

    res.send({ ...firestoreMatchData, byTimeframe });
  } catch (error) {
    res.send({ error: error.message });
  }
};
