import { async } from '@firebase/util'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { fire, login, signup, useAuth } from '../firebase'
import history from '../history'


function Loginpage() {


    const [a, setA] = useState(0)
    const [error, setError] = useState(true)
    const email = useRef()
    const password = useRef()
    const re_enter = useRef()
    const user = useRef()
    const currentUser = useAuth()

    const loginhandle = async (e) => {
        // console.log("loginhandler")
        try {
            await login(email.current.value, password.current.value)
            history.push("/home")
        } catch {
            setError("Failed to Login")

        }

        password.current.value = ""
    }



    const signinhandler = async (e) => {
        // console.log("signinhandler")
        if (password.current.value == re_enter.current.value) {
            var passcode = password.current.value
        } else {
            setError("Password did not match")
        }

        try {
            await signup(email.current.value, passcode)
            history.push("/home")
        } catch {
            setError("Failed to Sign Up")
        }
        document.querySelector(".input").value = ""
        re_enter.current.value = ""
        password.current.value = ""
    }

    const formchange = e => {
        setA(1)
        email.current.value = ""
        password.current.value = ""
        setError('')
    }

    useEffect(() => {

        var o = getCookie('email')
        var p = getCookie('password')

        password.current.value = p
        email.current.value = o


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
        let a = email.current.value
        let b = password.current.value
        document.cookie = `email= ${a}; path=http://localhost:3000/`
        document.cookie = `password= ${b}; path=http://localhost:3000/`
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
                            <input ref={user} className="input" placeholder='Enter Name' />
                        </div>
                    </div> : ("")
                }



                <div>
                    <div>E-mail Address</div>
                    <input ref={email} className="input" placeholder='Enter Email-id' />
                </div>

                <div>
                    <div>Password</div>
                    <input ref={password} className="input" type="password" placeholder='********' />

                </div>


                {(a == 1) ?
                    <div>
                        <div>Re-enter Password</div>
                        <input ref={re_enter} className="input" type="password" placeholder='********' />
                    </div> : ("")
                }

                {(a !== 1) ?
                    <div className='extracontent'>
                        <span > <input type="checkbox" className='checkbox' onClick={setcookie} />Remember Me</span>
                        <span > <Link to="/home" id='link'>Forget Your Password?</Link> </span>
                    </div> : ("")
                }

                <div>
                    <div className='error'>{error}</div>
                    <button className='login' onClick={(a == 0) ? (e) => { loginhandle(e) } : (e) => { signinhandler(e) }}>{(a == 0) ? 'LOGIN' : 'SIGN UP'}</button>
                </div>
            </div>
        </div>
    )
}

export default Loginpage