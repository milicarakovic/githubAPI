import { request } from '@octokit/request';
import { Limit } from '../models/Limit';
import { Repo } from '../models/Repo';
import { User } from '../models/User';

export const baseUrl = 'http://api.github.com';

export async function GetUsers(searchQuery: String): Promise<User[]> {
  const result = await request('GET /search/users', {
    q: `${searchQuery} in:login`,
    page: 1,
    per_page: 20,
  });

  if (result.status === 200) {
    return result.data.items;
  }
  throw new Error('Something went wrong.');
}

export async function GetUser(username: string): Promise<User | null> {
  const result = await fetch(`${baseUrl}/users/${username}`, {
    method: 'GET',
  }).then((res) => res.json());
  if (result.message) {
    throw new Error('You have reached the limit for user information');
  }
  return result;
}

export async function GetRateLimit(): Promise<Limit | null> {
  const result = await request('GET /rate_limit');

  if (result.status === 200) {
    return new Limit(
      result.data.resources.search.limit,
      result.data.resources.search.remaining,
      result.data.resources.core.remaining
    );
  }
  return null;
}

export async function GetReposForUser(
  username: string
): Promise<Repo[] | null> {
  const result = await fetch(`${baseUrl}/users/${username}/repos`, {
    method: 'GET',
  }).then((res) => res.json());
  if (result.message) {
    throw new Error('You have reached the limit for user information');
  }
  return result;
}
