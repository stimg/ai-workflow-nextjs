'use client';

import {useChat} from '@ai-sdk/react';
import {MessageCircle, Send, Sparkles, UserCircle} from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';

export default function Chat() {
    const {messages, status, sendMessage} = useChat({
        api: '/api/chat',
    });

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background p-8">
            {/* Chat Container - 70% of viewport */}
            <div className="flex flex-col h-[70vh] w-[70vw] border border-border rounded-xl shadow-lg bg-zinc-800">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <MessageCircle className="w-12 h-12 mb-4 text-muted-foreground"/>
                            <h2 className="text-2xl font-semibold mb-2">Start a conversation</h2>
                            <p className="text-muted-foreground">Ask me anything!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-3 items-start ${
                                        message.role === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    {/* Avatar - left side for assistant */}
                                    {message.role === 'assistant' && (
                                        <Avatar.Root className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground">
                                            <Avatar.Fallback>
                                                <Sparkles className="w-5 h-5"/>
                                            </Avatar.Fallback>
                                        </Avatar.Root>
                                    )}

                                    {/* Message Box - 80% of chat width */}
                                    <div
                                        className={`max-w-[80%] rounded-lg px-3 py-2 ${
                                            message.role === 'user'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-zinc-700 text-foreground'
                                        }`}
                                    >
                                        {message.parts
                                            .filter((part) => part.type === 'text')
                                            .map((part, index) => (
                                                <div key={index} className="whitespace-pre-wrap text-sm leading-relaxed">
                                                    {part.text}
                                                </div>
                                            ))}
                                    </div>

                                    {/* Avatar - right side for user */}
                                    {message.role === 'user' && (
                                        <Avatar.Root className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-blue-600 text-white">
                                            <Avatar.Fallback>
                                                <UserCircle className="w-5 h-5"/>
                                            </Avatar.Fallback>
                                        </Avatar.Root>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="border-t border-border p-4">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const text = formData.get('message') as string;
                            if (text.trim()) {
                                sendMessage({text});
                                e.currentTarget.reset();
                            }
                        }}
                        className="flex gap-2"
                    >
                        <input
                            name="message"
                            type="text"
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-blue-400"
                            disabled={status === 'streaming'}
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            disabled={status === 'streaming'}
                            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
    </div>
  );
}
