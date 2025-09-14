
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export interface ChatHistoryItem {
  id: string;
  title: string;
}

export type Language = 'English' | 'Hindi' | 'Tamil' | 'Telugu';