import React, { useEffect, useState } from 'react'
import { logout, useAuth } from '../firebase'
import history from '../history'

function Home() {

    const currentUser = useAuth()

    const [a, setA] = useState("tost")


    useEffect(() => {


        setTimeout(() => setA("tosted"), 200)
        setTimeout(() => setA("tost"), 5000)


    }, [currentUser])


    const exit = (e) => {
        logout()
        console.log("logged out")
        history.push("/")

    }


    return (
        <div className='home' >
            {currentUser ? (<button onClick={e => exit(e)} className='logout'>Logout</button>) : ("")}
            <div className={a}>
                Login Successful...
            </div>

        </div>
    )
}

export default Home