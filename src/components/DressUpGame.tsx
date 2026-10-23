import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CharacterOutfit } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { soundManager, speakEnglish } from '../utils/audio';
import { Sparkles, Volume2, CheckCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';

interface DressUpGameProps {
  outfit: CharacterOutfit;
  setOutfit: React.Dispatch<React.SetStateAction<CharacterOutfit>>;
  onComplete: () => void;
  onAddScore: (points: number, reason: string) => void;
}

export const DressUpGame: React.FC<DressUpGameProps> = ({
  outfit,
  setOutfit,
  onComplete,
  onAddScore,
}) => {
  const [activeTab, setActiveTab] = useState<'hair' | 'facial' | 'clothes' | 'eyes'>('hair');
  const [hasRewarded, setHasRewarded] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const isBlondeEquipped = outfit.hair === 'blonde';
  const isMoustacheEquipped = outfit.facialHair === 'moustache';
  const isTargetCompleted = isBlondeEquipped && isMoustacheEquipped;

  const triggerTargetCheck = (newHair: string, newFacial: string) => {
    if (newHair === 'blonde' && newFacial === 'moustache' && !hasRewarded) {
      setHasRewarded(true);
      setShowCelebration(true);
      soundManager.playFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      speakEnglish('Wonderful! Blonde hair and a funny moustache! You are ready to get the cake!');
      onAddScore(150, 'Completed Blonde Hair & Moustache Puzzle');
    }
  };

  const handleSelectHair = (hair: CharacterOutfit['hair']) => {
    soundManager.playSnap();
    const updated = { ...outfit, hair };
    setOutfit(updated);

    if (hair === 'blonde') {
      speakEnglish('Blonde hair!');
    } else {
      speakEnglish(`${hair} hair`);
    }

    triggerTargetCheck(hair, outfit.facialHair);
  };

  const handleSelectFacialHair = (facialHair: CharacterOutfit['facialHair']) => {
    soundManager.playSnap();
    const updated = { ...outfit, facialHair };
    setOutfit(updated);

    if (facialHair === 'moustache') {
      speakEnglish('Moustache!');
    } else if (facialHair === 'none') {
      soundManager.playPop();
    } else {
      speakEnglish(facialHair);
    }

    triggerTargetCheck(outfit.hair, facialHair);
  };

  const handleResetOutfit = () => {
    soundManager.playPop();
    setOutfit({
      hair: 'none',
      facialHair: 'none',
      eyes: 'happy',
      clothes: 'uniform',
      accessory: 'none',
      skinTone: '#fed7aa',
    });
    setHasRewarded(false);
    setShowCelebration(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-amber-100 via-rose-100 to-amber-50 rounded-3xl p-6 border-4 border-amber-300 shadow-xl mb-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-amber-950 font-bold text-xs uppercase tracking-wider rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Stage 1: Body Puzzle 装扮拼图
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
              打扮身体拼图：帮小伙伴换上 <span className="text-amber-600 underline decoration-wavy">blonde hair</span> 与 <span className="text-amber-800 underline decoration-wavy">moustache</span>！
            </h2>
            <p className="text-slate-600 mt-1 text-sm md:text-base">
              仔细听发音，将发型换为<strong>金色头发 (blonde hair)</strong>，并贴上俏皮的<strong>八字胡 (moustache)</strong>！
            </p>
          </div>

          {/* Target checklist progress pills */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
            <button
              onClick={() => speakEnglish('Blonde hair')}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border-2 transition-all cursor-pointer ${
                isBlondeEquipped
                  ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-md font-bold'
                  : 'bg-white/80 text-slate-600 border-dashed border-amber-300 hover:bg-amber-50'
              }`}
            >
              {isBlondeEquipped ? <CheckCircle className="w-5 h-5 text-emerald-700" /> : <div className="w-5 h-5 rounded-full border-2 border-amber-400" />}
              <span>blonde hair (金发)</span>
              <Volume2 className="w-4 h-4 text-amber-700 hover:scale-125 transition-transform" />
            </button>

            <button
              onClick={() => speakEnglish('Moustache')}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border-2 transition-all cursor-pointer ${
                isMoustacheEquipped
                  ? 'bg-amber-800 text-amber-50 border-amber-950 shadow-md font-bold'
                  : 'bg-white/80 text-slate-600 border-dashed border-amber-300 hover:bg-amber-50'
              }`}
            >
              {isMoustacheEquipped ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <div className="w-5 h-5 rounded-full border-2 border-amber-700" />}
              <span>moustache (八字胡)</span>
              <Volume2 className="w-4 h-4 text-amber-300 hover:scale-125 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Character Stage Podium (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-4 border-slate-200 shadow-xl flex flex-col items-center relative min-h-[460px] justify-between">
          {/* Stage Podium Lighting Background */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-sky-100/70 to-transparent rounded-t-3xl -z-0 pointer-events-none" />

          {/* Quick Word Voice Button Banner */}
          <div className="w-full flex items-center justify-between z-10 mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Ready for the Party!
            </span>
            <button
              onClick={handleResetOutfit}
              className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors cursor-pointer"
              title="重置装扮"
            >
              <RotateCcw className="w-3.5 h-3.5" /> 重置
            </button>
          </div>

          {/* Character Illustration SVG */}
          <div className="z-10 my-auto py-2">
            <CharacterAvatar outfit={outfit} size="xl" />
          </div>

          {/* Floor Pedestal */}
          <div className="w-48 h-6 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 rounded-full shadow-inner border border-amber-400 -mt-2 mb-3" />

          {/* Status feedback banner */}
          <div className="w-full z-10">
            {isTargetCompleted ? (
              <div className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-3 text-center animate-bounce">
                <div className="flex items-center justify-center gap-2 text-emerald-800 font-extrabold text-base">
                  <Award className="w-5 h-5 text-emerald-600" />
                  太棒啦！Blonde hair 与 Moustache 拼图完成！
                </div>
                <p className="text-xs text-emerald-700 mt-0.5">
                  获得了 +150 分！小伙伴已经准备好去拿 cake 并走直行去学校了！
                </p>
              </div>
            ) : (
              <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl p-3 text-center">
                <p className="text-xs md:text-sm text-amber-800 font-semibold">
                  💡 提示：在右侧拼图块中点击 <strong>blonde hair</strong> 和 <strong>moustache</strong> 帮他变身吧！
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Wardrobe & Puzzle Options (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-4 border-slate-200 shadow-xl flex flex-col">
          {/* Puzzle category tabs */}
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100 overflow-x-auto">
            <button
              onClick={() => {
                soundManager.playPop();
                setActiveTab('hair');
              }}
              className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'hair'
                  ? 'bg-amber-400 text-amber-950 shadow-md scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              👱 发型 (Hair)
              {isBlondeEquipped && <CheckCircle className="w-4 h-4 text-emerald-700" />}
            </button>

            <button
              onClick={() => {
                soundManager.playPop();
                setActiveTab('facial');
              }}
              className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'facial'
                  ? 'bg-amber-800 text-white shadow-md scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              🥸 胡子 (Facial Hair)
              {isMoustacheEquipped && <CheckCircle className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={() => {
                soundManager.playPop();
                setActiveTab('clothes');
              }}
              className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'clothes'
                  ? 'bg-sky-500 text-white shadow-md scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              👔 衣服 (Clothes)
            </button>

            <button
              onClick={() => {
                soundManager.playPop();
                setActiveTab('eyes');
              }}
              className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'eyes'
                  ? 'bg-rose-500 text-white shadow-md scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              👀 表情 (Eyes)
            </button>
          </div>

          {/* TAB 1: HAIR PIECES */}
          {activeTab === 'hair' && (
            <div className="py-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-700">
                  选择发型 (Choose Hair) — 找找金发 blonde hair 在哪里？
                </span>
                <button
                  onClick={() => speakEnglish('Find the blonde hair!')}
                  className="text-xs text-amber-700 flex items-center gap-1 font-semibold hover:underline cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" /> 听要求
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* TARGET ITEM: BLONDE HAIR */}
                <button
                  onClick={() => handleSelectHair('blonde')}
                  className={`relative p-4 rounded-2xl border-4 text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                    outfit.hair === 'blonde'
                      ? 'border-amber-400 bg-amber-50 shadow-xl scale-105 ring-4 ring-amber-200'
                      : 'border-amber-300 bg-amber-50/50 hover:bg-amber-100 hover:scale-102'
                  }`}
                >
                  {/* Target Badge */}
                  <span className="absolute -top-3 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                    ⭐ TARGET
                  </span>
                  <div className="w-14 h-14 rounded-full bg-amber-300 border-2 border-amber-400 flex items-center justify-center text-2xl shadow-inner">
                    👱
                  </div>
                  <div>
                    <div className="font-extrabold text-amber-900 text-base">blonde hair</div>
                    <div className="text-xs text-amber-700 font-semibold">金黄色头发</div>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full font-mono">
                    /blɒnd heə/
                  </div>
                </button>

                {/* Brown hair */}
                <button
                  onClick={() => handleSelectHair('brown')}
                  className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                    outfit.hair === 'brown'
                      ? 'border-amber-800 bg-amber-50 shadow-md ring-2 ring-amber-400'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-amber-800 border-2 border-amber-900 flex items-center justify-center text-2xl shadow-inner">
                    👨
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">brown hair</div>
                    <div className="text-xs text-slate-500">棕色头发</div>
                  </div>
                </button>

                {/* Red hair */}
                <button
                  onClick={() => handleSelectHair('red')}
                  className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                    outfit.hair === 'red'
                      ? 'border-rose-500 bg-rose-50 shadow-md ring-2 ring-rose-300'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-rose-600 border-2 border-rose-700 flex items-center justify-center text-2xl shadow-inner">
                    👩‍🦰
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">red hair</div>
                    <div className="text-xs text-slate-500">红色头发</div>
                  </div>
                </button>

                {/* Blue spiky hair */}
                <button
                  onClick={() => handleSelectHair('blue')}
                  className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                    outfit.hair === 'blue'
                      ? 'border-sky-500 bg-sky-50 shadow-md ring-2 ring-sky-300'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-sky-500 border-2 border-sky-600 flex items-center justify-center text-2xl shadow-inner">
                    🧒
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">blue hair</div>
                    <div className="text-xs text-slate-500">酷炫蓝发</div>
                  </div>
                </button>
              </div>

              {/* Phonics & Sentence Tip Box */}
              <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div className="text-xs md:text-sm text-amber-950">
                  <div className="font-bold mb-1">【教师小贴士 / Teacher Note】</div>
                  <strong>blonde</strong> 可以拼作 blonde 或 blond。带读时示范：<span className="font-mono text-amber-900 bg-amber-100 px-1 py-0.5 rounded">"She has blonde hair."</span> 引导孩子们摸摸头发感受单词！
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FACIAL HAIR PIECES */}
          {activeTab === 'facial' && (
            <div className="py-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-700">
                  选择胡子 (Choose Facial Hair) — 找找八字胡 moustache 吧！
                </span>
                <button
                  onClick={() => speakEnglish('Put on the moustache!')}
                  className="text-xs text-amber-800 flex items-center gap-1 font-semibold hover:underline cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" /> 听要求
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* TARGET ITEM: MOUSTACHE */}
                <button
                  onClick={() => handleSelectFacialHair('moustache')}
                  className={`relative p-4 rounded-2xl border-4 text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                    outfit.facialHair === 'moustache'
                      ? 'border-amber-800 bg-amber-100 shadow-xl scale-105 ring-4 ring-amber-300'
                      : 'border-amber-600 bg-amber-50/60 hover:bg-amber-100 hover:scale-102'
                  }`}
                >
                  <span className="absolute -top-3 bg-gradient-to-r from-amber-700 to-amber-900 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                    ⭐ TARGET
                  </span>
                  <div className="w-14 h-14 rounded-full bg-amber-900 border-2 border-amber-950 flex items-center justify-center text-3xl shadow-inner text-white">
                    🥸
                  </div>
                  <div>
                    <div className="font-extrabold text-amber-950 text-base">moustache</div>
                    <div className="text-xs text-amber-800 font-semibold">八字小胡子</div>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full font-mono">
                    /mʊˈstɑːʃ/
                  </div>
                </button>

                {/* Beard */}
                <button
                  onClick={() => handleSelectFacialHair('beard')}
                  className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                    outfit.facialHair === 'beard'
                      ? 'border-amber-900 bg-amber-50 shadow-md ring-2 ring-amber-400'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-stone-700 border-2 border-stone-800 flex items-center justify-center text-2xl shadow-inner text-white">
                    🧔
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">beard</div>
                    <div className="text-xs text-slate-500">大络腮胡</div>
                  </div>
                </button>

                {/* Goatee */}
                <button
                  onClick={() => handleSelectFacialHair('goatee')}
                  className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                    outfit.facialHair === 'goatee'
                      ? 'border-amber-900 bg-amber-50 shadow-md ring-2 ring-amber-400'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-stone-500 border-2 border-stone-600 flex items-center justify-center text-2xl shadow-inner text-white">
                    🧔‍♂️
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">goatee</div>
                    <div className="text-xs text-slate-500">山羊胡</div>
                  </div>
                </button>

                {/* None */}
                <button
                  onClick={() => handleSelectFacialHair('none')}
                  className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                    outfit.facialHair === 'none'
                      ? 'border-sky-500 bg-sky-50 shadow-md ring-2 ring-sky-300'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-slate-200 border-2 border-slate-300 flex items-center justify-center text-2xl shadow-inner">
                    👶
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">no moustache</div>
                    <div className="text-xs text-slate-500">没有胡子</div>
                  </div>
                </button>
              </div>

              {/* Phonics & Sentence Tip Box */}
              <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div className="text-xs md:text-sm text-amber-950">
                  <div className="font-bold mb-1">【趣味记忆法 / Fun Mnemonic】</div>
                  moustache 专指嘴唇上方的八字胡！让学生们用小食指横在鼻子下方模仿八字胡，齐声喊出：<span className="font-mono text-amber-900 bg-amber-100 px-1 py-0.5 rounded">"I have a funny moustache!"</span>，课堂气氛瞬间拉满！
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLOTHES */}
          {activeTab === 'clothes' && (
            <div className="py-5">
              <span className="text-sm font-bold text-slate-700 block mb-3">
                挑选校园服装 (Choose Outfit)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'uniform', title: 'School Uniform', cn: '校服西装', icon: '🏫' },
                  { id: 'chef', title: "Baker Chef", cn: '蛋糕烘焙师', icon: '🧑‍🍳' },
                  { id: 'cape', title: 'Super Hero', cn: '超级英雄披风', icon: '🦸' },
                  { id: 'striped', title: 'Striped Shirt', cn: '活力条纹衫', icon: '👕' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundManager.playSnap();
                      setOutfit({ ...outfit, clothes: item.id as CharacterOutfit['clothes'] });
                      speakEnglish(item.title);
                    }}
                    className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                      outfit.clothes === item.id
                        ? 'border-sky-500 bg-sky-50 shadow-md ring-2 ring-sky-300'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-xs md:text-sm">{item.title}</div>
                      <div className="text-[11px] text-slate-500">{item.cn}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EYES */}
          {activeTab === 'eyes' && (
            <div className="py-5">
              <span className="text-sm font-bold text-slate-700 block mb-3">
                选择神情面部 (Choose Expression)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'happy', title: 'Happy Smile', cn: '开心欢喜', icon: '😊' },
                  { id: 'wink', title: 'Wink Wink', cn: '单眼俏皮', icon: '😉' },
                  { id: 'stars', title: 'Starry Eyes', cn: '闪闪星星眼', icon: '🤩' },
                  { id: 'glasses', title: 'Smart Glasses', cn: '学术小眼镜', icon: '🤓' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundManager.playSnap();
                      setOutfit({ ...outfit, eyes: item.id as CharacterOutfit['eyes'] });
                      speakEnglish(item.title);
                    }}
                    className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                      outfit.eyes === item.id
                        ? 'border-rose-500 bg-rose-50 shadow-md ring-2 ring-rose-300'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-xs md:text-sm">{item.title}</div>
                      <div className="text-[11px] text-slate-500">{item.cn}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              {isTargetCompleted ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> 达成目标：已装备 blonde hair 与 moustache！
                </span>
              ) : (
                <span>还需要装扮：{!isBlondeEquipped ? 'blonde hair ' : ''}{!isMoustacheEquipped ? 'moustache' : ''}</span>
              )}
            </div>

            <button
              onClick={() => {
                soundManager.playMagic();
                onComplete();
              }}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isTargetCompleted
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:scale-105 hover:shadow-xl animate-pulse-subtle'
                  : 'bg-slate-800 text-white hover:bg-slate-900'
              }`}
            >
              <span>{isTargetCompleted ? '去拿 Cake 开启直行大冒险！' : '带着装扮继续前进'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
