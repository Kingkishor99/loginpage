import React, { useEffect, memo, useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {

    const [a, setA] = useState("tost")

    useEffect(() => {
        setTimeout(() => setA("tosted"), 1000)
        setTimeout(() => setA("tost"), 5000)

    }, [])


    console.log(a)
    return (
        <div>
            <div className={a}>
                Login Successful...
            </div>
            <Link to="/">back</Link>
        </div>
    )
}

export default memo(Home)