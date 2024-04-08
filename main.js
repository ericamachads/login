import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

import { app } from './config-firebase.js';
const auth = getAuth(app);

const signupButton = document.getElementById('signup');
const signinButton = document.getElementById('signin');
const forgotButton = document.getElementById('forgotPass');

const signup = (e) => {
  e.preventDefault();
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Usuário cadastrado:', user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Erro ao cadastrar:', errorCode, errorMessage);
    });
  email.value = '';
  password.value = '';
};

const signin = (e) => {
  e.preventDefault();
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Usuário logado:', user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Erro ao fazer login:', errorCode, errorMessage);
    });
};

const forgot = (e) => {
  e.preventDefault();
  const email = document.getElementById('email');
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      console.log('Email de recuperação enviado com sucesso.');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(
        'Erro ao enviar email de recuperação:',
        errorCode,
        errorMessage,
      );
    });
};

signupButton.addEventListener('click', signup);
signinButton.addEventListener('click', signin);
forgotButton.addEventListener('click', forgot);
