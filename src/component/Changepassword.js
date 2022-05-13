import { logDOM } from '@testing-library/react'
import { getAuth, updatePassword } from 'firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils'
import { fire } from '../firebase'
import history from '../history'


function Changepassword() {

    const [errorone, setErrorone] = useState()
    const [errortwo, setErrortwo] = useState()
    const [clas, setClas] = useState("formthree")
    const re = useRef()
    const pass = useRef()
    useEffect(() => {

        setTimeout(() => setClas("formtwo"), 50)

    }, [])


    const changepasscode = () => {

        if (pass.current.value.length > 5) {

            if (re.current.value == pass.current.value) {
                try {

                    const auth = getAuth();
                    const user = auth.currentUser;
                    updatePassword(user, pass.current.value)
                    console.log(user);

                } catch (err) {

                    console.log(err.code);
                }


            } else {
                setErrortwo("Password did not match")
                setErrorone("")
            }
        }
        else {
            setErrorone("Enter at least 6 characters")
            setErrortwo("")
        }

    }
    const cancel = () => {
        // history.push("/")
        setClas("formthree")
    }

    return ReactDOM.createPortal(

        <div className='portal'>

            <div className={clas}>
                <div className='title'>CHANGE<br /> PASSWORD</div>

                <div>
                    <div>Password</div>
                    <input ref={pass} className="input" type="password" placeholder='********' />
                    <div className={errorone ? 'error' : ""}>{errorone}</div>

                </div>

                <div>
                    <div>Re-enter Password</div>
                    <input ref={re} className="input" type="password" placeholder='********' />
                    <div className={errortwo ? 'error' : ""}>{errortwo}</div>
                </div>

                <div>
                    <button className='login' onClick={e => changepasscode(e)}>SUBMIT</button>
                    <button className='login' onClick={e => cancel(e)}>CANCEL</button>
                </div>
            </div>
        </div>, document.getElementById("portal")

    )
}

export default Changepassword