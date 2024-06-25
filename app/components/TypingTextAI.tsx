'use client'
import React from 'react';
import { TypeAnimation } from 'react-type-animation';


const TypingTextAI: React.FC = () => {
  return (
    <div className="flex font-light mx-2  leading-relaxed">
      <TypeAnimation
        sequence={[
          'AIとチャットができます。メッセージを入力し、Enterキーを押すか、Sendボタンをクリックして送信してください。', 
          "You can chat with the AI. Type your message and press Enter or click the Send button to submit.",
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
