import { WordItem, QuizQuestion } from '../types';

export const VOCABULARY_LIST: WordItem[] = [
  {
    id: 'cake',
    word: 'cake',
    phonetic: '/keɪk/',
    translation: '蛋糕',
    category: 'core',
    sentence: 'I bring a sweet cake to school.',
    sentenceTrans: '我带了一个香甜的蛋糕去学校。',
    phonicsTip: "Magic 'e' 发音规则：元音 a 发长音 /eɪ/，词尾 e 不发音！",
    rhymeWith: 'lake, make, bake',
    color: '#f43f5e'
  },
  {
    id: 'lake',
    word: 'lake',
    phonetic: '/leɪk/',
    translation: '湖泊',
    category: 'core',
    sentence: 'We see ducks swimming in the blue lake.',
    sentenceTrans: '我们看见鸭子在蓝色的湖里游泳。',
    phonicsTip: "与 cake 是押韵好兄弟 (Rhyming words)！词尾都是 -ake /eɪk/。",
    rhymeWith: 'cake, snake, take',
    color: '#0284c7'
  },
  {
    id: 'field',
    word: 'field',
    phonetic: '/fiːld/',
    translation: '田野 / 田地',
    category: 'core',
    sentence: 'The green field is full of yellow flowers.',
    sentenceTrans: '绿油油的田野开满了黄色的花朵。',
    phonicsTip: "'ie' 字母组合发长元音 /iː/，就像 bee 里的 ee 一样！",
    color: '#16a34a'
  },
  {
    id: 'blonde_hair',
    word: 'blonde hair',
    phonetic: '/blɒnd heə/',
    translation: '金黄色的头发',
    category: 'appearance',
    sentence: 'The happy boy has bright blonde hair.',
    sentenceTrans: '那个快乐的小男孩有一头亮丽的金发。',
    phonicsTip: "blonde 表示金黄色的，hair 是头发，合起来就是金发！",
    color: '#eab308'
  },
  {
    id: 'moustache',
    word: 'moustache',
    phonetic: '/mʊˈstɑːʃ/',
    translation: '胡子 / 八字胡',
    category: 'appearance',
    sentence: 'He puts on a funny brown moustache.',
    sentenceTrans: '他戴上了一个滑稽的棕色八字胡。',
    phonicsTip: "指嘴唇上方的八字胡，读作 /mʊˈstɑːʃ/，非常有绅士风度！",
    color: '#854d0e'
  },
  {
    id: 'go_straight',
    word: 'go straight',
    phonetic: '/ɡəʊ streɪt/',
    translation: '直行 / 径直走',
    category: 'direction',
    sentence: 'Go straight to the school, do not turn!',
    sentenceTrans: '一直往前走去学校，不要拐弯！',
    phonicsTip: "straight 里的 aigh 组合发 /eɪ/ 音，表示笔直的方向。",
    color: '#8b5cf6'
  },
  {
    id: 'school',
    word: 'school',
    phonetic: '/skuːl/',
    translation: '学校',
    category: 'direction',
    sentence: 'Welcome to our beautiful school!',
    sentenceTrans: '欢迎来到我们美丽的学校！',
    phonicsTip: "sch 发 /sk/，oo 发长音 /uː/，读作 /skuːl/。",
    color: '#ea580c'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    type: 'word_match',
    title: '装扮配对：金发在哪里？',
    prompt: 'Which word means "金黄色的头发"?',
    audioPhrase: 'blonde hair',
    targetWord: 'blonde hair',
    options: [
      { text: 'blonde hair', subText: '金发', icon: '👱' },
      { text: 'moustache', subText: '胡子', icon: '🥸' },
      { text: 'cake', subText: '蛋糕', icon: '🎂' },
      { text: 'field', subText: '田野', icon: '🌾' }
    ],
    correctIndex: 0,
    explanation: 'Correct! "blonde hair" 意思是金黄色的头发！'
  },
  {
    id: 2,
    type: 'word_match',
    title: '嘴唇上的滑稽小胡子',
    prompt: 'Look at the funny hair under the nose! What is it?',
    audioPhrase: 'moustache',
    targetWord: 'moustache',
    options: [
      { text: 'lake', subText: '湖泊', icon: '🌊' },
      { text: 'school', subText: '学校', icon: '🏫' },
      { text: 'moustache', subText: '八字胡', icon: '🥸' },
      { text: 'field', subText: '田野', icon: '🌾' }
    ],
    correctIndex: 2,
    explanation: 'Bingo! "moustache" 是长在嘴巴上方的八字胡！'
  },
  {
    id: 3,
    type: 'rhyme',
    title: '自然拼读好朋友：押韵小侦探',
    prompt: 'Which word rhymes with "cake" (发音押韵)?',
    audioPhrase: 'cake rhymes with lake',
    targetWord: 'lake',
    options: [
      { text: 'field', subText: '田野', icon: '🌾' },
      { text: 'lake', subText: '湖泊', icon: '🌊' },
      { text: 'school', subText: '学校', icon: '🏫' },
      { text: 'hair', subText: '头发', icon: '💇' }
    ],
    correctIndex: 1,
    explanation: 'Great ear! "c-ake" 和 "l-ake" 押韵，它们的尾音都是 /eɪk/！'
  },
  {
    id: 4,
    type: 'direction',
    title: '方向小向导：去学校怎么走？',
    prompt: 'How do you say "径直走 / 走直行" in English?',
    audioPhrase: 'go straight',
    targetWord: 'go straight',
    options: [
      { text: 'turn left', subText: '左转', icon: '⬅️' },
      { text: 'turn right', subText: '右转', icon: '➡️' },
      { text: 'go straight', subText: '走直行', icon: '⬆️' },
      { text: 'stop', subText: '停下', icon: '🛑' }
    ],
    correctIndex: 2,
    explanation: 'Awesome! "Go straight" 意思是直走，"Go straight to the school" 直直走向学校！'
  },
  {
    id: 5,
    type: 'word_match',
    title: '美丽的自然风光：绿色的田地',
    prompt: 'What do we call a wide open green grassland?',
    audioPhrase: 'field',
    targetWord: 'field',
    options: [
      { text: 'cake', subText: '蛋糕', icon: '🎂' },
      { text: 'field', subText: '田野', icon: '🌾' },
      { text: 'lake', subText: '湖泊', icon: '🌊' },
      { text: 'moustache', subText: '胡子', icon: '🥸' }
    ],
    correctIndex: 1,
    explanation: 'Well done! "field" 就是绿油油的田野和草地！'
  },
  {
    id: 6,
    type: 'audio_listen',
    title: '听力大耳朵：仔细听这是什么？',
    prompt: 'Listen carefully to the audio and pick the right dessert!',
    audioPhrase: 'delicious sweet cake',
    targetWord: 'cake',
    options: [
      { text: 'cake', subText: '蛋糕', icon: '🎂' },
      { text: 'lake', subText: '湖泊', icon: '🌊' },
      { text: 'school', subText: '学校', icon: '🏫' },
      { text: 'field', subText: '田野', icon: '🌾' }
    ],
    correctIndex: 0,
    explanation: 'Yummy! "cake" 是香甜美味的蛋糕！'
  }
];

