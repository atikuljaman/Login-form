import './App.css';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import initialization from './Firebase/firebase.init';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom/cjs/react-dom.development';
import Form from './Form/Form';

initialization();

function App() {
  /* const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [error, setError] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const auth = getAuth();
  const handleEmail = e => {
    setUserEmail(e.target.value)
  }

  const handlePassword = e => {
    setUserPassword(e.target.value)
  }

  const toggleButton = e => {
    setIsLogin(e.target.checked)
  }

  const handleButton = e => {
    e.preventDefault()
    if (userPassword.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }
    else if (!/[A - Z].* [A - Z]/.test(userPassword)) {
      setError('Password should be contain at least 2 uppercase character');
      return;
    }

    isLogin ? processLogin(userEmail, userPassword) : createNewUser(userEmail, userPassword)
  }

  const createNewUser = (userEmail, userPassword) => {
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((result) => {
        // Signed in 
        const user = result.user;
        console.log(user);
        setError('')
      })
      .catch(error =>
        setError(error.message)
      )
  }

  const processLogin = (userEmail, userPassword) => {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((result) => {
        // Signed in 
        const user = result.user;
        console.log(user);
        setError('')
      }).catch(error =>
        setError(error.message)
      )
  } */
  return (
    <div>
      <Form />
    </div>
  );
}

export default App;
