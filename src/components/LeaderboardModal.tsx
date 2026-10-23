import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LeaderboardEntry } from '../types';
import { getLeaderboard, saveLeaderboardEntry, resetLeaderboard } from '../utils/storage';
import { soundManager, speakEnglish } from '../utils/audio';
import { Trophy, Star, Medal, X, PlusCircle, RotateCcw, Sparkles } from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScore: number;
}

const AVATAR_CHOICES = ['🌟', '🦁', '🐰', '🚀', '🐼', '🦄', '🎂', '🦸', '👧', '👦'];

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  currentScore,
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [studentName, setStudentName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🌟');
  const [hasSavedCurrentScore, setHasSavedCurrentScore] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEntries(getLeaderboard());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    soundManager.playFanfare();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.5 }
    });

    const starsCount = Math.min(5, Math.max(1, Math.floor(currentScore / 100)));
    const badges = ['Adventure Explorer'];
    if (currentScore >= 200) badges.push('Blonde & Moustache');
    if (currentScore >= 400) badges.push('Cake Master');
    if (currentScore >= 500) badges.push('Phonics Super Star');

    const updated = saveLeaderboardEntry({
      name: studentName.trim(),
      score: currentScore,
      stars: starsCount,
      avatar: selectedAvatar,
      badges
    });

    setEntries(updated);
    setHasSavedCurrentScore(true);
    speakEnglish(`Congratulations ${studentName}! Your score is on the leaderboard!`);
  };

  const handleReset = () => {
    if (window.confirm('确定要重置班级积分榜吗？将恢复默认示例数据。')) {
      soundManager.playPop();
      const fresh = resetLeaderboard();
      setEntries(fresh);
      setHasSavedCurrentScore(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl border-4 border-amber-300 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 p-6 flex items-center justify-between border-b-2 border-amber-300 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl">
              🏆
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-amber-950 flex items-center gap-2">
                小星星分数排行榜 (Leaderboard)
              </h3>
              <p className="text-xs text-amber-900 font-semibold">
                比比看哪一组、哪位小朋友掌握的单词最多！
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow transition-transform hover:scale-110 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Submit Current Score Form */}
          {!hasSavedCurrentScore ? (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border-2 border-amber-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-amber-900 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  你当前的冒险得分：<strong className="text-lg text-rose-600">{currentScore} 分</strong>
                </span>
                <span className="text-xs text-amber-700">写上你的名字登上光荣榜吧！</span>
              </div>

              <form onSubmit={handleSaveScore} className="flex flex-col sm:flex-row gap-3">
                {/* Avatar Picker */}
                <div className="flex items-center gap-1 overflow-x-auto py-1">
                  {AVATAR_CHOICES.slice(0, 5).map((av) => (
                    <button
                      type="button"
                      key={av}
                      onClick={() => {
                        soundManager.playPop();
                        setSelectedAvatar(av);
                      }}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-transform cursor-pointer ${
                        selectedAvatar === av
                          ? 'bg-amber-400 scale-110 shadow-md ring-2 ring-amber-600'
                          : 'bg-white hover:bg-slate-100'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="输入学生姓名或小组名 (例: Group 1, Amy)"
                  maxLength={16}
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-amber-300 focus:outline-none focus:border-amber-500 font-bold text-sm bg-white"
                />

                <button
                  type="submit"
                  disabled={!studentName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-black text-sm shadow hover:scale-105 transition-transform disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>登记上榜</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-3 text-center text-xs font-extrabold text-emerald-800 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              已成功将你的成绩录入排行榜！继续探索挑战吧！
            </div>
          )}

          {/* Leaderboard Table List */}
          <div className="space-y-2.5">
            {entries.map((item, index) => {
              const rank = index + 1;
              let rankBadge = <span className="font-mono font-bold text-slate-500 text-sm">#{rank}</span>;

              if (rank === 1) {
                rankBadge = (
                  <div className="w-7 h-7 rounded-full bg-amber-400 text-white font-black flex items-center justify-center text-xs shadow-md">
                    🥇
                  </div>
                );
              } else if (rank === 2) {
                rankBadge = (
                  <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-700 font-black flex items-center justify-center text-xs shadow-md">
                    🥈
                  </div>
                );
              } else if (rank === 3) {
                rankBadge = (
                  <div className="w-7 h-7 rounded-full bg-amber-600 text-white font-black flex items-center justify-center text-xs shadow-md">
                    🥉
                  </div>
                );
              }

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                    rank <= 3
                      ? 'bg-gradient-to-r from-amber-50/60 to-white border-amber-200 shadow-sm'
                      : 'bg-white border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 flex items-center justify-center">
                      {rankBadge}
                    </div>

                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-xl shadow-inner">
                      {item.avatar}
                    </div>

                    <div>
                      <div className="font-extrabold text-slate-800 text-sm md:text-base flex items-center gap-2">
                        {item.name}
                        {item.badges && item.badges.length > 0 && (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                            {item.badges[0]}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                        <span>{item.date}</span>
                        <span>•</span>
                        <span className="flex text-amber-400">
                          {Array.from({ length: item.stars }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-black text-rose-600 text-lg md:text-xl">
                      {item.score} <span className="text-xs font-bold text-slate-400">pts</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer with Teacher Reset */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-rose-500 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> 教师重置排行榜
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
          >
            关闭返回
          </button>
        </div>
      </div>
    </div>
  );
};
