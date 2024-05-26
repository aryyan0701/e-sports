// TypingAnimation.js
import React, { useEffect, useState } from 'react';

const TypingAnimation = ({ words, speed = 150, delay = 2000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[currentWordIndex];
      const currentLength = displayedText.length;

      if (isDeleting) {
        if (currentLength === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        } else {
          setDisplayedText(currentWord.substring(0, currentLength - 1));
        }
      } else {
        if (currentLength === currentWord.length) {
          setTimeout(() => setIsDeleting(true), delay);
        } else {
          setDisplayedText(currentWord.substring(0, currentLength + 1));
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(typingTimeout);
  }, [displayedText, isDeleting, words, currentWordIndex, speed, delay]);

  return <span>{displayedText}</span>;
};

export default TypingAnimation;
