export class User {
  id: number;
  login: string;
  avatar_url: string;
  bio: string;

  constructor(id: number, login: string, avatar_url: string, bio: string) {
    this.id = id;
    this.login = login;
    this.avatar_url = avatar_url;
    this.bio = bio;
  }
}
