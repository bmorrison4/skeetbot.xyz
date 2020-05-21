import React, { Component } from "react";
import axios from 'axios';
import "./Api.css";

const url = "https://skeetbot.xyz/api";

export default class API extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
            users: [],
            key: localStorage.getItem("api_key") || "",
            targetUser: ""
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.name === "key") {
            localStorage.setItem("api_key", e.target.value);
        }
    }

    getUser = () => {
        axios.get(`${url}/users/${this.state.targetUser}`, {
            headers: { "Authorization": `Bearer ${this.state.key}` }
        }).then(res => {
            this.setState({ user: res.data[0], users: [] });
        }).catch(err => {
            console.error(err);
        })
    }

    getAllUsers = () => {
        axios.get(`${url}/users`, {
            headers: { "Authorization": `Bearer ${this.state.key}` }
        }).then(res => {
            this.setState({ users: res.data, user: {} })
        }).catch(err => {
            console.error(err);
        })
    }

    getAllBanned = () => {
        axios.get(`${url}/banned`, {
            headers: { "Authorization": `Bearer ${this.state.key}` }
        }).then(res => {
            this.setState({ user: {}, users: res.data });
        }).catch(err => {
            console.error(err);
        });
    }

    getAllUserBanned = () => {
        axios.get(`${url}/bannedusers`, {
            headers: { "Authorization": `Bearer ${this.state.key}` }
        }).then(res => {
            this.setState({ user: {}, users: res.data });
        }).catch(err => {
            console.error(err);
        });
    }

    getAllIpBanned = () => {
        axios.get(`${url}/bannedips`, {
            headers: { "Authorization": `Bearer ${this.state.key}` }
        }).then(res => {
            this.setState({ user: {}, users: res.data });
        }).catch(err => {
            console.error(err);
        });
    }

    renderUser = () => {
        return (
            <>
                <table className="userTable">
                    <tr>
                        <th>Username</th>
                        <td>{this.state.user.username}</td>
                    </tr>
                    <tr>
                        <th>Cores</th>
                        <td>{this.state.user.cores}</td>
                    </tr>
                    <tr>
                        <th>GPU</th>
                        <td>{this.state.user.gpu}</td>
                    </tr>
                    <tr>
                        <th>User-Agent</th>
                        <td>{this.state.user.useragent.map((ua, idx) => {
                            return <React.Fragment key={idx}>{ua}<br /></React.Fragment>
                        })}</td>
                    </tr>
                    <tr>
                        <th>IPs</th>
                        <td>{this.state.user.ips.map((ip, idx) => {
                            return <React.Fragment key={idx}>{ip}<br /></React.Fragment>
                        })}</td>
                    </tr>
                    <tr>
                        <th>Username Banned</th>
                        <td>{this.state.user.username_banned.toString()}</td>
                    </tr>
                    <tr>
                        <th>Last Seen</th>
                        <td>{this.state.user.last_seen}</td>
                    </tr>
                </table>
            </>
        )
    }

    renderAllUsers = () => {
        return (
            <table className="userTable">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Cores</th>
                        <th>GPU</th>
                        <th>User-Agent</th>
                        <th>IPs</th>
                        <th>Username Banned</th>
                        <th>Last Seen</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>{value.username}</td>
                                <td>{value.cores}</td>
                                <td>{value.gpu}</td>
                                <td>{value.useragent.map((ua, idx) => {
                                    return <React.Fragment key={idx}>{ua}<br /></React.Fragment>
                                })}</td>
                                <td>{value.ips.map((ip, idx) => {
                                    return <React.Fragment key={idx}>{ip}<br /></React.Fragment>
                                })}</td>
                                <td>{value.username_banned.toString()}</td>
                                <td>{value.last_seen}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div>
                <div className="buttonTab">
                    <button onClick={this.getAllUsers}>Get all users</button>
                    <button onClick={this.getUser}>Lookup user</button>
                    <button onClick={this.getAllBanned}>Get all banned</button>
                    <button onClick={this.getAllIpBanned}>Get all IP Banned</button>
                    <button onClick={this.getAllUserBanned}>Get all username banned</button>
                </div>
                <div className="inputTab">
                    <div className="KeyDiv">
                        <label>Key </label>
                        <input type="password" name="key" className="keyInput" value={this.state.key} onChange={(e) => this.handleChange(e)}></input>
                    </div>
                    <div className="UserDiv">
                        <label>Target User </label>
                        <input type="text" name="targetUser" className="targetUserInput" value={this.state.targetUser} onChange={(e) => this.handleChange(e)}></input>
                    </div>
                </div>
                <div className="apiResponse">
                    {(this.state.user.username !== undefined ? this.renderUser() : <></>)}
                    {(this.state.users.length > 0 ? this.renderAllUsers() : <></>)}
                </div>
            </div>
        )
    }
}