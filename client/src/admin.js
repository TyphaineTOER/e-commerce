import React, { Component } from 'react';
import axios from 'axios';

class admin extends Component {

    constructor() {
        super();

        this.state = {
            token: [],
            users: []
        }
    }

    componentDidMount() {
        const cachedToken = localStorage.getItem('token')
        if (cachedToken) {
            this.setState({ token: JSON.parse(cachedToken) });
        }
        axios.get(`https://#`)
            .then(res => {
                const users = res.data;
                this.setState({ users });
            })
    }

    render() {
        if (this.state.token['token']) {
            this.props.history.push("/#");
        }
        return (
            <div>
                <ul>
                    {this.state.persons.map(users => <li>{users.name}</li>)}
                </ul>
            </div>
        );
    }
}

export default Register;