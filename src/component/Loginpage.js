import { async } from '@firebase/util'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { fire, login, signup, useAuth } from '../firebase'
import history from '../history'


function Loginpage() {


    const [a, setA] = useState(0)

    const [usererror, setUsererror] = useState()
    const [mailerror, setMailerror] = useState()
    const [passerror, setPasserror] = useState()
    const [confirmerror, setConfirmerror] = useState()
    const [checkbox, setCheckbox] = useState(false)
    const email = useRef()
    const password = useRef()
    const re_enter = useRef()
    const us = useRef()
    const currentUser = useAuth()

    const loginhandle = async (e) => {
        setPasserror("")
        setMailerror("")
        // console.log("loginhandler")
        try {
            await login(email.current.value, password.current.value)
            history.push("/home")

        } catch (error) {


            switch (error.code) {

                case ("auth/internal-error"): {
                    setPasserror("Enter password");
                    break;
                };

                case ("auth/invalid-password"): {
                    setPasserror("Invalid password");
                    break;
                };
                case ("auth/wrong-password"): {
                    setPasserror("wrong password");
                    break;
                };
                case ("auth/invalid-email"): {
                    setMailerror("Invalid email");
                    break;
                };
                case ("auth/user-not-found"): {
                    setMailerror("User not found");
                    break;
                };
                case ("auth/network-request-failed"): {
                    setPasserror("Network request faild");
                    break;
                };
            }
        }
        if (checkbox) {
            document.cookie = `email= ${email.current.value}; path=http://localhost:3000/`
            document.cookie = `password= ${password.current.value}; path=http://localhost:3000/`
        }
        password.current.value = ""
    }



    const signinhandler = async (e) => {
        // console.log("signinhandler")
        // console.log(us.current.value)
        setUsererror("")
        setMailerror("")
        setPasserror("")
        setConfirmerror("")


        if (!us.current.value) {
            setUsererror("Enter user name")
        }

        if (password.current.value == re_enter.current.value) {
            var passcode = password.current.value

        } else {
            setConfirmerror("Password did not match")

        }


        try {
            await signup(email.current.value, passcode)

            history.push("/home")

        } catch (error) {
            console.log(error.code)
            switch (error.code) {

                case ("auth/internal-error"): {
                    setPasserror("Internal error");
                    break;
                };
                case ("auth/invalid-password"): {
                    setPasserror("Invalid password");
                    break;
                };
                case ("auth/invalid-email"): {
                    setMailerror("Invalid email");
                    break;
                };
                case ("auth/email-already-in-use"): {
                    setMailerror("Email already in use");
                    break;
                };
                case ("auth/weak-password"): {
                    setPasserror("Weak password");
                    break;
                };
                case ("auth/weak-password"): {
                    setPasserror("Weak password");
                    break;
                };
                case ("auth/network-request-failed"): {
                    setPasserror("Network request faild");
                    break;
                };


            }
        }

        // fire.database.ref('user').set({ n: us.current.value })
    }

    const formchange = e => {
        setA(1)
        email.current.value = ""
        password.current.value = ""
        // setError('')
    }

    useEffect(() => {

        password.current.value = getCookie('password')
        email.current.value = getCookie('email')

    }, [document.cookie])

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    // console.log(document.cookie);

    const setcookie = () => {

        if (checkbox) {
            setCheckbox(false)
        } else {
            setCheckbox(true)
        }
        console.log(checkbox);

    }

    return (
        <div className='main-wrapper'>

            <div className='signin'>
                New to Page!  <button onClick={e => formchange(e)} className='signinbutton'>SIGN UP</button>
            </div>

            <div className='form'>
                <div className='title'>{(a !== 1) ? 'ADMIN LOGIN' : 'SIGN UP'}</div>


                {(a == 1) ?
                    <div>
                        <div>
                            <div>User Name</div>
                            <input ref={us} className="input" placeholder='Enter Name' />
                            <div className={usererror ? 'error' : ""}>{usererror}</div>
                        </div>
                    </div> : ("")
                }

                <div>
                    <div>E-mail Address</div>
                    <input ref={email} className="input" placeholder='Enter Email-id' />
                    <div className={mailerror ? 'error' : ""}>{mailerror}</div>
                </div>

                <div>
                    <div>Password</div>
                    <input ref={password} className="input" type="password" placeholder='********' />
                    <div className={passerror ? 'error' : ""}>{passerror}</div>

                </div>

                {(a == 1) ?
                    <div>
                        <div>Re-enter Password</div>
                        <input ref={re_enter} className="input" type="password" placeholder='********' />
                        <div className={confirmerror ? 'error' : ""}>{confirmerror}</div>
                    </div> : ("")
                }

                {(a !== 1) ?
                    <div className='extracontent'>
                        <span > <input type="checkbox" className='checkbox' onClick={setcookie} />Remember Me</span>
                        <span > <Link to="/chnage" id='link'>Forget Your Password?</Link> </span>
                    </div> : ("")
                }

                <div>
                    <button className='login' onClick={(a == 0) ? (e) => { loginhandle(e) } : (e) => { signinhandler(e) }}>{(a == 0) ? 'LOGIN' : 'SIGN UP'}</button>
                </div>
            </div>
        </div>
    )
}

export default Loginpage