export interface FirebaseUserDoc {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
  matches?: any[];
}

export interface PatchData {
  version: string
  patchData: Record<any, any>
}

// export interface TimelineAPIDoc {
//   'metadata': {
//     'dataVersion': string
//     'matchId': string
//     'participants': string[]
//   }
//   'info': {
//     'frameInterval': number
//     'frames': Frame[]
//     'gameId': number
//     'participants': Participant[]
//   }
// }

// export interface Frame {
//   'events': Record<any, any>[]
//   'participantFrames': Record<string, ParticipantFrame> | ParticipantFrame[]
//   'timestamp': number
// }

// interface Participant {
//   'participantId': number
//   'puuiud': string
// }

// export interface ParticipantFrame {
//   'championStats': {
//     'abilityHaste': number
//     'abilityPower': number
//     'armor': number
//     'armorPen': number
//     'armorPenPercent': number
//     'attackDamage': number
//     'attackSpeed': number
//     'bonusArmorPenPercent': number
//     'bonusMagicPenPercent': number
//     'ccReduction': number
//     'cooldownReduction': number
//     'health': number
//     'healthMax': number
//     'healthRegen': number
//     'lifesteal': number
//     'magicPen': number
//     'magicPenPercent': number
//     'magicResist': number
//     'movementSpeed': number
//     'omnivamp': number
//     'physicalVamp': number
//     'power': number
//     'powerMax': number
//     'powerRegen': number
//     'spellVamp': number
//   }
//   'currentGold': number
//   'damageStats': {
//     'magicDamageDone': number
//     'magicDamageDoneToChampions': number
//     'magicDamageTaken': number
//     'physicalDamageDone': number
//     'physicalDamageDoneToChampions': number
//     'physicalDamageTaken': number
//     'totalDamageDone': number
//     'totalDamageDoneToChampions': number
//     'totalDamageTaken': number
//     'trueDamageDone': number
//     'trueDamageDoneToChampions': number
//     'trueDamageTaken': number
//   }
//   'goldPerSecond': number
//   'jungleMinionsKilled': number
//   'level': number
//   'minionsKilled': number
//   'participantId': number
//   'position': {
//     'x': number
//     'y': number
//   }
//   'timeEnemySpentControlled': number
//   'totalGold': number
//   'xp': number
// }

// export interface MatchInterface {
//   byTimeframe: Frame[]
//   gameCreation: number
//   gameDuration: number
//   gameId: number
//   gameMode: string
//   gameName: string
//   gameStartTimestamp: number
//   gameType: string
//   gameVersion: string
//   mapId: number
//   matchId: string
//   participants: ParticipantData[]
//   platformId: string
//   queueId: number
//   teams: {
//     assists: number
//     bans: Record<any, any>[]
//     deaths: number
//     goldEarned: number
//     kills: number
//     objectives: Record<any, any>
//     teamId: 100 | 200
//     win: boolean
//   }[]
//   tournamentCode: string
// }

// export interface ParticipantData {
//   assists: number
//   baronKills: number
//   bountyLevel: number
//   champExperience: number
//   champLevel: number
//   championId: number
//   championName: string
//   championTransform: number
//   consumablesPurchased: number
//   damageDealtToBuildings: number
//   damageDealtToObjectives: number
//   damageDealtToTurrets: number
//   damageSelfMitigated: number
//   deaths: number
//   detectorWardsPlaced: number
//   doubleKills: number
//   dragonKills: number
//   firstBloodAssist: boolean
//   firstBloodKill: boolean
//   firstTowerAssist: boolean
//   firstTowerKill: boolean
//   gameEndedInEarlySurrender: boolean
//   gameEndedInSurrender: boolean
//   goldEarned: number
//   goldSpent: number
//   individualPosition: string
//   inhibitorKills: number
//   inhibitorTakedowns: number
//   inhibitorsLost: number
//   item0: number
//   item1: number
//   item2: number
//   item3: number
//   item4: number
//   item5: number
//   item6: number
//   itemsPurchased: number
//   killingSprees: number
//   kills: number
//   lane: string
//   largestCriticalStrike: number
//   largestKillingSpree: number
//   largestMultiKill: number
//   longestTimeSpentLiving: number
//   magicDamageDealt: number
//   magicDamageDealtToChampions: number
//   magicDamageTaken: number
//   neutralMinionsKilled: number
//   nexusKills: number
//   nexusLost: number
//   nexusTakedowns: number
//   objectivesStolen: number
//   objectivesStolenAssists: number
//   participantId: number
//   pentaKills: number
//   perks: Record<any, any>
//   physicalDamageDealt: number
//   physicalDamageDealtToChampions: number
//   physicalDamageTaken: number
//   profileIcon: number
//   puuid: string
//   quadraKills: number
//   riotIdName: string
//   riotIdTagline: string
//   role: string
//   sightWardsBoughtInGame: number
//   spell1Casts: number
//   spell2Casts: number
//   spell3Casts: number
//   spell4Casts: number
//   summoner1Casts: number
//   summoner1Id: number
//   summoner2Casts: number
//   summoner2Id: number
//   summonerId: string
//   summonerLevel: number
//   summonerName: string
//   teamEarlySurrendered: boolean
//   teamId: 100 | 200
//   teamPosition: string
//   timeCCingOthers: number
//   timePlayed: number
//   totalDamageDealt: number
//   totalDamageDealtToChampions: number
//   totalDamageShieldedOnTeammates: number
//   totalDamageTaken: number
//   totalHeal: number
//   totalHealsOnTeammates: number
//   totalMinionsKilled: number
//   totalTimeCCDealt: number
//   totalTimeSpentDead: number
//   totalUnitsHealed: number
//   tripleKills: number
//   trueDamageDealt: number
//   trueDamageDealtToChampions: number
//   trueDamageTaken: number
//   turretKills: number
//   turretTakedowns: number
//   turretsLost: number
//   unrealKills: number
//   visionScore: number
//   visionWardsBoughtInGame: number
//   wardsKilled: number
//   wardsPlaced: number
//   win: boolean
// }
