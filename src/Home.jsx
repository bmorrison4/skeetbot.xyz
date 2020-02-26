import React from "react";
// import DancingBaby from "./imgs/baby.gif";
import "./Home.css";




export default class Home extends React.Component {

    constructor(props = {}) {
        super(props);

        this.props = props

        this.state = {
            stats: {}
        };
    }

    componentDidMount = async () => {
        const axios = require('axios');
        await axios.get('https://skeetbot.xyz/api/stats').then(res => {
            if (res.status === 200) {
                console.log(res.data);
                this.setState({ stats: res.data });
            }
        }).catch(e => {
            console.error(e);
        })
    }



    render = () => {
        const { stats } = this.state;
        return (
            <div className="content" >
                <div className="stats">
                    {stats.users > 0 ?
                        <>
                            <p>Total tracked users: {stats.users}</p>
                            <p>Total tracked IPs: {stats.ips}</p>
                            <p>Total banned users: {stats.username_bans + stats.ip_bans}</p>
                            <p>Total username bans: {stats.username_bans}</p>
                            <p>Total IP bans: {stats.ip_bans}</p>
                            <p>Newest seen: {stats.newest_seen}</p>
                            <p>Newest banned: {stats.newest_banned}</p>
                        </>
                        :
                        <p>Failed to get stats</p>}
                </div>
                {/*<div className="login">
                    <form className="login-form">
                        <p>Username</p>
                        <input type="text" name="username"></input>
                        <p>Passphrase</p>
                        <input type="password" name="password"></input>
                        <button type="submit">Log in</button>
                    </form>
                    </div>*/}
            </div>
        );
    }
}
