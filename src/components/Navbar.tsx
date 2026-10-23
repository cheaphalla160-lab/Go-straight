import React from 'react';
import { GameStage } from '../types';
import { soundManager } from '../utils/audio';
import { Music, Volume2, VolumeX, Trophy, Sparkles, Compass, BookOpen, GraduationCap } from 'lucide-react';

interface NavbarProps {
  currentStage: GameStage;
  onChangeStage: (stage: GameStage) => void;
  score: number;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenLeaderboard: () => void;
  onOpenTeacherGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStage,
  onChangeStage,
  score,
  isBgmPlaying,
  onToggleBgm,
  isMuted,
  onToggleMute,
  onOpenLeaderboard,
  onOpenTeacherGuide,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-amber-200 shadow-sm px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div
            onClick={() => onChangeStage('dressup')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-400 via-amber-300 to-yellow-300 flex items-center justify-center text-xl shadow-md group-hover:rotate-6 transition-transform">
              🍰
            </div>
            <div>
              <h1 className="font-black text-slate-800 text-lg md:text-xl leading-none flex items-center gap-1.5">
                Sweet Cake Adventure
              </h1>
              <span className="text-[11px] font-bold text-amber-700">
                小学英语互动乐园 • 趣味拼读与冒险
              </span>
            </div>
          </div>

          {/* Mobile Right Controls: Score & Music */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-black text-xs flex items-center gap-1">
              ⭐ {score}
            </div>
            <button
              onClick={onToggleBgm}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isBgmPlaying ? 'bg-amber-400 text-amber-950 shadow' : 'bg-slate-100 text-slate-500'
              }`}
            >
              <Music className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stage Navigation Tabs */}
        <nav className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl overflow-x-auto max-w-full">
          <button
            onClick={() => {
              soundManager.playPop();
              onChangeStage('dressup');
            }}
            className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs md:text-sm flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              currentStage === 'dressup'
                ? 'bg-white text-slate-800 shadow-sm scale-102'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>1. 装扮拼图</span>
          </button>

          <button
            onClick={() => {
              soundManager.playPop();
              onChangeStage('adventure');
            }}
            className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs md:text-sm flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              currentStage === 'adventure'
                ? 'bg-white text-slate-800 shadow-sm scale-102'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-sky-500" />
            <span>2. 直行大冒险</span>
          </button>

          <button
            onClick={() => {
              soundManager.playPop();
              onChangeStage('wordarena');
            }}
            className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs md:text-sm flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
              currentStage === 'wordarena'
                ? 'bg-white text-slate-800 shadow-sm scale-102'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-500" />
            <span>3. 单词试炼</span>
          </button>
        </nav>

        {/* Right Action Tools: Score, BGM, Leaderboard, Teacher Guide */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Current Score Counter */}
          <div className="px-3.5 py-1.5 bg-gradient-to-r from-amber-200 to-yellow-300 text-amber-950 rounded-2xl font-black text-sm flex items-center gap-1.5 shadow-sm">
            <span className="text-base">⭐</span>
            <span>{score} 分</span>
          </div>

          {/* BGM Toggle Button */}
          <button
            onClick={onToggleBgm}
            title={isBgmPlaying ? '暂停欢快背景音乐' : '播放欢快背景音乐'}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isBgmPlaying
                ? 'bg-amber-400 text-amber-950 shadow-sm hover:bg-amber-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isBgmPlaying ? 'animate-bounce' : ''}`} />
            <span>{isBgmPlaying ? '音乐开' : '音乐关'}</span>
          </button>

          {/* Mute SFX Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? '取消静音' : '静音音效'}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Leaderboard Button */}
          <button
            onClick={() => {
              soundManager.playPop();
              onOpenLeaderboard();
            }}
            className="px-3.5 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-xl font-bold text-xs shadow transition-transform hover:scale-105 flex items-center gap-1 cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>排行榜</span>
          </button>

          {/* Teacher's Preparation Kit */}
          <button
            onClick={() => {
              soundManager.playPop();
              onOpenTeacherGuide();
            }}
            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>备课助手</span>
          </button>
        </div>
      </div>
    </header>
  );
};
