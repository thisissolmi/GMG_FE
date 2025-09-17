import React from 'react';

interface StartButtonProps {
  onClick?: () => void;
  className?: string;
}

const StartButton: React.FC<StartButtonProps> = ({ 
  onClick, 
  className = '' 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`bg-orange-300 hover:bg-orange-400 text-white font-medium px-8 py-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${className}`}
    >
      여행 시작하기
    </button>
  );
};

export default StartButton;