export interface Messaggio {
  id: number;
  chat_id: string;
  sender: string;
  content: string;
  created_at: string;
}

export interface UserReduced {
  nome: string;
  pic: string;
}
