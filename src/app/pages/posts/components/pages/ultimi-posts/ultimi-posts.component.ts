import { Component } from '@angular/core';
import { TweetAll } from '../../shared/post.interface';
import { CardPostComponent } from './components/card-post.component';
import { NoPostComponent } from './components/no-post.component';

@Component({
  standalone: true,
  selector: 'app-ultimi-posts',
  imports: [CardPostComponent, NoPostComponent],
  templateUrl: './ultimi-posts.component.html',
})
export class UltimiPostsComponent {
  public posts: TweetAll[] = [
    {
      id: 1,
      testo: 'Tramonto mozzafiato 🌅 #relax #nature',
      dataCreazione: new Date(),
      idUtente: 101,
      utenteNome: 'giulia98',
      utenteAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      immaginePost:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    },
    {
      id: 2,
      testo: 'Allenamento duro ma soddisfatto 💪 #gymtime',
      dataCreazione: new Date(),
      idUtente: 102,
      utenteNome: 'marco_fit',
      utenteAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      immaginePost:
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b',
    },
    {
      id: 3,
      testo: 'Colazione perfetta per iniziare la giornata 🥐☕',
      dataCreazione: new Date(),
      idUtente: 103,
      utenteNome: 'sofia_food',
      utenteAvatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      immaginePost:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    },
  ];

  public oldPosts: TweetAll[] = [
    {
      id: 1,
      testo: 'Tramonto mozzafiato 🌅 #relax #nature',
      dataCreazione: new Date(),
      idUtente: 101,
      utenteNome: 'giulia98',
      utenteAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      immaginePost:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    },
    {
      id: 2,
      testo: 'Allenamento duro ma soddisfatto 💪 #gymtime',
      dataCreazione: new Date(),
      idUtente: 102,
      utenteNome: 'marco_fit',
      utenteAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      immaginePost:
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b',
    },
    {
      id: 3,
      testo: 'Colazione perfetta per iniziare la giornata 🥐☕',
      dataCreazione: new Date(),
      idUtente: 103,
      utenteNome: 'sofia_food',
      utenteAvatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      immaginePost:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    },
  ];
}
