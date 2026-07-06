import React from 'react';
import { useStore, MuscleGroup } from '../store/useStore';
interface MuscleHeatmapSVGProps {
  onMuscleClick?: (muscle: MuscleGroup) => void;
  view?: 'front' | 'back';
}
export const MuscleHeatmapSVG: React.FC<MuscleHeatmapSVGProps> = ({
  onMuscleClick,
  view = 'front'
}) => {
  const getMuscleScore = useStore((state) => state.getMuscleScore);
  const getColor = (muscle: MuscleGroup) => {
    const { status } = getMuscleScore(muscle);
    switch (status) {
      case 'balanced':
        return '#10b981';
      // green
      case 'undertrained':
        return '#f59e0b';
      // yellow
      case 'neglected':
        return '#ef4444';
      // red
      case 'overtrained':
        return '#8b5cf6';
      // purple
      default:
        return '#2a2a35';
    }
  };
  const interactiveStyle = {
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    stroke: '#0a0a0f',
    strokeWidth: 2
  };
  // Simplified geometric body representation
  return (
    <div className="w-full max-w-[280px] mx-auto aspect-[1/2] relative">
      <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-glow">
        {view === 'front' ?
        <g id="front-view">
            {/* Head & Neck (Static) */}
            <circle cx="100" cy="30" r="18" fill="#2a2a35" />
            <rect x="92" y="45" width="16" height="15" fill="#2a2a35" />

            {/* Shoulders / Front Delts */}
            <path
            d="M 65 60 Q 75 55 92 60 L 92 80 L 60 80 Z"
            fill={getColor('Front Delts')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Front Delts')} />
          
            <path
            d="M 135 60 Q 125 55 108 60 L 108 80 L 140 80 Z"
            fill={getColor('Front Delts')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Front Delts')} />
          

            {/* Chest */}
            <path
            d="M 70 80 L 130 80 L 130 115 Q 100 125 70 115 Z"
            fill={getColor('Chest')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Chest')} />
          

            {/* Abs */}
            <rect
            x="80"
            y="120"
            width="40"
            height="50"
            rx="4"
            fill={getColor('Abs')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Abs')} />
          

            {/* Obliques */}
            <path
            d="M 70 120 L 78 120 L 78 170 L 65 160 Z"
            fill={getColor('Obliques')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Obliques')} />
          
            <path
            d="M 130 120 L 122 120 L 122 170 L 135 160 Z"
            fill={getColor('Obliques')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Obliques')} />
          

            {/* Biceps */}
            <rect
            x="50"
            y="85"
            width="18"
            height="40"
            rx="8"
            fill={getColor('Biceps')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Biceps')} />
          
            <rect
            x="132"
            y="85"
            width="18"
            height="40"
            rx="8"
            fill={getColor('Biceps')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Biceps')} />
          

            {/* Forearms */}
            <rect
            x="45"
            y="130"
            width="14"
            height="45"
            rx="6"
            fill={getColor('Forearms')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Forearms')} />
          
            <rect
            x="141"
            y="130"
            width="14"
            height="45"
            rx="6"
            fill={getColor('Forearms')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Forearms')} />
          

            {/* Pelvis (Static) */}
            <path d="M 65 175 L 135 175 L 120 200 L 80 200 Z" fill="#2a2a35" />

            {/* Quads */}
            <rect
            x="65"
            y="205"
            width="30"
            height="75"
            rx="10"
            fill={getColor('Quads')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Quads')} />
          
            <rect
            x="105"
            y="205"
            width="30"
            height="75"
            rx="10"
            fill={getColor('Quads')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Quads')} />
          

            {/* Calves (Front view shows less, but still visible) */}
            <rect
            x="68"
            y="290"
            width="24"
            height="60"
            rx="8"
            fill={getColor('Calves')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Calves')} />
          
            <rect
            x="108"
            y="290"
            width="24"
            height="60"
            rx="8"
            fill={getColor('Calves')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Calves')} />
          
          </g> :

        <g id="back-view">
            {/* Head & Neck (Static) */}
            <circle cx="100" cy="30" r="18" fill="#2a2a35" />
            <rect x="92" y="45" width="16" height="15" fill="#2a2a35" />

            {/* Traps / Upper Back */}
            <path
            d="M 75 55 L 125 55 L 110 90 L 90 90 Z"
            fill={getColor('Upper Back')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Upper Back')} />
          

            {/* Rear Delts */}
            <path
            d="M 55 60 Q 65 55 75 60 L 75 80 L 50 80 Z"
            fill={getColor('Rear Delts')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Rear Delts')} />
          
            <path
            d="M 145 60 Q 135 55 125 60 L 125 80 L 150 80 Z"
            fill={getColor('Rear Delts')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Rear Delts')} />
          

            {/* Lats */}
            <path
            d="M 65 85 L 95 95 L 95 150 L 70 120 Z"
            fill={getColor('Lats')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Lats')} />
          
            <path
            d="M 135 85 L 105 95 L 105 150 L 130 120 Z"
            fill={getColor('Lats')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Lats')} />
          

            {/* Lower Back (Static) */}
            <rect x="85" y="155" width="30" height="20" fill="#2a2a35" />

            {/* Triceps */}
            <rect
            x="48"
            y="85"
            width="16"
            height="42"
            rx="8"
            fill={getColor('Triceps')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Triceps')} />
          
            <rect
            x="136"
            y="85"
            width="16"
            height="42"
            rx="8"
            fill={getColor('Triceps')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Triceps')} />
          

            {/* Forearms */}
            <rect
            x="42"
            y="132"
            width="14"
            height="45"
            rx="6"
            fill={getColor('Forearms')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Forearms')} />
          
            <rect
            x="144"
            y="132"
            width="14"
            height="45"
            rx="6"
            fill={getColor('Forearms')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Forearms')} />
          

            {/* Glutes */}
            <path
            d="M 60 180 L 100 180 L 100 220 Q 80 230 60 210 Z"
            fill={getColor('Glutes')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Glutes')} />
          
            <path
            d="M 140 180 L 100 180 L 100 220 Q 120 230 140 210 Z"
            fill={getColor('Glutes')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Glutes')} />
          

            {/* Hamstrings */}
            <rect
            x="65"
            y="225"
            width="28"
            height="65"
            rx="10"
            fill={getColor('Hamstrings')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Hamstrings')} />
          
            <rect
            x="107"
            y="225"
            width="28"
            height="65"
            rx="10"
            fill={getColor('Hamstrings')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Hamstrings')} />
          

            {/* Calves */}
            <rect
            x="68"
            y="295"
            width="24"
            height="60"
            rx="8"
            fill={getColor('Calves')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Calves')} />
          
            <rect
            x="108"
            y="295"
            width="24"
            height="60"
            rx="8"
            fill={getColor('Calves')}
            style={interactiveStyle}
            onClick={() => onMuscleClick?.('Calves')} />
          
          </g>
        }
      </svg>
    </div>);

};