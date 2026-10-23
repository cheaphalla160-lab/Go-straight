import React from 'react';
import { CharacterOutfit } from '../types';

interface CharacterAvatarProps {
  outfit: CharacterOutfit;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCakeInHand?: boolean;
  isAnimated?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  outfit,
  size = 'lg',
  showCakeInHand = false,
  isAnimated = true,
}) => {
  const sizeMap = {
    sm: 'w-24 h-28',
    md: 'w-40 h-48',
    lg: 'w-56 h-64',
    xl: 'w-72 h-80',
  };

  const hasBlondeHair = outfit.hair === 'blonde';
  const hasMoustache = outfit.facialHair === 'moustache';

  return (
    <div className={`relative ${sizeMap[size]} flex items-center justify-center`}>
      {/* Target achievement sparkle glow */}
      {hasBlondeHair && hasMoustache && (
        <div className="absolute inset-0 -m-3 rounded-full bg-gradient-to-r from-amber-300 via-rose-300 to-yellow-300 opacity-40 blur-xl animate-pulse" />
      )}

      <svg
        viewBox="0 0 240 280"
        className={`w-full h-full drop-shadow-lg transition-transform duration-300 ${
          isAnimated ? 'hover:scale-105' : ''
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Back hair for ponytail/curls */}
        {outfit.hair === 'red' && (
          <path
            d="M50 90 C30 110 35 160 55 170 C65 175 60 130 65 100 Z"
            fill="#dc2626"
          />
        )}
        {outfit.hair === 'brown' && (
          <path
            d="M55 90 C40 120 40 160 65 170 C70 140 65 110 70 95 Z"
            fill="#78350f"
          />
        )}

        {/* Neck */}
        <path d="M105 155 L135 155 L135 185 L105 185 Z" fill="#fed7aa" />

        {/* Body & Clothes */}
        {outfit.clothes === 'uniform' && (
          <g id="uniform">
            {/* School navy blazer */}
            <path
              d="M75 180 C60 190 55 240 60 270 L180 270 C185 240 180 190 165 180 Z"
              fill="#1e3a8a"
            />
            {/* White collar */}
            <path d="M105 180 L120 205 L135 180 Z" fill="#ffffff" />
            {/* Red school tie */}
            <path d="M115 195 L125 195 L128 235 L120 245 L112 235 Z" fill="#ef4444" />
            {/* Gold school badge */}
            <circle cx="95" cy="215" r="7" fill="#facc15" />
            <path d="M92 215 L98 215" stroke="#78350f" strokeWidth="2" />
          </g>
        )}

        {outfit.clothes === 'chef' && (
          <g id="chef">
            <path
              d="M75 180 C60 190 55 240 60 270 L180 270 C185 240 180 190 165 180 Z"
              fill="#f8fafc"
            />
            {/* Red scarf */}
            <path d="M100 180 C110 195 130 195 140 180 L120 200 Z" fill="#dc2626" />
            {/* Chef buttons */}
            <circle cx="110" cy="220" r="4" fill="#64748b" />
            <circle cx="110" cy="245" r="4" fill="#64748b" />
            <circle cx="130" cy="220" r="4" fill="#64748b" />
            <circle cx="130" cy="245" r="4" fill="#64748b" />
          </g>
        )}

        {outfit.clothes === 'cape' && (
          <g id="cape">
            {/* Hero cape */}
            <path
              d="M55 180 C40 210 35 270 50 280 L190 280 C205 270 200 210 185 180 Z"
              fill="#e11d48"
            />
            {/* Hero suit */}
            <path
              d="M78 180 C65 190 65 240 70 270 L170 270 C175 240 175 190 162 180 Z"
              fill="#2563eb"
            />
            {/* Hero Star logo */}
            <polygon
              points="120,205 124,217 136,217 126,224 130,236 120,228 110,236 114,224 104,217 116,217"
              fill="#facc15"
            />
          </g>
        )}

        {outfit.clothes === 'striped' && (
          <g id="striped">
            <path
              d="M75 180 C60 190 55 240 60 270 L180 270 C185 240 180 190 165 180 Z"
              fill="#f97316"
            />
            {/* Stripes */}
            <path d="M70 205 L170 205" stroke="#ffffff" strokeWidth="8" />
            <path d="M65 230 L175 230" stroke="#ffffff" strokeWidth="8" />
            <path d="M60 255 L180 255" stroke="#ffffff" strokeWidth="8" />
          </g>
        )}

        {/* Head Base */}
        <ellipse cx="120" cy="115" rx="52" ry="56" fill="#fed7aa" />

        {/* Cute Ears */}
        <ellipse cx="68" cy="118" rx="8" ry="12" fill="#fdba74" />
        <ellipse cx="172" cy="118" rx="8" ry="12" fill="#fdba74" />

        {/* Cheeks */}
        <circle cx="88" cy="132" r="10" fill="#fca5a5" opacity="0.6" />
        <circle cx="152" cy="132" r="10" fill="#fca5a5" opacity="0.6" />

        {/* Eyes */}
        {outfit.eyes === 'happy' && (
          <g id="eyes-happy">
            <ellipse cx="98" cy="112" rx="6" ry="8" fill="#1e293b" />
            <circle cx="96" cy="109" r="2.5" fill="#ffffff" />
            <ellipse cx="142" cy="112" rx="6" ry="8" fill="#1e293b" />
            <circle cx="140" cy="109" r="2.5" fill="#ffffff" />
            {/* Eyebrows */}
            <path
              d="M90 98 Q98 94 106 98"
              stroke="#92400e"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M134 98 Q142 94 150 98"
              stroke="#92400e"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        )}

        {outfit.eyes === 'wink' && (
          <g id="eyes-wink">
            <ellipse cx="98" cy="112" rx="6" ry="8" fill="#1e293b" />
            <circle cx="96" cy="109" r="2.5" fill="#ffffff" />
            {/* Winking right eye */}
            <path
              d="M134 114 Q142 108 150 114"
              stroke="#1e293b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M90 98 Q98 94 106 98"
              stroke="#92400e"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M134 98 Q142 94 150 98"
              stroke="#92400e"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        )}

        {outfit.eyes === 'stars' && (
          <g id="eyes-stars">
            <polygon
              points="98,104 101,111 108,111 102,116 104,123 98,118 92,123 94,116 88,111 95,111"
              fill="#eab308"
            />
            <polygon
              points="142,104 145,111 152,111 146,116 148,123 142,118 136,123 138,116 132,111 139,111"
              fill="#eab308"
            />
          </g>
        )}

        {outfit.eyes === 'glasses' && (
          <g id="eyes-glasses">
            <circle cx="98" cy="112" r="14" stroke="#0284c7" strokeWidth="4" fill="#e0f2fe" fillOpacity="0.4" />
            <circle cx="142" cy="112" r="14" stroke="#0284c7" strokeWidth="4" fill="#e0f2fe" fillOpacity="0.4" />
            <line x1="112" y1="112" x2="128" y2="112" stroke="#0284c7" strokeWidth="4" />
            <circle cx="98" cy="112" r="4" fill="#1e293b" />
            <circle cx="142" cy="112" r="4" fill="#1e293b" />
          </g>
        )}

        {/* Nose */}
        <circle cx="120" cy="124" r="3.5" fill="#fb923c" />

        {/* Mouth */}
        <path
          d="M112 142 Q120 152 128 142"
          stroke="#e11d48"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* FACIAL HAIR: TARGET - MOUSTACHE! */}
        {outfit.facialHair === 'moustache' && (
          <g id="moustache-target" className="transition-all duration-300">
            {/* Cute classic curved gentleman moustache */}
            <path
              d="M120 132 C115 125 95 122 86 134 C82 140 88 146 98 143 C108 140 116 137 120 137 C124 137 132 140 142 143 C152 146 158 140 154 134 C145 122 125 125 120 132 Z"
              fill="#451a03"
            />
            {/* Highlight gleam on moustache */}
            <path
              d="M93 134 C98 131 106 132 112 134"
              stroke="#78350f"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M128 134 C134 132 142 131 147 134"
              stroke="#78350f"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {outfit.facialHair === 'beard' && (
          <g id="beard">
            <path
              d="M80 140 C80 175 160 175 160 140 C165 160 150 178 120 180 C90 178 75 160 80 140 Z"
              fill="#451a03"
            />
          </g>
        )}

        {outfit.facialHair === 'goatee' && (
          <g id="goatee">
            <ellipse cx="120" cy="155" rx="8" ry="12" fill="#451a03" />
          </g>
        )}

        {/* HAIR: TARGET - BLONDE HAIR! */}
        {outfit.hair === 'blonde' && (
          <g id="blonde-hair-target" className="transition-all duration-300">
            {/* Luscious golden blonde hair bangs and locks */}
            {/* Back volume */}
            <path
              d="M65 110 C55 60 185 60 175 110 C185 85 165 45 120 45 C75 45 55 85 65 110 Z"
              fill="#eab308"
            />
            {/* Front stylized bangs */}
            <path
              d="M64 96 C72 66 100 58 120 58 C145 58 174 68 176 96 C168 84 150 78 135 88 C122 96 112 86 98 84 C84 82 72 88 64 96 Z"
              fill="#facc15"
            />
            {/* Side bangs */}
            <path
              d="M62 90 C56 115 62 138 70 145 C66 130 65 110 68 95 Z"
              fill="#eab308"
            />
            <path
              d="M178 90 C184 115 178 138 170 145 C174 130 175 110 172 95 Z"
              fill="#eab308"
            />
            {/* Golden gleams / highlights */}
            <path
              d="M90 68 Q120 62 150 68"
              stroke="#fef08a"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M80 82 Q100 76 115 82"
              stroke="#fef08a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>
        )}

        {outfit.hair === 'brown' && (
          <g id="brown-hair">
            <path
              d="M65 105 C60 60 180 60 175 105 C185 80 165 48 120 48 C75 48 55 80 65 105 Z"
              fill="#78350f"
            />
            <path
              d="M66 98 C75 75 105 70 120 70 C140 70 165 76 174 98 C160 86 145 84 130 92 C115 100 100 90 85 88 C76 86 70 92 66 98 Z"
              fill="#92400e"
            />
          </g>
        )}

        {outfit.hair === 'red' && (
          <g id="red-hair">
            <path
              d="M65 105 C60 55 180 55 175 105 C185 75 165 45 120 45 C75 45 55 75 65 105 Z"
              fill="#b91c1c"
            />
            <path
              d="M66 96 C75 70 105 65 120 65 C140 65 165 70 174 96 C160 84 145 82 130 88 C115 94 100 86 85 84 C76 82 70 90 66 96 Z"
              fill="#dc2626"
            />
          </g>
        )}

        {outfit.hair === 'blue' && (
          <g id="blue-hair">
            <path
              d="M60 95 L75 55 L95 70 L120 45 L145 70 L165 55 L180 95 C170 80 150 75 120 75 C90 75 70 80 60 95 Z"
              fill="#0284c7"
            />
          </g>
        )}

        {/* ACCESSORY: BOWTIE */}
        {outfit.accessory === 'bowtie' && (
          <g id="bowtie">
            <polygon points="106,180 120,186 106,192" fill="#ef4444" />
            <polygon points="134,180 120,186 134,192" fill="#ef4444" />
            <circle cx="120" cy="186" r="3.5" fill="#b91c1c" />
          </g>
        )}

        {/* ACCESSORY: PARTY HAT */}
        {outfit.accessory === 'partyhat' && (
          <g id="party-hat">
            <polygon points="90,65 120,5 150,65" fill="#ec4899" />
            <circle cx="120" cy="5" r="7" fill="#facc15" />
            <circle cx="112" cy="35" r="4" fill="#67e8f9" />
            <circle cx="128" cy="45" r="4" fill="#a7f3d0" />
            <circle cx="118" cy="55" r="3.5" fill="#fef08a" />
          </g>
        )}

        {/* HAND-HELD CAKE (When collected or selected) */}
        {(showCakeInHand || outfit.accessory === 'cake') && (
          <g id="held-cake" className="animate-float">
            {/* Hands holding the plate */}
            <circle cx="85" cy="225" r="8" fill="#fed7aa" />
            <circle cx="155" cy="225" r="8" fill="#fed7aa" />

            {/* Cake Plate */}
            <ellipse cx="120" cy="235" rx="42" ry="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />

            {/* Cake Bottom Layer */}
            <rect x="90" y="210" width="60" height="20" rx="4" fill="#f43f5e" />
            <path d="M90 220 Q105 224 120 220 Q135 224 150 220" stroke="#fbcfe8" strokeWidth="3" fill="none" />

            {/* Cake Top Layer */}
            <rect x="98" y="196" width="44" height="15" rx="3" fill="#fb7185" />
            <ellipse cx="120" cy="196" rx="22" ry="5" fill="#fda4af" />

            {/* Strawberries */}
            <circle cx="110" cy="194" r="3" fill="#dc2626" />
            <circle cx="120" cy="193" r="3" fill="#dc2626" />
            <circle cx="130" cy="194" r="3" fill="#dc2626" />

            {/* Birthday Candle */}
            <rect x="118" y="180" width="4" height="14" fill="#38bdf8" />
            {/* Candle Flame */}
            <path
              d="M120 172 Q123 176 120 180 Q117 176 120 172 Z"
              fill="#facc15"
              className="animate-pulse"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
