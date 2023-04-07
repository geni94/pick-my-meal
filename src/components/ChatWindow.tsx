import { useState, type KeyboardEventHandler } from 'react';
interface PropTypes {
  chatLog: {
    type: string;
    text: string;
  }[];
  sendNewMessage: (message: string) => void;
}

const ChatWindowComponent = ({ chatLog, sendNewMessage }: PropTypes) => {
  const [inputText, setInputText] = useState('');
  const [ownChatLog, setChatLog] = useState(chatLog);

  // const handleInputKeyDown = (event: KeyboardEventHandler<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     const message = { type: 'user', text: event.target.value };
  //     setChatLog((prevChatLog) => [...prevChatLog, message]);
  //     setInputText('');
  //     // TODO: Send message to the chatbot
  //   }
  // };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="flex-1 p-4 overflow-y-auto">
        {chatLog.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'bot' ? 'justify-start' : 'justify-end'} mb-4`}>
            <div
              className={`px-4 py-2 rounded-lg ${message.type === 'bot' ? 'bg-violet-500' : 'bg-blue-500'} text-sm max-w-[50%] break-words`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex-none p-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type your message here"
            className="flex-1 py-2 px-4 rounded-full bg-gray-200"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
          />
          <button
            className="ml-4 px-4 py-2 rounded-full bg-blue-500 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!inputText}
            onClick={() => {
              const message = { type: 'user', text: inputText };
              setChatLog((prevChatLog) => [...prevChatLog, message]);
              setInputText('');
              // TODO: Send message to the chatbot
              sendNewMessage(ownChatLog.map((message) => message.text).join(' '));
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindowComponent;
