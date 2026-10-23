/**
 * Audio synthesis for background music, sound effects, and English speech
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isBgmPlaying = false;
  private isMuted = false;
  private bgmTimer: number | null = null;
  private currentStep = 0;

  // Cheerful, pentatonic/major nursery melody for kids
  // Melody notes in MIDI frequencies
  private melody = [
    // Bar 1: C5 - E5 - G5 - A5
    523.25, 659.25, 783.99, 880.00,
    // Bar 2: G5 - E5 - C5 - D5
    783.99, 659.25, 523.25, 587.33,
    // Bar 3: E5 - G5 - A5 - C6
    659.25, 783.99, 880.00, 1046.50,
    // Bar 4: G5 - E5 - D5 - C5
    783.99, 659.25, 587.33, 523.25,
    // Bar 5: A4 - C5 - D5 - E5
    440.00, 523.25, 587.33, 659.25,
    // Bar 6: G4 - B4 - D5 - G5
    392.00, 493.88, 587.33, 783.99,
    // Bar 7: A5 - G5 - E5 - D5
    880.00, 783.99, 659.25, 587.33,
    // Bar 8: C5 - E5 - G5 - C5
    523.25, 659.25, 783.99, 523.25,
  ];

  // Bass accompaniment
  private bassNotes = [
    261.63, 261.63, // C4
    196.00, 196.00, // G3
    220.00, 220.00, // A3
    174.61, 196.00, // F3, G3
    220.00, 220.00, // A3
    196.00, 196.00, // G3
    174.61, 196.00, // F3, G3
    261.63, 261.63  // C4
  ];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.value = 0.12; // gentle background volume
      this.bgmGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.28;
      this.sfxGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play upbeat marimba-like note
  private playMarimbaNote(freq: number, duration: number, isBass = false) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = isBass ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Cute percussive envelope
    gain.gain.setValueAtTime(isBass ? 0.08 : 0.14, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    if (this.bgmGain) {
      gain.connect(this.bgmGain);
    } else {
      gain.connect(ctx.destination);
    }

    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  public startBGM() {
    if (this.isBgmPlaying) return;
    this.getContext();
    this.isBgmPlaying = true;
    this.currentStep = 0;

    const stepDurationMs = 280; // approx 107 BPM bouncy rhythm

    this.bgmTimer = window.setInterval(() => {
      if (!this.isBgmPlaying || this.isMuted) return;
      const note = this.melody[this.currentStep % this.melody.length];
      this.playMarimbaNote(note, 0.35);

      // Bass note every 2 steps
      if (this.currentStep % 2 === 0) {
        const bassIdx = Math.floor(this.currentStep / 2) % this.bassNotes.length;
        this.playMarimbaNote(this.bassNotes[bassIdx], 0.45, true);
      }

      this.currentStep++;
    }, stepDurationMs);
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmTimer !== null) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  public toggleBGM(): boolean {
    if (this.isBgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  public getIsBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgmGain) {
      this.bgmGain.gain.value = this.isMuted ? 0 : 0.12;
    }
    if (this.sfxGain) {
      this.sfxGain.gain.value = this.isMuted ? 0 : 0.28;
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Sound Effect: Pop
  public playPop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.sfxGain || ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }

  // Sound Effect: Snap puzzle piece
  public playSnap() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.setValueAtTime(900, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(this.sfxGain || ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  }

  // Sound Effect: Ding / Correct
  public playDing() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const notes = [659.25, 987.77]; // E5, B5

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

      gain.gain.setValueAtTime(0.3, ctx.currentTime + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGain || ctx.destination);

      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 0.35);
    });
  }

  // Sound Effect: Cake pickup magical shimmer
  public playMagic() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C major pentatonic sweep

    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.3);

      osc.connect(gain);
      gain.connect(this.sfxGain || ctx.destination);

      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 0.3);
    });
  }

  // Sound Effect: Fanfare for level complete
  public playFanfare() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    const melody = [
      { f: 523.25, t: 0, d: 0.15 },
      { f: 659.25, t: 0.15, d: 0.15 },
      { f: 783.99, t: 0.3, d: 0.15 },
      { f: 1046.50, t: 0.45, d: 0.45 }
    ];

    melody.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, ctx.currentTime + t);

      gain.gain.setValueAtTime(0.35, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + d);

      osc.connect(gain);
      gain.connect(this.sfxGain || ctx.destination);

      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + d);
    });
  }
}

export const soundManager = new SoundManager();

/**
 * Natural English speech synthesis for kids
 */
export function speakEnglish(text: string, rate = 0.9, pitch = 1.1) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate; // slightly slower for young learners
    utterance.pitch = pitch; // friendly upbeat pitch

    // Prefer natural English voices if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(
      v => (v.lang === 'en-US' || v.lang === 'en-GB') && (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Victoria'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('TTS error:', err);
  }
}
