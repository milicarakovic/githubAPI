import { License } from './License';

export class Repo {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  license: License;

  constructor(
    id: number,
    name: string,
    description: string,
    created_at: Date,
    html_url: string,
    stargazers_count: number,
    watchers_count: number,
    forks_count: number,
    license: License
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.created_at = created_at;
    this.html_url = html_url;
    this.stargazers_count = stargazers_count;
    this.watchers_count = watchers_count;
    this.forks_count = forks_count;
    this.license = license;
  }
}
