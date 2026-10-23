import React, { useState } from 'react';
import { TEACHER_LESSON_PLAN, VOCABULARY_LIST } from '../data/vocabulary';
import { soundManager, speakEnglish } from '../utils/audio';
import { X, BookOpen, Volume2, Printer, CheckCircle, Lightbulb, Sparkles, Clock, Music } from 'lucide-react';

interface TeacherHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrintCards: () => void;
}

export const TeacherHelperModal: React.FC<TeacherHelperModalProps> = ({
  isOpen,
  onClose,
  onOpenPrintCards,
}) => {
  const [activeTab, setActiveTab] = useState<'plan' | 'games' | 'chants'>('plan');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl border-4 border-indigo-300 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
              👩‍🏫
            </div>
            <div>
              <div className="text-xs uppercase font-extrabold tracking-widest text-indigo-200">
                Teacher's Kit • 备课助手专区
              </div>
              <h3 className="text-xl md:text-2xl font-black">
                {TEACHER_LESSON_PLAN.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 shrink-0 gap-2 pt-2">
          <button
            onClick={() => {
              soundManager.playPop();
              setActiveTab('plan');
            }}
            className={`px-4 py-3 font-extrabold text-sm border-b-4 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'plan'
                ? 'border-indigo-600 text-indigo-900 bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" /> 40分钟教案设计
          </button>

          <button
            onClick={() => {
              soundManager.playPop();
              setActiveTab('games');
            }}
            className={`px-4 py-3 font-extrabold text-sm border-b-4 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'games'
                ? 'border-indigo-600 text-indigo-900 bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lightbulb className="w-4 h-4" /> 课堂互动游戏 (TPR)
          </button>

          <button
            onClick={() => {
              soundManager.playPop();
              setActiveTab('chants');
            }}
            className={`px-4 py-3 font-extrabold text-sm border-b-4 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'chants'
                ? 'border-indigo-600 text-indigo-900 bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Music className="w-4 h-4" /> 律动童谣 (Chants)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* TAB 1: LESSON PLAN */}
          {activeTab === 'plan' && (
            <div className="space-y-6">
              {/* Target & Grade info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-200">
                  <div className="text-xs font-bold text-indigo-700 uppercase mb-1">适合年级与时长</div>
                  <div className="font-extrabold text-slate-800 text-sm">
                    {TEACHER_LESSON_PLAN.targetGrade} • {TEACHER_LESSON_PLAN.duration}
                  </div>
                </div>

                <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
                  <div className="text-xs font-bold text-purple-700 uppercase mb-1">重点词句聚焦</div>
                  <div className="font-extrabold text-slate-800 text-xs leading-relaxed">
                    cake, field, lake, blonde hair, moustache, go straight to the school
                  </div>
                </div>
              </div>

              {/* Objectives */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <h4 className="font-extrabold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> 教学目标 (Teaching Objectives)
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-slate-700">
                  {TEACHER_LESSON_PLAN.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps Timeline */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" /> 课堂推进流程 (Lesson Steps)
                </h4>
                {TEACHER_LESSON_PLAN.steps.map((st, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl border-2 border-slate-100 bg-white hover:border-indigo-200 transition-colors shadow-sm flex flex-col sm:flex-row sm:items-start gap-3"
                  >
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 font-black text-xs shrink-0 self-start">
                      {st.time}
                    </span>
                    <div>
                      <div className="font-black text-slate-800 text-sm mb-1">{st.title}</div>
                      <div className="text-xs text-slate-600 leading-relaxed">{st.activity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CLASSROOM GAMES (TPR) */}
          {activeTab === 'games' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
                <h4 className="font-black text-amber-900 text-base mb-1">
                  1. 听指令做动作：Simon Says "Go Straight!"
                </h4>
                <p className="text-xs text-amber-800 mb-2 leading-relaxed">
                  <strong>玩法说明：</strong> 老师担任指令官，当老师说 "Simon says: Go straight!" 时，全班学生起立双臂前伸笔直走三步；当老师直接说 "Go straight!" (没有Simon says) 时，保持静止，动了的小朋友回答一个单词卡卡片。
                </p>
                <div className="text-[11px] text-amber-900 font-bold bg-white/80 p-2 rounded-xl">
                  拓展指令：Simon says: "Touch your moustache!" (摸人中做八字胡动作) / Simon says: "Touch your blonde hair!" (摸头发)。
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-cyan-50 border-2 border-sky-200">
                <h4 className="font-black text-sky-900 text-base mb-1">
                  2. 押韵大回声：Cake & Lake Rhyme Echo
                </h4>
                <p className="text-xs text-sky-800 mb-2 leading-relaxed">
                  <strong>玩法说明：</strong> 老师拍手示范节奏："I have a cake!"，左边第一组学生马上回声接唱押韵词："By the lake!"；第二组接："Let us bake!"。体验英语音韵美，强化 /eɪk/ 字母组合认知。
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
                <h4 className="font-black text-emerald-900 text-base mb-1">
                  3. 拼图角色模仿秀：Who am I?
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  让一位小朋友戴上黄色假发道具或手做八字胡造型，手持道具蛋糕，其他小朋友用句型描述："He has blonde hair and a moustache! He takes the cake to school!"
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CHANTS */}
          {activeTab === 'chants' && (
            <div className="space-y-4">
              {TEACHER_LESSON_PLAN.chants.map((ch, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-indigo-900 text-sm">
                      {idx === 0 ? 'Chant 1: 押韵大发现' : 'Chant 2: 动作连环走'}
                    </span>
                    <button
                      onClick={() => speakEnglish(ch.replace(/🎵|🍰|🌊|🌾|👱|🥸|🎂|🏫/g, ''))}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> 朗读此 Chant
                    </button>
                  </div>
                  <pre className="font-sans text-xs md:text-sm text-slate-700 whitespace-pre-wrap leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                    {ch}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Print Action */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              soundManager.playPop();
              onOpenPrintCards();
            }}
            className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" /> 打印 / 查看课堂单词卡 (Print Cards)
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
          >
            关闭返回游戏
          </button>
        </div>
      </div>
    </div>
  );
};
