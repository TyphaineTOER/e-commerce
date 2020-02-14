import React, { Component } from 'react';
import { Header, Message, Table } from 'semantic-ui-react';
import { withAuth } from '@okta/okta-react';

import { API_BASE_URL } from './Config'

export default withAuth(class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null,
            isLoading: null
        };
        this.onAddition = this.onAddition.bind(this);
    }

    componentDidMount() {
        this.getusers();
    }

    onAddition(user) {
        this.setState({
            users: [...this.state.users, user]
        })
    }

    async getusers() {
        if (!this.state.users) {
            try {
                this.setState({ isLoading: true });
                const accessToken = await this.props.auth.getAccessToken();
                const response = await fetch(API_BASE_URL + '/users', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();
                this.setState({ users: data, isLoading: false });
            } catch (err) {
                this.setState({ isLoading: false });
                console.error(err);
            }
        }
    }

    render() {
        return (
            <div>
                <Header as="h1">My users</Header>
                {this.state.isLoading && <Message info header="Loading users..." />}
                {this.state.users &&
                    <div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>name</th>
                                    <th>mail</th>
                                    <th>password</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users.map(
                                    user =>
                                        <tr id={user.id} key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.mail}</td>
                                            <td>{user.password}</td>
                                            <td>
                                                Increase Count button
                                            </td>
                                        </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                }
            </div>
        );
    }
});