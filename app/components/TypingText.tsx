'use client'
import React from 'react';
import { TypeAnimation } from 'react-type-animation';


const TypingText: React.FC = () => {
  return (
    <div className="flex font-light mx-2 mb-2 leading-relaxed">
      <TypeAnimation
        sequence={[
        'Usually I work with CAD and CAM in a factory, but personally, I\'m into studying front-end development and AI. \n  This site is my tech playground, where I share my journey and connect with like-minded folks. I hope it inspires you as much as it inspires me.Thanks for stopping by, and let\'s enjoy this ride togethere✌️', 
          1000, // 1秒待機
          '普段は工場でCADとCAMを扱っていますが、夜はフロントエンド開発やAIに没頭しています。このサイトは私のテクノロジーの遊び場で、旅を共有し、志を同じくする仲間と繋がる場所です。私がインスピレーションを受けるように、皆さんにも何かの刺激を与えられたら嬉しいです。訪問してくださってありがとう。'
        ]}
        speed={75}
        style={{ whiteSpace: 'pre-line', display: 'block' }}
        repeat={0}
        
      />
    </div>
  );
};

export default TypingText;
