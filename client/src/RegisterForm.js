import React, { Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react'
import { withAuth } from '@okta/okta-react';
import { sha256} from 'js-sha256';

import { API_BASE_URL } from './Config'

export default withAuth(class RegisterForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            name: '',
            mail: '',
            password: '',
            password2: '',
            errorMessage: '',
            error: false,
            isLoading: false
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePassword2 = this.handleChangePassword2.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChangeName(e) {
        this.setState({
            name: e.target.value,
        })
    }
    handleChangeMail(e) {
        this.setState({
            mail: e.target.value,
        })
    }
    handleChangePassword(e) {
        this.setState({
            password: e.target.value,
        })
    }

    handleChangePassword2(e) {
        this.setState({
            password2: e.target.value,
        })
    }

    async onSubmit(e) {
        e.preventDefault();
        this.setState({
            isLoading: true,
            error: false,
            errorMessage: ''
        });

        const response = await fetch(API_BASE_URL + '/users', {
            method: 'POST',
            headers: {
                Authorization: `Bearer`,
            },
            body: JSON.stringify({
                "name": this.state.name,
                "mail": this.state.mail,
                "password": sha256(this.state.password),
                "password2": sha256(this.state.password2),
                "role": 0
            })
        });
        const data = await response.json();

        if (data.errors) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: data.errors
            });
        } else {
            this.setState({
                title: '',
                mail: '',
                password: '',
                password2: '',
                isLoading: false,
                error: false,
                errorMessage: '',
                users: data
            });
            localStorage.setItem('user', JSON.stringify(this.state.users));
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <Form error={this.state.error} onSubmit={this.onSubmit}>
                <Form.Field error={this.state.error}>
                    <label>name</label>
                    <input placeholder='enter user name' value={this.state.name} onChange={this.handleChangeName}/>
                    <input placeholder='enter user mail' value={this.state.mail} onChange={this.handleChangeMail} type="email"/>
                    <input placeholder='enter password' value={this.state.password} onChange={this.handleChangePassword} type="password"/>
                    <input placeholder='confirm password' value={this.state.password2} onChange={this.handleChangePassword2} type="password"/>
                { this.state.error &&
                <Message
                    error
                    header='Error creating user'
                    content={this.state.errorMessage}
                />
                }
                </Form.Field>
                <Button type='submit' loading={this.state.isLoading}>Register</Button>
            </Form>
        )
    }
});