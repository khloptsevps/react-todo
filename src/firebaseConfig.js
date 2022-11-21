import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const { REACT_APP_API_KEY } = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: 'react-todo-e86b0.firebaseapp.com',
  projectId: 'react-todo-e86b0',
  storageBucket: 'react-todo-e86b0.appspot.com',
  messagingSenderId: '331142264747',
  appId: '1:331142264747:web:65eba9e4397c10d4d104ee',
  measurementId: 'G-4HTXN5PGDP',
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export default db;
