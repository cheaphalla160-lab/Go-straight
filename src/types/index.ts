export interface WordItem {
  id: string;
  word: string;
  phonetic: string;
  translation: string;
  category: 'core' | 'appearance' | 'direction';
  sentence: string;
  sentenceTrans: string;
  phonicsTip?: string;
  rhymeWith?: string;
  color: string;
}

export interface CharacterOutfit {
  hair: 'blonde' | 'brown' | 'red' | 'blue' | 'none';
  facialHair: 'moustache' | 'beard' | 'goatee' | 'none';
  eyes: 'happy' | 'wink' | 'stars' | 'glasses';
  clothes: 'uniform' | 'chef' | 'cape' | 'striped';
  accessory: 'cake' | 'backpack' | 'partyhat' | 'bowtie' | 'none';
  skinTone: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  stars: number;
  avatar: string;
  date: string;
  badges: string[];
}

export interface QuizQuestion {
  id: number;
  type: 'word_match' | 'audio_listen' | 'rhyme' | 'direction' | 'spelling';
  title: string;
  prompt: string;
  audioPhrase: string;
  targetWord: string;
  options: {
    text: string;
    subText?: string;
    icon?: string;
  }[];
  correctIndex: number;
  explanation: string;
}

export type GameStage = 'dressup' | 'adventure' | 'wordarena' | 'result';
