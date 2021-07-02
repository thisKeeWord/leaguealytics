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

export interface MatchesById {
  meta?: {
    matchId: string
  }
  data?: MatchesByIdData
}

export interface MatchesByIdData {
  gameId?: number
  gameVersion?: string
  gameMode?: string
  gameDuration?: number
  queueId?: number
  mapId?: number
  gameType?: number
  tournamentCode?: string
  gameStartTimestamp?: number
  matchId?: string
  platformId?: string
  gameCreation?: number
  gameName?: string
  participants?: Record<any, any>[]
  teams?: Team[]
  byTimeframe?: ByTimeframe[]
}

export interface Team {
  assists: number
  teamId: number
  kills: number
  goldEarned: number
  deaths: number
  win: boolean
  bans: Record<any, any>[]
  objectives: Objective
}

interface Objective {
  baron: {
    kills: number,
    first: boolean
  }
  champion: {
    kills: number,
    first: boolean
  }
  dragon: {
    kills: number,
    first: boolean
  }
  inhibitor: {
    kills: number,
    first: boolean
  }
  riftHerald: {
    kills: number,
    first: boolean
  }
  tower: {
    kills: number,
    first: boolean
  }
}

export interface ByTimeframe {
  timestamp: number
  events: Record<any, any>[]
  participantFrames: ParticipantFrame[]
}

export interface ParticipantFrame {
  participantId: number
  minionsKilled: number
  totalGold: number
  damageDoneToChampions: number
  damageTaken: number
  assists: number
  deaths: number
  kills: number
  wardsPlaced: number
  wardsPurchased: number
  wardsKilled: number
  itemSet: Record<any, number>
  items: number[]
  goldEarned?: number
  position: {
    x: number
    y: number
  }
}

export interface SummonersData {
  type: string
  data: Record<any, any>
  version: string
}
