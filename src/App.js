import "./style.css"
import React from 'react'
import { Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './component/Home'
import Loginpage from './component/Loginpage'
import { Router } from "react-router-dom"
import history from "./history"
import Changepassword from "./component/Changepassword"


function App() {
    return (


        <BrowserRouter>

            <Router history={history}>
                <Route exact path="/" component={Loginpage} />
                <Route exact path="/Home" component={Home} />

            </Router>
        </BrowserRouter>

    )
}

export default App