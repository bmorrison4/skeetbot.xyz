import React from "react";
import { Route, Switch } from 'react-router-dom';
import Home from "./Home";
import Api from "./Api";
import Wink from "./imgs/wink.gif";
import "./App.css";



function App() {
    return (
        <>
            <div className="body">
                <div className="header">
                    <h1>SkeetBot.XYZ</h1>
                </div>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/lookup" component={Api} />
                </Switch>
            </div>
            <footer>
                <div id="sfcty58u6g1kjrhrtxqn9y96dtzm67hthlj" className="counter">
                    <p>© 1996-2020 Brooke Morrison | This site is
                        optimized for Netscape Navigator 1.4 in 800x600 16 bit
                        color mode <img src={Wink} className="wink" alt="disturbing wink gif" /></p>
                </div>
            </footer>
        </>
    )
}

export default App;
