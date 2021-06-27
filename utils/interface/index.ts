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

export interface TimelineAPIDoc {
  'metadata': {
    'dataVersion': string
    'matchId': string
    'participants': string[]
  }
  'info': {
    'frameInterval': number
    'frames': Frame[]
    'gameId': number
    'participants': Participant[]
  }
}

interface Frame {
  'events': Record<any, any>[]
  'participantFrames': Record<string, ParticipantFrame>
  'timestamp': number
}

interface Participant {
  'participantId': number
  'puuiud': string
}

interface ParticipantFrame {
  'championStats': {
    'abilityHaste': number
    'abilityPower': number
    'armor': number
    'armorPen': number
    'armorPenPercent': number
    'attackDamage': number
    'attackSpeed': number
    'bonusArmorPenPercent': number
    'bonusMagicPenPercent': number
    'ccReduction': number
    'cooldownReduction': number
    'health': number
    'healthMax': number
    'healthRegen': number
    'lifesteal': number
    'magicPen': number
    'magicPenPercent': number
    'magicResist': number
    'movementSpeed': number
    'omnivamp': number
    'physicalVamp': number
    'power': number
    'powerMax': number
    'powerRegen': number
    'spellVamp': number
  }
  'currentGold': number
  'damageStats': {
    'magicDamageDone': number
    'magicDamageDoneToChampions': number
    'magicDamageTaken': number
    'physicalDamageDone': number
    'physicalDamageDoneToChampions': number
    'physicalDamageTaken': number
    'totalDamageDone': number
    'totalDamageDoneToChampions': number
    'totalDamageTaken': number
    'trueDamageDone': number
    'trueDamageDoneToChampions': number
    'trueDamageTaken': number
  }
  'goldPerSecond': number
  'jungleMinionsKilled': number
  'level': number
  'minionsKilled': number
  'participantId': number
  'position': {
    'x': number
    'y': number
  }
  'timeEnemySpentControlled': number
  'totalGold': number
  'xp': number
}

export interface PatchData {
  version: string
  patchData: Record<any, any>
}
