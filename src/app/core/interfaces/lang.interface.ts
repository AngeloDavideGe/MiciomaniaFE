export interface ILang {
  Home: {
    Notifiche: string;
    Impostazioni: string;
    AccountUtente: string;
    AggiungiAccount: string;
    EsciAccount: string;
    Benvenuti: string;
    Descrizione: string;
    CardsTitle: string;
    Toggle: {
      Account: string;
      Profilo: string;
      Auth: string;
      Esci: string;
      Login: string;
      Lingua: string;
      LogoutTitolo: string;
      LogoutMessaggio: string;
    };
    AccountMenuTitolo: string;
    LogoutAllTitolo: string;
    LogoutAllMessaggio: string;
    Social: {
      Titolo: string;
      Descrizione: string;
    };
    Footer: {
      LinkUtili: string;
      Info: string;
      Supporto: string;
    };
    Card1: {
      titolo: string;
      descrizione: string;
      bottone: string;
    };
    Card2: {
      titolo: string;
      descrizione: string;
      bottone: string;
    };
    Card3: {
      titolo: string;
      descrizione: string;
      bottone: string;
    };
    Card4: {
      titolo: string;
      descrizione: string;
      bottone: string;
    };
  };
  Feature: {
    Navbar: {
      Home: string;
      Manga: string;
      Canzoni: string;
      Giochi: string;
      Post: string;
      Classifica: string;
    };
  };
  Canzoni: {
    Titolo: string;
    Descrizione: string;
    CercaPlaceholder: string;
    CategorieTitolo: string;
    BottoneAscolta: string;
    Toolbar: {
      AlbumDisponibili: string;
      CanzoniTotali: string;
    };
    Categorie: {
      Tutte: string;
      Preferite: string;
    };
  };
  Manga: {
    Titolo: string;
    Descrizione: string;
    CercaPlaceholder: string;
    CategorieTitolo: string;
    SottocategorieTitolo: string;
    BottoneLeggi: string;
    Toolbar: {
      MangaDisponibili: string;
      CapitoliTotali: string;
    };
    Tabs: {
      Tutti: string;
      InCorso: string;
      Completati: string;
    };
    Categorie: {
      Ufficiali: string;
      Miciomania: string;
    };
    Sottocategorie: {
      Tutti: string;
      Preferiti: string;
    };
  };
  Classifica: {
    Titolo: string;
    Descrizione: string;
    Tabelle: {
      Giocatori: string;
      Squadre: string;
    };
    Tabs: {
      Giocatori: string;
      Squadre: string;
    };
    Colonne: {
      Posizione: string;
      Nome: string;
      Squadra: string;
      Punti: string;
    };
  };
  Profilo: {
    AvatarAlt: string;
    OnlineAriaLabel: string;
    ProfiloVerificatoAriaLabel: string;
    ModificaProfilo: string;
    IscrittoDa: string;
    Post: string;
    Punti: string;
    AttivitaRecente: string;
    CondivisiCommunity: string;
    NessunaFoto: string;
    FotoCompariranno: string;
    Modale: { Titolo: string; Sottotitolo: string };
    Tabs: { PostTesto: string; PostFoto: string };
    EditUser: {
      Sezioni: {
        Account: string;
        Profilo: string;
        Social: string;
        Iscrizione: string;
      };
      Campi: {
        IdUtente: string;
        Nome: string;
        Email: string;
        Password: string;
        ConfermaPassword: string;
        Compleanno: string;
        Biografia: string;
        Piattaforma: string;
        LinkUsername: string;
        Squadra: string;
        Regione: string;
        Provincia: string;
        Punteggio: string;
      };
      Errori: {
        Nome: string;
        Email: string;
        Password: string;
        ConfermaPassword: string;
        Piattaforma: string;
        LinkUsername: string;
      };
    };
  };
  Login: {
    Titolo: string;
    Descrizione: string;
    NessunAccount: string;
    Registrati: string;
    AccessoOspite: string;
    Entra: string;
    Form: {
      Email: string;
      Password: string;
      ErroreEmail: string;
      ErrorePassword: string;
    };
  };
  Register: {
    Titolo: string;
    Descrizione: string;
    AccountEsistente: string;
    Accedi: string;
    AccessoOspite: string;
    Entra: string;
    Form: {
      Nickname: string;
      NomeCompleto: string;
      Email: string;
      Password: string;
      ErroreNickname: string;
      ErroreNomeCompleto: string;
      ErroreEmail: string;
      ErrorePassword: string;
    };
  };
}
