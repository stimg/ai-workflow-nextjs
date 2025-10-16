'use client';

import {useChat} from '@ai-sdk/react';
import {MessageCircle, Sparkles, UserCircle} from 'lucide-react';
import {Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton,} from '@/components/ai-elements/conversation';
import {Message, MessageAvatar, MessageContent} from '@/components/ai-elements/message';
import {Response} from '@/components/ai-elements/response';
import {PromptInput, PromptInputSubmit, PromptInputTextarea} from '@/components/ai-elements/prompt-input';
import type {ReactNode} from 'react';

export default function Chat() {
    const {messages, status, sendMessage} = useChat({
        api: '/api/chat',
    });

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background p-8">
            {/* Chat Container - 70% of viewport */}
            <div className="flex flex-col h-[70vh] w-[70vw] rounded-xl shadow-lg overflow-hidden border-2 border-gray-700">
                <Conversation className="flex-1">
                    <ConversationContent>
                        {messages.length === 0 ? (
                            <ConversationEmptyState
                                title="Start a conversation"
                                description="Ask me anything!"
                                icon={<MessageCircle className="size-8"/>}
                            />
                        ) : (
                            messages.map((message) => {
                                // Extract text from parts
                                const textContent = message.parts
                                    .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
                                    .map((part) => part.text)
                                    .join('');

                                // Create avatar icon based on role
                                const avatarIcon: ReactNode = message.role === 'user' ? (
                                    <UserCircle className="w-5 h-5"/>
                                ) : (
                                    <Sparkles className="w-5 h-5"/>
                                );

                                return (
                                    <Message key={message.id} from={message.role}>
                                        <MessageContent
                                            variant="contained"
                                            className={message.role === 'user' ? 'bg-blue-500 text-white' : ''}
                                        >
                                            <Response>{textContent}</Response>
                                        </MessageContent>
                                        <MessageAvatar
                                            name={message.role === 'user' ? 'You' : 'AI'}
                                            className={message.role === 'user' ? 'bg-blue-400 text-white' : ''}
                                        >
                                            {avatarIcon}
                                        </MessageAvatar>
                                    </Message>
                                );
                            })
                        )}
                    </ConversationContent>
                    <ConversationScrollButton/>
                </Conversation>

                {/* Input Area */}
                <div className="border-t-2 border-gray-700 p-4 bg-card">
                    <PromptInput
                        onSubmit={async (message) => {
                            await sendMessage({
                                text: message.text || '',
                            });
                        }}
                    >
                        <PromptInputTextarea
                            placeholder="Type your message..."
                            className="min-h-[48px] bg-background border-2 border-gray-600 focus:ring-blue-400 focus:border-blue-400"
                            disabled={status === 'streaming'}
                        />
                        <PromptInputSubmit
                            status={status}
                            className="bg-blue-500 text-white hover:bg-blue-600"
                        >
                            {status === 'streaming' ? 'Sending...' : 'Send'}
                        </PromptInputSubmit>
                    </PromptInput>
                </div>
            </div>
    </div>
  );
}
