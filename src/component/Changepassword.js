import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { auth, fire } from '../firebase'



function Changepassword(props) {

    const [errorone, setErrorone] = useState()

    const [clas, setClas] = useState("formthree")

    const emailID = useRef()
    useEffect(() => {

        setTimeout(() => setClas("formtwo"), 50)

    }, [])


    const changepasscode = async (e) => {

        if (emailID.current.value) {
            try {
                await sendPasswordResetEmail(auth, emailID.current.value)
                alert("Password reset mail sent, please check your mail")
                props.port("")
            } catch (err) {

                switch (err.code) {

                    case ("auth/internal-error"): {
                        setErrorone("Internal error");
                        break;
                    };
                    case ("auth/invalid-email"): {
                        setErrorone("Invalid email");
                        break;
                    };
                    case ("auth/user-not-found"): {
                        setErrorone("User not found");
                        break;
                    };
                    case ("auth/network-request-failed"): {
                        setErrorone("Network request faild");
                        break;
                    };
                }

            }

        }
        else { setErrorone("Enter valid Email-ID") }


    }

    const cancel = () => {

        setClas("formthree")
        props.port("")
    }

    return ReactDOM.createPortal(

        <div className='portal'>

            <div className={clas}>
                <div className='title'>CHANGE<br /> PASSWORD</div>

                <div>
                    <div>Email</div>
                    <input ref={emailID} className="input" type="text" placeholder='Enter Email-Id' />
                    <div className={errorone ? 'error' : ""}>{errorone}</div>

                </div>


                <div>
                    <button className='login' onClick={e => changepasscode(e)}>SUBMIT</button>
                    <button className='login' onClick={e => cancel(e)}>CANCEL</button>
                </div>
            </div>
        </div>, document.getElementById("modal")

    )
}

export default Changepassword