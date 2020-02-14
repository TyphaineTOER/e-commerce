import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

import { Container, Menu } from 'semantic-ui-react';

export default withAuth(class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { authenticated: null };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        this.checkAuthentication();
    }

    async componentDidUpdate() {
        this.checkAuthentication();
    }

    async login() {
        this.props.auth.login('/login');
    }

    async register() {
        this.props.auth.register('/register');
    }

    async logout() {
        this.props.auth.logout('/');
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated });
        }
    }

    render() {
        return (
            <div>
                <Menu fixed="top" inverted>
                    <Container>
                        <Menu.Item as="a" header href="/">
                            Home
                        </Menu.Item>
                        {this.state.authenticated === true && <Menu.Item id="article-button" as="a" href="/articles">Article</Menu.Item>}
                        {this.state.authenticated === false && <Menu.Item id="register-button" as="a" href="/register">Register</Menu.Item>}
                        {this.state.authenticated === true && <Menu.Item id="logout-button" as="a" onClick={this.logout}>Logout</Menu.Item>}
                        {this.state.authenticated === false && <Menu.Item id="login-button" href="/login">Login</Menu.Item>}
                    </Container>
                </Menu>
            </div>
        );
    }
});