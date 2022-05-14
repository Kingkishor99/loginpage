import { deleteUser } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth, logout, useAuth } from '../firebase'
import history from '../history'

function Home() {


    const user = auth.currentUser


    const [a, setA] = useState("tost")


    useEffect(() => {
        if (user) {
            setTimeout(() => setA("tosted"), 200)
            setTimeout(() => setA("tost"), 5000)
            // console.log(user);
        } else {
            console.log("no user");
        }
    }, [])





    const exit = (e) => {
        logout(user)
        console.log("logged out")
        history.push("/")

    }

    const remove = async (e) => {
        if (window.confirm(`Do you really want to delete account!\n "${user.email}" `) == true) {
            console.log(user);
            try {
                await deleteUser(user)
                alert("Account Deleted")
                history.push("/")
            }
            catch (err) {
                alert(err.code)
            }
        }

    }

    console.log(user);
    return (
        <div className='home' >
            {user.displayName ? (<div className='displayname' >{`Hello ${user.displayName}`}</div>) : ("")}
            {user ? (<button onClick={e => exit(e)} className='logout'>Logout</button>) : ("")}
            {user ? (<button onClick={e => remove(e)} className='remove'>Delete Account</button>) : ("")}
            <div className={a}>
                Login Successful...
            </div>

        </div>
    )
}

export default Home