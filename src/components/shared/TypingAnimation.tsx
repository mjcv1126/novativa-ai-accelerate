
import React, { useState, useEffect } from 'react';

interface TypingAnimationProps {
  phrases: string[] | { text: string; emoji: string }[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenPhrases?: number;
  className?: string;
  staticPrefix?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  phrases,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenPhrases = 2000,
  className = '',
  staticPrefix = '',
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  
  const getCurrentPhrase = () => {
    const phrase = phrases[currentPhraseIndex];
    return typeof phrase === 'string' ? phrase : phrase.text;
  };

  const getCurrentEmoji = () => {
    const phrase = phrases[currentPhraseIndex];
    return typeof phrase === 'string' ? '' : phrase.emoji;
  };
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isWaiting) {
        setIsWaiting(false);
        setIsDeleting(true);
        return;
      }

      const currentPhrase = getCurrentPhrase();
      
      if (isDeleting) {
        setCurrentText(currentText.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        }
      } else {
        setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        
        if (currentText === currentPhrase) {
          setIsWaiting(true);
        }
      }
    }, isWaiting ? delayBetweenPhrases : isDeleting ? deletingSpeed : typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isWaiting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases]);
  
  const currentEmoji = getCurrentEmoji();
  
  return (
    <div className={`typewriter-container ${className}`}>
      {staticPrefix && <span className="typewriter-static">{staticPrefix} </span>}
      {currentEmoji && <span className="mr-2 text-4xl md:text-5xl">{currentEmoji}</span>}
      <span className="typewriter-text">{currentText}</span>
    </div>
  );
};

export default TypingAnimation;
