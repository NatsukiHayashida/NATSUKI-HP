'use client'
import React from 'react';
import { TypeAnimation } from 'react-type-animation';


const TypingTextAI: React.FC = () => {
  return (
    <div className="flex font-light mx-2 mb-2 leading-relaxed">
      <TypeAnimation
        sequence={[
        'AIとチャットができます。メッセージを入力し、Enterキーを押すか、Sendボタンをクリックして送信してください。', 
          1000, // 1秒待機
        ]}
        speed={50}
        style={{ whiteSpace: 'pre-line', display: 'block' }}
        repeat={0}
        
      />
    </div>
  );
};

export default TypingTextAI;
