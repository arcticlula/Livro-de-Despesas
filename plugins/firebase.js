import { Database } from 'firebase-firestore-lite';
import Auth from 'firebase-auth-lite';

// Please read the docs of the Auth library for further instructions
// of all of the Auth features.
export const auth = new Auth({
  apiKey: 'AIzaSyBVv-6F716wOlHpjNQ6u-Pw7A9kqLp77ZE',
  redirectUri: 'http://localhost:3000/auth'
  // redirectUri: 'https://livro-despesas.web.app/auth'
});

// Now pass the auth instance as well as the projectId.
export const db = new Database({ projectId: 'livro-despesas', auth });
// export const increment = new Transform('increment', 1);
