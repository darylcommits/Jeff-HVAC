import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, Flame, Wind, Plus, Minus, Zap, Sparkles, Check, Volume2, VolumeX } from 'lucide-react';
import MoistAirMistCanvas from './MoistAirMistCanvas';

// Pleasant synthesized audio beep (Web Audio API)
function playACBeep(type = 'on') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';

    if (type === 'on') {
      // High pleasant single chime for ON
      osc.frequency.setValueAtTime(1174.66, ctx.currentTime); // D6
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } else if (type === 'off') {
      // Lower descending dual tone for OFF
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else {
      // Quick click tick for temp adjustments
      osc.frequency.setValueAtTime(1318.51, ctx.currentTime); // E6
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    }
  } catch (err) {
    // Audio might be blocked by browser until user gesture
  }
}

export default function InteractiveACUnit() {
  const [isPoweredOn, setIsPoweredOn] = useState(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('ac=off')) {
      return false;
    }
    return true;
  });
  const [temperature, setTemperature] = useState(21);
  const [mode, setMode] = useState('eco'); // 'cool' | 'eco' | 'turbo'
  const [isSwinging, setIsSwinging] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Toggle AC Power
  const togglePower = () => {
    const nextState = !isPoweredOn;
    setIsPoweredOn(nextState);
    if (soundEnabled) {
      playACBeep(nextState ? 'on' : 'off');
    }
  };

  // Adjust Temperature
  const changeTemp = (delta) => {
    if (!isPoweredOn) return;
    setTemperature((prev) => {
      const next = Math.max(16, Math.min(26, prev + delta));
      if (soundEnabled && next !== prev) playACBeep('tick');
      return next;
    });
  };

  // Switch Mode
  const cycleMode = (newMode) => {
    if (!isPoweredOn) return;
    setMode(newMode);
    if (soundEnabled) playACBeep('tick');
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center select-none pt-2 pb-6">
      {/* =========================================================================
          AIR CONDITIONER INDOOR UNIT
         ========================================================================= */}
      <div className="relative w-full max-w-[680px] px-3 z-20">
        {/* Main AC Unit Chassis */}
        <div
          onClick={togglePower}
          title={isPoweredOn ? 'Click to Turn OFF Moist Cold Air' : 'Click to Turn ON Moist Cold Air'}
          className={`relative w-full h-36 sm:h-44 rounded-2xl sm:rounded-[32px] p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-700 shadow-2xl border ${
            isPoweredOn
              ? 'bg-gradient-to-b from-white via-slate-50 to-slate-200 border-slate-300 shadow-emerald-500/10 hover:shadow-cyan-400/20'
              : 'bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 border-slate-300/80 opacity-90'
          }`}
        >
          {/* Top Air Intake Grill Lines */}
          <div className="absolute top-2 inset-x-8 sm:inset-x-12 h-2 flex justify-between gap-1 opacity-40 pointer-events-none">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="flex-1 h-0.5 bg-slate-400 rounded-full" />
            ))}
          </div>

          {/* Top Panel: Brand Label + LED Display & Power Indicator */}
          <div className="flex items-center justify-between w-full pt-1 sm:pt-2 px-2 sm:px-3">
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  isPoweredOn
                    ? 'bg-brand-green-500 shadow-[0_0_10px_#22C55E] animate-pulse'
                    : 'bg-slate-400'
                }`}
              />
              <div className="flex flex-col">
                <span className="text-[11px] sm:text-xs font-black tracking-widest text-slate-800 uppercase font-sans">
                  <span className="text-brand-green-500 font-black">JE</span><span className="text-brand-red-500 font-black">FF</span> <span className="text-brand-green-600 font-bold">INVERTER PRO</span>
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400 hidden sm:block">
                  Dual Climate Inverter
                </span>
              </div>
            </div>

            {/* Right: Digital LED Display */}
            <div className="flex items-center gap-2">
              <div
                className={`transition-all duration-500 font-mono text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 rounded-xl shadow-inner border flex items-center gap-2 ${
                  isPoweredOn
                    ? 'bg-slate-950 text-emerald-400 border-slate-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]'
                    : 'bg-slate-800/60 text-slate-500 border-slate-700/60'
                }`}
              >
                {isPoweredOn ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-extrabold tracking-wider">
                      {temperature}°C • {mode.toUpperCase()}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span className="font-semibold tracking-wider text-slate-400">STANDBY • OFF</span>
                  </>
                )}
              </div>

              {/* Power Switch on unit */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePower();
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                  isPoweredOn
                    ? 'bg-brand-green-500 text-white hover:bg-brand-green-600 shadow-brand-green-500/30'
                    : 'bg-slate-300 text-slate-600 hover:bg-slate-400'
                }`}
                title="Power Button"
              >
                <Power className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Center Brand Accent Strip */}
          <div
            className={`w-full h-1 rounded-full transition-all duration-700 my-auto ${
              isPoweredOn
                ? 'bg-gradient-to-r from-transparent via-brand-green-500 to-transparent opacity-90'
                : 'bg-gradient-to-r from-transparent via-slate-400 to-transparent opacity-40'
            }`}
          />

          {/* =========================================================================
              MOTORIZED LOUVER FLAP (Smoothly opens when ON, closes tight when OFF)
             ========================================================================= */}
          <div className="relative w-full">
            {/* Air Vent Cavity (Internal dark channel with guide vanes) */}
            <div className="w-full h-7 sm:h-8 bg-slate-900 rounded-xl overflow-hidden relative flex items-center justify-evenly px-3 shadow-inner">
              {/* Internal cooling guide vanes */}
              {[...Array(14)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-full bg-slate-700/80 transform skew-x-12 transition-transform duration-500 ${
                    isPoweredOn && isSwinging ? 'rotate-6' : ''
                  }`}
                />
              ))}

              {/* Ambient cyan cool-light strip inside vent */}
              <div
                className={`absolute bottom-0 inset-x-0 h-1 transition-opacity duration-500 ${
                  isPoweredOn
                    ? 'bg-cyan-400 shadow-[0_0_14px_#38BDF8] opacity-100'
                    : 'opacity-0'
                }`}
              />
            </div>

            {/* Motorized Louver Flap Door */}
            <motion.div
              animate={{
                rotateX: isPoweredOn ? (isSwinging ? [42, 58, 42] : 50) : 0,
                y: isPoweredOn ? 8 : -2,
                opacity: 1,
              }}
              transition={{
                rotateX: isPoweredOn && isSwinging ? { repeat: Infinity, duration: 4, ease: 'easeInOut' } : { duration: 0.6 },
                y: { duration: 0.6, ease: 'easeOut' },
              }}
              style={{ transformOrigin: 'top center', perspective: 600 }}
              className={`absolute top-0 inset-x-0 h-6 sm:h-7 rounded-xl border border-slate-300 shadow-md transition-colors duration-500 flex items-center justify-center ${
                isPoweredOn
                  ? 'bg-white/95 backdrop-blur-sm'
                  : 'bg-slate-200/95 border-slate-300'
              }`}
            >
              {/* Subtle metallic rim along flap edge */}
              <div className="w-1/2 h-0.5 bg-slate-300 rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* =========================================================================
            MOIST COLD AIR VAPOR MIST STREAM (Blows when ON, shuts down when OFF)
           ========================================================================= */}
        <div className="relative w-full h-44 sm:h-52 overflow-visible pointer-events-none -mt-1">
          <MoistAirMistCanvas
            isBlowing={isPoweredOn}
            turbo={mode === 'turbo'}
            temperature={temperature}
            className="w-full h-full"
          />

          {/* Volumetric cool breeze gradient ripples */}
          <AnimatePresence>
            {isPoweredOn && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0.5 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.5 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-gradient-to-b from-cyan-300/30 via-emerald-200/15 to-transparent blur-2xl rounded-b-full pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* =========================================================================
          HANDHELD SMART AC REMOTE CONTROL
         ========================================================================= */}
      <div className="mt-2 sm:mt-4 z-30 flex flex-col items-center">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full px-5 py-3 shadow-xl border border-slate-200/90 flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
          {/* Main Power Button */}
          <button
            onClick={togglePower}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 shadow-md cursor-pointer ${
              isPoweredOn
                ? 'bg-brand-green-500 hover:bg-brand-green-600 text-white shadow-brand-green-500/30'
                : 'bg-brand-red-500 hover:bg-brand-red-600 text-white shadow-brand-red-500/30'
            }`}
          >
            <Power className="w-4 h-4 stroke-[2.5]" />
            <span>{isPoweredOn ? 'POWER: ON' : 'POWER: OFF'}</span>
          </button>

          {/* Temperature Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-100 rounded-full p-1 border border-slate-200">
            <button
              onClick={() => changeTemp(-1)}
              disabled={!isPoweredOn || temperature <= 16}
              className="w-7 h-7 rounded-full bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm shadow-sm transition-all disabled:opacity-40 cursor-pointer"
              title="Decrease Temperature"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2.5 text-xs font-black font-mono text-slate-800">
              {temperature}°C
            </span>
            <button
              onClick={() => changeTemp(1)}
              disabled={!isPoweredOn || temperature >= 26}
              className="w-7 h-7 rounded-full bg-white hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm shadow-sm transition-all disabled:opacity-40 cursor-pointer"
              title="Increase Temperature"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Modes: Cool / Eco / Turbo */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1 border border-slate-200">
            {[
              { id: 'cool', label: 'Cool', icon: Wind },
              { id: 'eco', label: 'Eco', icon: Sparkles },
              { id: 'turbo', label: 'Turbo', icon: Zap },
            ].map((m) => {
              const Icon = m.icon;
              const active = mode === m.id && isPoweredOn;
              return (
                <button
                  key={m.id}
                  onClick={() => cycleMode(m.id)}
                  disabled={!isPoweredOn}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all disabled:opacity-40 cursor-pointer ${
                    active
                      ? 'bg-brand-green-500 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Swing Louver Toggle */}
          <button
            onClick={() => {
              if (isPoweredOn) {
                setIsSwinging(!isSwinging);
                if (soundEnabled) playACBeep('tick');
              }
            }}
            disabled={!isPoweredOn}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors disabled:opacity-40 cursor-pointer ${
              isSwinging && isPoweredOn
                ? 'bg-cyan-100 text-cyan-800 border border-cyan-300'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Swing: {isSwinging ? 'Auto' : 'Fixed'}
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors"
            title={soundEnabled ? 'Chime Sound Enabled' : 'Chime Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>

        {/* Status Prompt */}
        <p className="text-[11px] font-semibold text-slate-500 mt-2 flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isPoweredOn ? 'bg-emerald-500 animate-pulse' : 'bg-red-400'}`} />
          <span>
            {isPoweredOn
              ? 'AC Inverter is ON • Blowing moist cold air. Click Power to shut down.'
              : 'AC Inverter is OFF • Moist air shut down. Click Power to turn on.'}
          </span>
        </p>
      </div>
    </div>
  );
}
