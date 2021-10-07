import React from 'react';
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import initialization from '../Firebase/firebase.init';
import Logo from '../images/logo-03.svg'
import './Form.css'
import { useState } from 'react/cjs/react.development';

initialization();
const Form = () => {
    const [error, setError] = useState('')
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false)

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();


    const googleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                console.log(user);
            })
            .catch((error) => {
                setError(error.message);

            });
    }

    const gitHubSignIn = () => {
        signInWithPopup(auth, gitHubProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                // ...
            }).catch((error) => {
                setError(error.message);

            });
    }

    const loginWithEmail = e => {
        setUserEmail(e.target.value)
    }
    const handleName = e => {
        setUserName(e.target.value)
    }
    const loginWithPassword = e => {
        setUserPassword(e.target.value)
    }


    const handleSubmit = e => {
        e.preventDefault();
        if (userPassword < 6) {
            setError('Password should be at least 6 character');
            return;
        }
        /* if (!/(?=.* [A - Z].* [A - Z])/.test(userPassword)) {
            setError('Password should contain 2 uppercase')
            return;
        } */
        !isRegister ? createNewUser(userEmail, userPassword) : processLogin(userEmail, userPassword);
    }


    const processLogin = (userEmail, userPassword) => {
        signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then(result => {
                const user = result.user;
                console.log(user);
                setError('')
            })
            .catch(error => {
                setError(error.message);
            });

    }

    const createNewUser = (userEmail, userPassword) => {
        createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then((result) => {
                const user = result.user;
                console.log(user);
                setError('')
                emailVerify()
                displayUserName()
            })
            .catch(error => {
                setError(error.message)
            })
    }

    const emailVerify = () => {
        sendEmailVerification(auth.currentUser)
            .then(result => {
                console.log(result);
            });
    }

    const displayUserName = () => {
        updateProfile(auth.currentUser, {
            displayName: userName
        })
            .then(result => { })

    }

    const restPassword = () => {
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
            })
    }

    const toggleLogin = () => {
        setIsRegister(true)
    }
    const toggleSignup = () => {
        setIsRegister(false)
    }

    return (
        <div className="form">
            <div className="form-container">
                <div className="form-desc">
                    <img src={Logo} alt='logo' />
                    <h4>{!isRegister ? 'Register your account' : 'Login into account'}</h4>
                    <p>{!isRegister ? 'Register a new account in a minute.' : 'your credentials to access your account.'}</p>
                </div>
                <div className="form-inputs">
                    <form onSubmit={handleSubmit}>
                        {!isRegister ?
                            <div>
                                <div className="mb-3">
                                    <input onBlur={handleName} type="text" className="form-control place-icon" placeholder="Your Name" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <input onBlur={loginWithEmail} type="email" className="form-control place-icon" placeholder="Email" aria-describedby="emailHelp" />
                                </div>
                                <div class="mb-3">
                                    <input onBlur={loginWithPassword} type="password" className="form-control place-con" placeholder="Password" />
                                </div>
                            </div>
                            :
                            <div>
                                <div className="mb-3">
                                    <input onBlur={loginWithEmail} type="email" className="form-control place-icon" placeholder="Email" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <input onBlur={loginWithPassword} type="password" className="form-control place-con" placeholder="Password" />
                                </div>
                            </div>
                        }
                        <div className="text-danger">{error}</div>
                        {
                            !isRegister ? <div className="pb-3 text-end d-none">
                                <button className="regular-btn">Forget Password</button>
                            </div>
                                :
                                <div className="pb-3 text-end d-block">
                                    <button onClick={restPassword} className="regular-btn">Forget Password</button>
                                </div>
                        }
                        <button type="submit" className="submit-button">{!isRegister ? 'Register' : 'Login'}</button>
                    </form>

                    <div className="social-login pt-3">
                        <p>{isRegister ? 'or login with' : 'or signup with'}</p>
                        <div className="icon">
                            <button className="facebook-icon"><FaFacebook /></button>
                            <button onClick={gitHubSignIn} className="github-icon"><FaGithub /></button>
                            <button onClick={googleSignIn} className="google-icon"><FaGoogle /></button>
                            <button className="twitter-icon"><FaTwitter /></button>
                        </div>
                    </div>
                    <div className="py-3 register-sec">
                        <span>{isRegister ? "Don't have an account?" : 'Already have an accout?'}</span>
                        {!isRegister ? <button onClick={toggleLogin} className="regular-btn">Login here</button>
                            :
                            <button onClick={toggleSignup} className="regular-btn">Register here</button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;