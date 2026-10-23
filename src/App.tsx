/**
 * Sweet Cake Adventure - 趣味英语大冒险
 * Primary School Vocabulary & Interactive Dress-Up & Adventure Game
 */

import React, { useState, useEffect } from 'react';
import { GameStage, CharacterOutfit } from './types';
import { soundManager, speakEnglish } from './utils/audio';
import { Navbar } from './components/Navbar';
import { DressUpGame } from './components/DressUpGame';
import { AdventureMap } from './components/AdventureMap';
import { WordArena } from './components/WordArena';
import { LeaderboardModal } from './components/LeaderboardModal';
import { TeacherHelperModal } from './components/TeacherHelperModal';
import { PrintableCardsModal } from './components/PrintableCardsModal';
import { Sparkles, Trophy, GraduationCap, Volume2, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentStage, setCurrentStage] = useState<GameStage>('dressup');
  const [score, setScore] = useState<number>(0);
  const [scoreToast, setScoreToast] = useState<{ points: number; reason: string } | null>(null);

  // Character Dress-Up state
  const [outfit, setOutfit] = useState<CharacterOutfit>({
    hair: 'none',
    facialHair: 'none',
    eyes: 'happy',
    clothes: 'uniform',
    accessory: 'none',
    skinTone: '#fed7aa',
  });

  // Audio state
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Modals state
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState<boolean>(false);
  const [isPrintCardsOpen, setIsPrintCardsOpen] = useState<boolean>(false);

  // Handle Score Addition with Toast
  const handleAddScore = (points: number, reason: string) => {
    setScore(prev => prev + points);
    setScoreToast({ points, reason });
    setTimeout(() => {
      setScoreToast(null);
    }, 2800);
  };

  // Toggle BGM
  const handleToggleBgm = () => {
    const newState = soundManager.toggleBGM();
    setIsBgmPlaying(newState);
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  // Autoplay notice / Start interaction helper
  useEffect(() => {
    // Warm up speech synthesis voices
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-slate-800">
      {/* Top Navigation */}
      <Navbar
        currentStage={currentStage}
        onChangeStage={(stage) => setCurrentStage(stage)}
        score={score}
        isBgmPlaying={isBgmPlaying}
        onToggleBgm={handleToggleBgm}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
      />

      {/* Floating Score Reward Toast */}
      {scoreToast && (
        <div className="fixed top-20 right-6 z-50 bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 font-black px-4 py-2.5 rounded-2xl shadow-xl border-2 border-amber-300 flex items-center gap-2 animate-bounce">
          <span className="text-xl">⭐</span>
          <div>
            <div className="text-sm">+{scoreToast.points} 分！</div>
            <div className="text-[11px] font-semibold text-amber-900">{scoreToast.reason}</div>
          </div>
        </div>
      )}

      {/* BGM Quick Prompt Banner if not playing */}
      {!isBgmPlaying && (
        <div className="bg-gradient-to-r from-amber-100 via-rose-100 to-amber-100 px-4 py-2 text-center text-xs font-bold text-amber-900 flex items-center justify-center gap-2 border-b border-amber-200">
          <span>🎵 点击开启轻松愉快的课堂背景音乐：</span>
          <button
            onClick={handleToggleBgm}
            className="px-3 py-1 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-lg shadow-sm cursor-pointer transition-transform hover:scale-105"
          >
            开启音乐 🎶
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        {currentStage === 'dressup' && (
          <DressUpGame
            outfit={outfit}
            setOutfit={setOutfit}
            onComplete={() => setCurrentStage('adventure')}
            onAddScore={handleAddScore}
          />
        )}

        {currentStage === 'adventure' && (
          <AdventureMap
            outfit={outfit}
            onAddScore={handleAddScore}
            onCompleteMap={() => {
              // Option to stay or move to quiz
            }}
            onOpenArena={() => setCurrentStage('wordarena')}
          />
        )}

        {currentStage === 'wordarena' && (
          <WordArena
            onAddScore={handleAddScore}
            onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          />
        )}
      </main>

      {/* Classroom Teacher Sticky Bottom Bar */}
      <footer className="bg-white border-t-2 border-slate-200 py-4 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>核心单词：</span>
            <span className="font-extrabold text-slate-700">cake, field, lake, blonde hair, moustache, go straight, school</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTeacherGuideOpen(true)}
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" /> 备课教学方案
            </button>
            <span>•</span>
            <button
              onClick={() => setIsLeaderboardOpen(true)}
              className="text-amber-600 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Trophy className="w-4 h-4" /> 星星积分榜
            </button>
            <span>•</span>
            <button
              onClick={() => {
                soundManager.playPop();
                speakEnglish('cake, field, lake, blonde hair, moustache, go straight to the school');
              }}
              className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" /> 听全词朗读
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        currentScore={score}
      />

      <TeacherHelperModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
        onOpenPrintCards={() => {
          setIsTeacherGuideOpen(false);
          setIsPrintCardsOpen(true);
        }}
      />

      <PrintableCardsModal
        isOpen={isPrintCardsOpen}
        onClose={() => setIsPrintCardsOpen(false)}
      />
    </div>
  );
}
