export interface Messaggio {
  id: number;
  chat_id: string;
  sender: string;
  content: string;
  created_at: string;
  response: number | null;
}

export interface UserReduced {
  nome: string;
  pic: string;
}
