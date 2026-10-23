import React from 'react';
import { VOCABULARY_LIST } from '../data/vocabulary';
import { X, Printer, Volume2 } from 'lucide-react';
import { speakEnglish } from '../utils/audio';

interface PrintableCardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableCardsModal: React.FC<PrintableCardsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-3xl border-4 border-slate-300 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header (hidden in print) */}
        <div className="print:hidden p-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-xl font-black flex items-center gap-2">
              <Printer className="w-5 h-5" /> 课堂单词闪卡 (Printable Flashcards)
            </h3>
            <p className="text-xs text-emerald-100">
              包含核心词汇：cake, lake, field, blonde hair, moustache, go straight, school
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white text-emerald-800 rounded-xl font-extrabold text-xs shadow hover:bg-emerald-50 flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> 打印闪卡 (Print)
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Cards Grid */}
        <div className="p-6 overflow-y-auto print:p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 print:grid-cols-2 print:gap-4">
            {VOCABULARY_LIST.map((word) => (
              <div
                key={word.id}
                className="rounded-2xl border-2 border-dashed border-slate-300 p-5 bg-white flex flex-col justify-between relative shadow-sm hover:border-emerald-400 transition-colors print:shadow-none print:border-slate-400"
              >
                {/* Cut line helper */}
                <span className="text-[10px] text-slate-300 print:text-slate-400 font-mono block mb-1">
                  ✂️ 剪切线 (Cut line)
                </span>

                <div className="text-center py-4">
                  <div className="text-3xl font-black text-slate-800 mb-1">
                    {word.word}
                  </div>
                  <div className="font-mono text-xs text-indigo-600 font-semibold mb-2">
                    {word.phonetic}
                  </div>
                  <div className="text-sm font-bold text-slate-600 bg-slate-50 py-1 px-3 rounded-lg inline-block">
                    {word.translation}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 text-center">
                  <p className="text-[11px] text-slate-500 italic mb-2">
                    "{word.sentence}"
                  </p>
                  <div className="print:hidden">
                    <button
                      onClick={() => speakEnglish(word.word)}
                      className="inline-flex items-center gap-1 text-[11px] text-emerald-700 hover:text-emerald-900 font-bold cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> 听发音
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer (hidden in print) */}
        <div className="print:hidden p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};
