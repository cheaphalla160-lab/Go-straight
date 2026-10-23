import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CharacterOutfit } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import { soundManager, speakEnglish } from '../utils/audio';
import { Volume2, Sparkles, Navigation, ArrowUp, CheckCircle, Award, Compass, School, Cake, MapPin } from 'lucide-react';

interface AdventureMapProps {
  outfit: CharacterOutfit;
  onAddScore: (points: number, reason: string) => void;
  onCompleteMap: () => void;
  onOpenArena: () => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  outfit,
  onAddScore,
  onCompleteMap,
  onOpenArena,
}) => {
  // Adventure progress:
  // 0 = at Bakery, needs to pick up cake
  // 1 = cake picked up, ready to choose direction (go straight)
  // 2 = walking straight, exploring the field (left) & lake (right)
  // 3 = approaching school, final straight sprint
  // 4 = arrived at school! Celebration
  const [step, setStep] = useState<number>(0);
  const [hasCake, setHasCake] = useState<boolean>(false);
  const [visitedField, setVisitedField] = useState<boolean>(false);
  const [visitedLake, setVisitedLake] = useState<boolean>(false);
  const [wrongDirectionTried, setWrongDirectionTried] = useState<boolean>(false);

  // Character position percentage along the path (0 to 100)
  const [characterPos, setCharacterPos] = useState<number>(5);

  const handlePickCake = () => {
    if (hasCake) return;
    setHasCake(true);
    soundManager.playMagic();
    speakEnglish('Delicious cake! C-A-K-E, cake! I take the cake!');
    onAddScore(100, 'Picked up the Cake');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7, x: 0.2 }
    });
    setStep(1);
    setCharacterPos(18);
  };

  const handleGoStraight = () => {
    soundManager.playDing();
    setWrongDirectionTried(false);

    if (step === 1) {
      speakEnglish('Go straight! Keep walking straight ahead!');
      setStep(2);
      setCharacterPos(45);
      onAddScore(50, 'Followed direction: Go Straight');
    } else if (step === 2) {
      speakEnglish('Go straight to the school!');
      setStep(3);
      setCharacterPos(78);
      onAddScore(50, 'Go straight towards School');
    } else if (step === 3) {
      // Arrived at school!
      soundManager.playFanfare();
      setStep(4);
      setCharacterPos(92);
      speakEnglish('Hooray! We arrived at the school with the cake! Wonderful job!');
      onAddScore(200, 'Arrived at the School safely!');
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5, x: 0.85 }
      });
      onCompleteMap();
    }
  };

  const handleWrongTurn = (direction: string) => {
    soundManager.playPop();
    setWrongDirectionTried(true);
    speakEnglish(`No, do not turn ${direction}! You must go straight to the school!`);
  };

  const handleExploreField = () => {
    soundManager.playDing();
    setVisitedField(true);
    speakEnglish('Look at the green field! F-I-E-L-D, field! The field is full of flowers.');
    onAddScore(40, 'Explored the Green Field');
  };

  const handleExploreLake = () => {
    soundManager.playDing();
    setVisitedLake(true);
    speakEnglish('The blue lake! L-A-K-E, lake! Listen: Cake and Lake rhyme together!');
    onAddScore(40, 'Discovered the Rhyme: Cake & Lake');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Mission Guide Header */}
      <div className="bg-gradient-to-r from-sky-100 via-emerald-100 to-amber-100 rounded-3xl p-6 border-4 border-sky-300 shadow-xl mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-full mb-2">
              <Compass className="w-3.5 h-3.5" /> Stage 2: Sweet Adventure Map
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
              去拿 <span className="text-rose-600 underline decoration-wavy">cake</span>，走直行 <span className="text-purple-700 underline decoration-wavy">go straight to the school</span>！
            </h2>
            <p className="text-slate-600 mt-1 text-sm md:text-base">
              经过绿油油的 <strong>field (田野)</strong> 与碧蓝的 <strong>lake (湖泊)</strong>，将蛋糕安全护送到 <strong>school (学校)</strong>！
            </p>
          </div>

          {/* Quick Target Vocabulary Badges */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => speakEnglish('Cake')}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                hasCake ? 'bg-rose-500 text-white border-rose-600 shadow' : 'bg-white text-rose-700 border-rose-200'
              }`}
            >
              <span>🎂 cake (蛋糕)</span>
              <Volume2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => speakEnglish('Go straight to the school')}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                step >= 2 ? 'bg-purple-600 text-white border-purple-700 shadow' : 'bg-white text-purple-700 border-purple-200'
              }`}
            >
              <span>⬆️ go straight</span>
              <Volume2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => speakEnglish('Field')}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                visitedField ? 'bg-emerald-600 text-white border-emerald-700 shadow' : 'bg-white text-emerald-700 border-emerald-200'
              }`}
            >
              <span>🌾 field (田野)</span>
              <Volume2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => speakEnglish('Lake')}
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                visitedLake ? 'bg-sky-600 text-white border-sky-700 shadow' : 'bg-white text-sky-700 border-sky-200'
              }`}
            >
              <span>🌊 lake (湖泊)</span>
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* THE INTERACTIVE ADVENTURE CANVAS / MAP */}
      <div className="relative w-full rounded-3xl overflow-hidden border-4 border-slate-300 shadow-2xl bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 select-none">
        {/* Animated Sky Clouds */}
        <div className="absolute top-3 left-10 text-white opacity-80 text-4xl animate-float">☁️</div>
        <div className="absolute top-6 left-1/3 text-white opacity-80 text-5xl animate-float" style={{ animationDelay: '1.2s' }}>☁️</div>
        <div className="absolute top-2 right-1/4 text-white opacity-80 text-4xl animate-float" style={{ animationDelay: '2s' }}>☁️</div>
        {/* Smiling Sun */}
        <div className="absolute top-4 right-10 text-amber-400 text-5xl animate-pulse-subtle">☀️</div>

        {/* Scenic Landscape Illustration */}
        <div className="relative min-h-[440px] md:min-h-[500px] w-full flex flex-col justify-between p-4 md:p-8">
          {/* TOP AREA: THE GREEN FIELD (LEFT) & THE BLUE LAKE (RIGHT) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {/* LEFT REGION: THE GREEN FIELD (田野) */}
            <div
              onClick={handleExploreField}
              className={`relative rounded-3xl p-5 border-4 transition-all duration-300 cursor-pointer overflow-hidden group ${
                visitedField
                  ? 'bg-gradient-to-br from-emerald-100 to-lime-200 border-emerald-500 shadow-lg'
                  : 'bg-gradient-to-br from-emerald-50 to-lime-100 border-emerald-300 hover:border-emerald-500 hover:shadow-md'
              }`}
            >
              {/* Field Decoration SVG & Elements */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🌾</span>
                  <div>
                    <div className="font-extrabold text-emerald-900 text-lg flex items-center gap-1.5">
                      The Green Field
                      <Volume2 className="w-4 h-4 text-emerald-600 group-hover:scale-125 transition-transform" />
                    </div>
                    <div className="text-xs text-emerald-700 font-bold">绿油油的田野 / 田地 (field)</div>
                  </div>
                </div>
                {visitedField ? (
                  <span className="text-xs font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> 已探索
                  </span>
                ) : (
                  <span className="text-[11px] font-bold bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full animate-bounce">
                    点击探索 +40分
                  </span>
                )}
              </div>

              <p className="text-xs text-emerald-800 mb-3 leading-relaxed">
                "The green <strong>field</strong> is full of flowers and butterflies!" 🌼
              </p>

              {/* Little cute animated field creatures */}
              <div className="flex items-end justify-between pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl animate-bounce">🐑</span>
                  <span className="text-xl animate-float">🦋</span>
                  <span className="text-2xl">🌻</span>
                </div>
                <div className="text-xs font-mono font-bold text-emerald-700 bg-white/70 px-2 py-1 rounded-lg">
                  /fiːld/
                </div>
              </div>
            </div>

            {/* RIGHT REGION: THE BLUE LAKE (湖泊) */}
            <div
              onClick={handleExploreLake}
              className={`relative rounded-3xl p-5 border-4 transition-all duration-300 cursor-pointer overflow-hidden group ${
                visitedLake
                  ? 'bg-gradient-to-br from-sky-100 to-cyan-200 border-sky-500 shadow-lg'
                  : 'bg-gradient-to-br from-sky-50 to-cyan-100 border-sky-300 hover:border-sky-500 hover:shadow-md'
              }`}
            >
              {/* Lake Decoration & Elements */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🌊</span>
                  <div>
                    <div className="font-extrabold text-sky-900 text-lg flex items-center gap-1.5">
                      The Blue Lake
                      <Volume2 className="w-4 h-4 text-sky-600 group-hover:scale-125 transition-transform" />
                    </div>
                    <div className="text-xs text-sky-700 font-bold">波光粼粼的湖泊 (lake)</div>
                  </div>
                </div>
                {visitedLake ? (
                  <span className="text-xs font-bold bg-sky-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> 押韵掌握
                  </span>
                ) : (
                  <span className="text-[11px] font-bold bg-sky-200 text-sky-800 px-2 py-0.5 rounded-full animate-bounce">
                    点击发现押韵 +40分
                  </span>
                )}
              </div>

              <p className="text-xs text-sky-800 mb-3 leading-relaxed">
                "Ducks swim in the blue <strong>lake</strong>!" 🦆 <strong>Cake</strong> and <strong>Lake</strong> rhyme!
              </p>

              {/* Cute lake creatures */}
              <div className="flex items-end justify-between pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl animate-float">🦆</span>
                  <span className="text-xl">🪷</span>
                  <span className="text-2xl animate-bounce">⛵</span>
                </div>
                <div className="text-xs font-mono font-bold text-sky-700 bg-white/70 px-2 py-1 rounded-lg">
                  /leɪk/
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE: THE STRAIGHT PATHWAY (GO STRAIGHT TO THE SCHOOL) */}
          <div className="relative my-8 py-6 z-20">
            {/* The Stone Road Track */}
            <div className="h-16 bg-gradient-to-r from-amber-100 via-stone-200 to-amber-100 rounded-2xl border-4 border-stone-300 shadow-inner relative flex items-center justify-between px-6 overflow-hidden">
              {/* Direction Arrows on Road */}
              <div className="absolute inset-0 flex items-center justify-around opacity-30 text-stone-500 font-black text-2xl tracking-widest pointer-events-none">
                <span>GO STRAIGHT ➔➔</span>
                <span>GO STRAIGHT ➔➔</span>
                <span>TO THE SCHOOL ➔➔</span>
              </div>

              {/* Start Flag (Bakery) */}
              <div className="flex items-center gap-1 text-slate-700 font-extrabold text-xs z-10">
                <span className="text-xl">🏠</span>
                <span>Bakery 甜品坊</span>
              </div>

              {/* Destination (School Gate) */}
              <div className="flex items-center gap-1 text-purple-900 font-extrabold text-xs z-10">
                <span>The School 校园</span>
                <span className="text-2xl">🏫</span>
              </div>
            </div>

            {/* CHARACTER WALKING ON THE ROAD */}
            <div
              className="absolute -top-16 transition-all duration-700 ease-out z-30"
              style={{ left: `calc(${characterPos}% - 40px)` }}
            >
              <div className="relative flex flex-col items-center">
                {/* Speech Bubble */}
                <div className="bg-white px-2.5 py-1 rounded-xl shadow-lg border-2 border-slate-300 text-[11px] font-black text-slate-800 whitespace-nowrap mb-1 animate-bounce">
                  {step === 0 && '🎂 I want the cake!'}
                  {step === 1 && '⬆️ Go straight!'}
                  {step === 2 && '🌾 Field & Lake! 🌊'}
                  {step === 3 && '🏫 Almost at School!'}
                  {step === 4 && '🎉 Arrived! YAY!'}
                </div>

                {/* Dressed Character Avatar */}
                <div className="scale-75 origin-top drop-shadow-xl">
                  <CharacterAvatar
                    outfit={outfit}
                    size="sm"
                    showCakeInHand={hasCake}
                    isAnimated={true}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: INTERACTIVE STATIONS (Cake Table -> Direction Controls -> School Gate) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center relative z-20">
            {/* STATION 1: THE CAKE TABLE */}
            <div
              className={`p-4 rounded-3xl border-4 transition-all duration-300 flex flex-col justify-between ${
                hasCake
                  ? 'bg-rose-50 border-rose-300'
                  : 'bg-white border-rose-400 shadow-xl ring-4 ring-rose-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-rose-800">
                  Step 1: 拿蛋糕 (Pick up Cake)
                </span>
                <button
                  onClick={() => speakEnglish('Cake')}
                  className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" /> 读音
                </button>
              </div>

              <div className="text-center py-2">
                <div className="inline-block relative">
                  <span className="text-5xl animate-float">🎂</span>
                  {!hasCake && (
                    <span className="absolute -top-2 -right-3 text-xs bg-rose-600 text-white font-extrabold px-2 py-0.5 rounded-full shadow animate-pulse">
                      CLICK!
                    </span>
                  )}
                </div>
                <div className="font-black text-slate-800 text-lg mt-1">cake</div>
                <div className="text-xs text-slate-500 font-mono">/keɪk/ (蛋糕)</div>
              </div>

              <button
                disabled={hasCake}
                onClick={handlePickCake}
                className={`w-full py-2.5 rounded-2xl font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  hasCake
                    ? 'bg-emerald-500 text-white cursor-default'
                    : 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md hover:scale-102 hover:shadow-lg'
                }`}
              >
                {hasCake ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> 蛋糕已拿到 (+100分)
                  </>
                ) : (
                  <>
                    <Cake className="w-4 h-4" /> 点击拿 Cake！
                  </>
                )}
              </button>
            </div>

            {/* STATION 2: DIRECTION CONTROLS (GO STRAIGHT TO THE SCHOOL) */}
            <div className="p-4 rounded-3xl border-4 border-purple-400 bg-white shadow-xl flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-900">
                  Step 2: 走直行 (Go Straight)
                </span>
                <button
                  onClick={() => speakEnglish('Go straight to the school')}
                  className="text-xs text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer font-bold"
                >
                  <Volume2 className="w-3.5 h-3.5" /> 听指令
                </button>
              </div>

              <div className="text-center py-1">
                <div className="text-xs text-purple-800 font-semibold mb-2">
                  "How do we go to school?"
                </div>

                {/* THE THREE DIRECTION CHOICES */}
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <button
                    onClick={() => handleWrongTurn('left')}
                    className="p-2 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
                  >
                    ⬅️ Turn Left
                  </button>

                  {/* TARGET BUTTON: GO STRAIGHT */}
                  <button
                    onClick={handleGoStraight}
                    disabled={!hasCake || step >= 4}
                    className={`p-2 rounded-xl border-2 text-xs font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                      !hasCake
                        ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                        : 'bg-gradient-to-b from-purple-500 to-indigo-600 text-white border-purple-700 shadow-md hover:scale-105 animate-pulse-subtle'
                    }`}
                  >
                    <ArrowUp className="w-4 h-4" />
                    <span>Go Straight</span>
                  </button>

                  <button
                    onClick={() => handleWrongTurn('right')}
                    className="p-2 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
                  >
                    ➡️ Turn Right
                  </button>
                </div>

                {wrongDirectionTried && (
                  <div className="text-[11px] text-rose-600 font-bold animate-shake">
                    ❌ 老师说了：不要转弯，要走直行 (Go straight to the school)!
                  </div>
                )}
              </div>

              <div className="text-[11px] text-center text-slate-500">
                走直行指令：<span className="font-mono text-purple-900 font-bold">Go straight</span>
              </div>
            </div>

            {/* STATION 3: DESTINATION SCHOOL GATE */}
            <div
              className={`p-4 rounded-3xl border-4 transition-all duration-300 flex flex-col justify-between ${
                step >= 4
                  ? 'bg-emerald-50 border-emerald-400 shadow-xl'
                  : 'bg-slate-50 border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">
                  Step 3: 抵达学校 (At School)
                </span>
                <button
                  onClick={() => speakEnglish('School')}
                  className="text-xs text-slate-600 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" /> 读音
                </button>
              </div>

              <div className="text-center py-2">
                <div className="text-5xl animate-bounce">🏫</div>
                <div className="font-black text-slate-800 text-lg mt-1">school</div>
                <div className="text-xs text-slate-500 font-mono">/skuːl/ (学校)</div>
              </div>

              {step >= 4 ? (
                <div className="text-center">
                  <div className="text-xs font-extrabold text-emerald-800 bg-emerald-100 py-1.5 px-3 rounded-xl mb-2 flex items-center justify-center gap-1">
                    <Award className="w-4 h-4 text-emerald-600" />
                    安全送达！获得 +200分！
                  </div>
                  <button
                    onClick={onOpenArena}
                    className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-xs shadow-md hover:scale-102 transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>进行单词小试炼 🎯</span>
                  </button>
                </div>
              ) : (
                <div className="text-xs text-center text-slate-500 py-2">
                  拿着 cake，走直行 go straight，学校就在正前方！
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Teacher & Student Chanting Card */}
      <div className="mt-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
              <span>🗣️ 课堂互动朗读操 (Classroom Chant)</span>
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm mt-0.5 font-medium">
              "Take the <strong className="text-rose-600">cake</strong>! See the <strong className="text-emerald-600">field</strong> and the <strong className="text-sky-600">lake</strong>! <strong className="text-purple-700">Go straight</strong> to the <strong className="text-amber-700">school</strong>!"
            </p>
          </div>

          <button
            onClick={() => {
              speakEnglish('Take the cake! See the field and the lake! Go straight to the school!');
            }}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-xs rounded-xl shadow transition-transform hover:scale-105 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span>听整句朗读</span>
          </button>
        </div>
      </div>
    </div>
  );
};
