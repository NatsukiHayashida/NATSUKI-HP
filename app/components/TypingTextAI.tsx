'use client'
import React from 'react';
import { TypeAnimation } from 'react-type-animation';


const TypingTextAI: React.FC = () => {
  return (
    <div className="flex font-light mx-2 text-cyan-300 leading-relaxed">
      <TypeAnimation
        sequence={[
          "You can chat with the AI. Type your message and press Enter or click the Send button to submit.",2000,//2秒待機
          'AIとチャットができます。メッセージを入力し、Enterキーを押すか、Sendボタンをクリックして送信してください。', 
          3000, // 3秒待機
        ]}
        speed={60}
        style={{ whiteSpace: 'pre-line', display: 'block' }}
        repeat={0}
        
      />
    </div>
  );
};

export default TypingTextAI;
