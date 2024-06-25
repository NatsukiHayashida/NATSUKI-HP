'use client'
import React from 'react';
import { TypeAnimation } from 'react-type-animation';


const TypingText: React.FC = () => {
  return (
    <div className="flex font-light mx-2 mb-2 leading-relaxed">
      <TypeAnimation
        sequence={[
        'Usually I work with CAD and CAM in a factory, but personally, I\'m into studying front-end development and AI. \n  This site is my tech playground, where I share my journey and connect with like-minded folks. I hope it inspires you as much as it inspires me.\n\nThanks for stopping by, and let\'s enjoy this ride togethere✌️', 
          1000, // 1秒待機
        ]}
        speed={75}
        style={{ whiteSpace: 'pre-line', display: 'block' }}
        repeat={0}
        
      />
    </div>
  );
};

export default TypingText;
