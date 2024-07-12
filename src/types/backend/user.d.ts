export interface User {
  id: string;
  username: string;
  mmr: number
  profilePicture: string ;
  type: 'Guest' | 'NotGuest'
}

