import React from 'react'
import { Link } from 'react-router-dom'
import history from '../history'

function Loginpage() {
    const login = (e) => {

        history.push('/home')
        console.log("clicked")
    }
    return (
        <div className='main-wrapper'>

            <div className='signin'>
                New to Page!  <button className='signinbutton'>SIGN UP</button>
            </div>

            <div className='form'>
                <div className='title'>ADMIN LOGIN</div>

                <div>
                    <div>E-mail Address</div>
                    <input className="input" placeholder='Enter Email-id' />
                </div>

                <div>
                    <div>Password</div>
                    <input className="input" type="password" placeholder='********' />
                </div>
                <div className='extracontent'>
                    <span > <input type="checkbox" className='checkbox' />Remember Me</span>
                    <span > <Link to="/home" id='link'>Forget Your Password?</Link> </span>
                </div>
                <div><button className='login' onClick={(e) => { login(e) }}>LOGIN</button></div>
            </div>
        </div>
    )
}

export default Loginpage