export const TEACHER_LESSON_PLAN = {
  title: '小学趣味英语：Sweet Cake Adventure 教学指南',
  targetGrade: '小学 3-5 年级 (Primary Grade 3-5)',
  duration: '40 - 45 分钟',
  objectives: [
    '掌握核心词汇：cake, lake, field 的发音、词义与自然拼读规律。',
    '掌握外貌描述词汇：blonde hair, moustache 的图文对应及发音。',
    '掌握句型指令：Go straight to the school. 能够听懂并做出方向反应。',
    '发现自然拼读规律：对比 cake 与 lake 的押韵发音 (/eɪk/)，强化字母组合感知。'
  ],
  steps: [
    {
      time: '0-5 min',
      title: 'Warm-up: 韵律童谣与角色唤醒',
      activity: '教师播放网页背景音乐，全班齐念 Chant："Cake, Cake, by the Lake! Green green Field, what can we make?" 调动课堂兴奋度。'
    },
    {
      time: '5-15 min',
      title: 'Presentation & Puzzle: 身体拼图与外貌大变身',
      activity: '打开【打扮身体拼图】模块，邀请学生上台点击。学习 blonde hair (金发) 和 moustache (八字胡)。引导学生大声跟读单词，装扮成功后全体欢呼。'
    },
    {
      time: '15-28 min',
      title: 'Practice & Journey: 拿 Cake 走直行奔向 School',
      activity: '进入【大冒险地图】。学生需听指令："Take the cake!", "Go straight! Go straight to the school!" 并在路途中观察两侧的 Field 与 Lake，点击学习押韵。'
    },
    {
      time: '28-38 min',
      title: 'Production: 单词闯关 & 小组积分榜排位赛',
      activity: '分组开展【单词大挑战】，学生轮流作答，赚取星星与高分，将小组名录入【星星排行榜】，激发良性竞争。'
    },
    {
      time: '38-45 min',
      title: 'Summary & Flashcards: 总结与课后巩固',
      activity: '利用【可打印单词卡】进行快速闪卡认读，布置课后练习：给父母用英文指路 "Go straight to the room"。'
    }
  ],
  chants: [
    '🎵 Chant 1: Rhyme Time\nCake, cake, yummy cake! 🍰\nBy the blue and sunny lake! 🌊\nAcross the green, green grassy field! 🌾\nAll the happy stories yield!',
    '🎵 Chant 2: Action Time\nBlonde hair, blonde hair, shining bright! 👱\nFunny moustache, black and white! 🥸\nPick up the cake, take a bite! 🎂\nGo straight to the school with all your might! 🏫'
  ]
};
