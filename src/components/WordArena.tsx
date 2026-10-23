import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { VOCABULARY_LIST, QUIZ_QUESTIONS } from '../data/vocabulary';
import { WordItem, QuizQuestion } from '../types';
import { soundManager, speakEnglish } from '../utils/audio';
import { Volume2, CheckCircle2, XCircle, RotateCcw, Sparkles, BookOpen, Trophy, ArrowRight, HelpCircle } from 'lucide-react';

interface WordArenaProps {
  onAddScore: (points: number, reason: string) => void;
  onOpenLeaderboard: () => void;
}

export const WordArena: React.FC<WordArenaProps> = ({
  onAddScore,
  onOpenLeaderboard,
}) => {
  const [activeMode, setActiveMode] = useState<'flashcards' | 'rhyme' | 'quiz'>('quiz');
  const [selectedWord, setSelectedWord] = useState<WordItem>(VOCABULARY_LIST[0]);

  // Quiz state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIdx];

  const handlePlayAudio = (text: string, rate = 0.9) => {
    soundManager.playPop();
    speakEnglish(text, rate);
  };

  const handleAnswerSelect = (optionIdx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionIdx);
    setIsAnswerSubmitted(true);

    const isCorrect = optionIdx === currentQ.correctIndex;
    if (isCorrect) {
      soundManager.playDing();
      setQuizScore(prev => prev + 50);
      onAddScore(50, `Quiz Question ${currentQuestionIdx + 1} Correct`);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
      speakEnglish('Excellent! ' + currentQ.targetWord);
    } else {
      soundManager.playPop();
      speakEnglish('Try again next time! The correct word is ' + currentQ.targetWord);
    }
  };

  const handleNextQuestion = () => {
    soundManager.playPop();
    if (currentQuestionIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      soundManager.playFanfare();
      speakEnglish('Great job! You finished the quiz challenge!');
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setQuizFinished(false);
    soundManager.playPop();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Top Navigation Mode Tabs */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={() => {
            soundManager.playPop();
            setActiveMode('quiz');
          }}
          className={`px-5 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 transition-all cursor-pointer ${
            activeMode === 'quiz'
              ? 'bg-purple-600 text-white shadow-lg scale-105'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Trophy className="w-4 h-4" /> 🎯 单词大挑战 (Mini Quiz)
        </button>

        <button
          onClick={() => {
            soundManager.playPop();
            setActiveMode('flashcards');
          }}
          className={`px-5 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 transition-all cursor-pointer ${
            activeMode === 'flashcards'
              ? 'bg-rose-500 text-white shadow-lg scale-105'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" /> 📖 趣味单词卡 (Flashcards)
        </button>

        <button
          onClick={() => {
            soundManager.playPop();
            setActiveMode('rhyme');
          }}
          className={`px-5 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 transition-all cursor-pointer ${
            activeMode === 'rhyme'
              ? 'bg-sky-500 text-white shadow-lg scale-105'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" /> 🎵 Cake & Lake 押韵派对 (Rhyme)
        </button>
      </div>

      {/* MODE 1: MINI QUIZ */}
      {activeMode === 'quiz' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border-4 border-purple-300 shadow-2xl relative overflow-hidden">
          {!quizFinished ? (
            <div>
              {/* Quiz Header & Progress Bar */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-sm font-extrabold text-amber-600 flex items-center gap-1">
                  ⭐ 本轮得分: +{quizScore}
                </span>
              </div>

              {/* Progress bar line */}
              <div className="w-full h-2.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 rounded-full"
                  style={{
                    width: `${((currentQuestionIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Body */}
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-2">
                  {currentQ.title}
                </h3>
                <p className="text-base text-slate-600 font-semibold mb-3">
                  {currentQ.prompt}
                </p>

                {/* Pronunciation Sound Trigger */}
                <button
                  onClick={() => handlePlayAudio(currentQ.audioPhrase)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-2xl font-bold text-sm transition-transform hover:scale-105 cursor-pointer shadow-sm"
                >
                  <Volume2 className="w-4 h-4 text-purple-700" />
                  <span>点击播放提示读音 (Listen to Prompt)</span>
                </button>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  let btnStyle = 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800';

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-100 text-emerald-900 ring-2 ring-emerald-400 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'border-rose-500 bg-rose-100 text-rose-900 ring-2 ring-rose-300 font-bold';
                    } else {
                      btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerSubmitted}
                      onClick={() => handleAnswerSelect(idx)}
                      className={`p-4 rounded-2xl border-4 text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{opt.icon || '✨'}</span>
                        <div>
                          <div className="font-extrabold text-base md:text-lg">
                            {opt.text}
                          </div>
                          {opt.subText && (
                            <div className="text-xs text-slate-500">{opt.subText}</div>
                          )}
                        </div>
                      </div>

                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {isAnswerSubmitted && (
                <div className="max-w-2xl mx-auto bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-4 animate-fade-in">
                  <div className="flex items-start gap-2.5">
                    <HelpCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                    <div className="text-xs md:text-sm text-slate-700 leading-relaxed">
                      {currentQ.explanation}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-black text-sm shadow hover:scale-105 transition-transform flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{currentQuestionIdx + 1 === QUIZ_QUESTIONS.length ? '查看挑战成果' : '下一题'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed View */
            <div className="text-center py-8">
              <span className="text-6xl animate-bounce inline-block mb-3">🏆</span>
              <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">
                恭喜完成单词小试炼！
              </h3>
              <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto mb-6">
                你成功复习了 <strong>cake, lake, field, blonde hair, moustache, go straight</strong> 等核心词汇！
              </p>

              <div className="inline-block bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 mb-6">
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                  本次测验总奖励
                </div>
                <div className="text-4xl font-black text-amber-600">
                  +{quizScore} 分
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleRestartQuiz}
                  className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> 再挑战一次
                </button>

                <button
                  onClick={onOpenLeaderboard}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-extrabold text-sm shadow-lg hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
                >
                  <Trophy className="w-4 h-4" /> 查看星星排行榜并登记大名！
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: FLASHCARDS */}
      {activeMode === 'flashcards' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left: Word Selector List */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
              核心单词目录 (Word List)
            </span>
            {VOCABULARY_LIST.map((word) => (
              <button
                key={word.id}
                onClick={() => {
                  soundManager.playPop();
                  setSelectedWord(word);
                  speakEnglish(word.word);
                }}
                className={`w-full p-3 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-center justify-between ${
                  selectedWord.id === word.id
                    ? 'border-rose-400 bg-rose-50 shadow-md font-bold'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="text-sm font-extrabold text-slate-800">{word.word}</div>
                  <div className="text-xs text-slate-500">{word.translation}</div>
                </div>
                <Volume2 className="w-4 h-4 text-slate-400 hover:text-rose-600" />
              </button>
            ))}
          </div>

          {/* Right: Big Interactive Flashcard */}
          <div className="md:col-span-8 bg-white rounded-3xl p-6 md:p-8 border-4 border-rose-300 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold text-white px-3 py-1 rounded-full uppercase" style={{ backgroundColor: selectedWord.color }}>
                  {selectedWord.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedWord.phonetic}
                </span>
              </div>

              <div className="text-center py-6">
                <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-2">
                  {selectedWord.word}
                </h2>
                <div className="text-lg md:text-xl font-bold text-slate-500 mb-4">
                  {selectedWord.translation}
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => speakEnglish(selectedWord.word, 0.9)}
                    className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold text-sm shadow flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                  >
                    <Volume2 className="w-4 h-4" /> 正常语速朗读
                  </button>

                  <button
                    onClick={() => speakEnglish(selectedWord.word, 0.6)}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-2xl font-bold text-sm shadow flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                  >
                    <Volume2 className="w-4 h-4" /> 慢速音节拼读 (Slow)
                  </button>
                </div>
              </div>

              {/* Example Sentence Box */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-4">
                <div className="text-xs font-bold text-slate-400 mb-1">例句 (Example Sentence)</div>
                <div className="text-base font-extrabold text-slate-800 mb-1">
                  "{selectedWord.sentence}"
                </div>
                <div className="text-xs text-slate-500">
                  {selectedWord.sentenceTrans}
                </div>
                <button
                  onClick={() => speakEnglish(selectedWord.sentence)}
                  className="mt-2 text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" /> 听句子发音
                </button>
              </div>

              {/* Phonics & Rhyme note */}
              {selectedWord.phonicsTip && (
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs md:text-sm text-amber-950">
                  <div className="font-bold mb-1">🧩 自然拼读小秘密 (Phonics Secret):</div>
                  {selectedWord.phonicsTip}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: CAKE & LAKE RHYME PARTY */}
      {activeMode === 'rhyme' && (
        <div className="bg-gradient-to-br from-amber-50 via-sky-50 to-pink-50 rounded-3xl p-6 md:p-8 border-4 border-sky-300 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-4xl animate-bounce inline-block mb-2">🎶</span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-800">
              Cake & Lake 自然拼读押韵大发现！
            </h3>
            <p className="text-slate-600 text-sm md:text-base mt-1">
              你看！<strong>c-ake (蛋糕)</strong> 和 <strong>l-ake (湖泊)</strong> 的尾巴发音完全一样，它们是绝妙的押韵好伙伴 (Rhyming Words)！
            </p>
          </div>

          {/* Phonics Word Breakdown comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            {/* Word 1: Cake */}
            <div className="bg-white rounded-3xl p-6 border-4 border-rose-400 shadow-xl text-center flex flex-col items-center">
              <span className="text-5xl mb-2">🎂</span>
              <div className="flex items-center justify-center gap-1 font-mono text-3xl font-black mb-1">
                <span className="text-slate-700 bg-slate-100 px-2 py-1 rounded-xl">c</span>
                <span className="text-rose-600 bg-rose-100 px-3 py-1 rounded-xl">ake</span>
              </div>
              <div className="text-xs text-slate-400 font-mono mb-3">/k/ + /eɪk/ = /keɪk/</div>
              <div className="font-bold text-slate-700 text-sm mb-4">cake (蛋糕)</div>
              <button
                onClick={() => speakEnglish('c, ake, cake!')}
                className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-xs shadow flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" /> 听发音拆解 (c - ake)
              </button>
            </div>

            {/* Word 2: Lake */}
            <div className="bg-white rounded-3xl p-6 border-4 border-sky-400 shadow-xl text-center flex flex-col items-center">
              <span className="text-5xl mb-2">🌊</span>
              <div className="flex items-center justify-center gap-1 font-mono text-3xl font-black mb-1">
                <span className="text-slate-700 bg-slate-100 px-2 py-1 rounded-xl">l</span>
                <span className="text-sky-600 bg-sky-100 px-3 py-1 rounded-xl">ake</span>
              </div>
              <div className="text-xs text-slate-400 font-mono mb-3">/l/ + /eɪk/ = /leɪk/</div>
              <div className="font-bold text-slate-700 text-sm mb-4">lake (湖泊)</div>
              <button
                onClick={() => speakEnglish('l, ake, lake!')}
                className="w-full py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold text-xs shadow flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" /> 听发音拆解 (l - ake)
              </button>
            </div>
          </div>

          {/* Rhyme Rhythm Chant Player */}
          <div className="bg-white rounded-2xl p-5 border-2 border-slate-200 max-w-2xl mx-auto text-center shadow-md">
            <h4 className="font-black text-slate-800 text-sm mb-2">
              🎵 押韵小童谣 (Rhyme Chant)
            </h4>
            <div className="font-mono text-xs md:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl mb-3 leading-relaxed">
              "We eat the <span className="text-rose-600 font-bold">cake</span> by the sunny <span className="text-sky-600 font-bold">lake</span>!" 🍰🌊
            </div>
            <button
              onClick={() => speakEnglish('We eat the cake by the sunny lake!')}
              className="px-6 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-xl font-bold text-xs shadow hover:scale-105 transition-transform inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" /> 点击跟读押韵童谣
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
