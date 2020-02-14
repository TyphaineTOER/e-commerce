import React, { Component } from 'react';
import { Button, Form, Message, Table } from 'semantic-ui-react'
import { withAuth } from '@okta/okta-react';
import { sha256} from 'js-sha256';

import { API_BASE_URL } from './Config'

export default withAuth(class Loginform extends Component {

    constructor (props) {
        super(props);
        this.state = {
            mail: '',
            password: '',
            errorMessage: '',
            error: false,
            isLoading: false,
            users: ''
        }
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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


    async onSubmit(e) {
        e.preventDefault();
        this.setState({
            isLoading: true,
            error: false,
            errorMessage: ''
        });

        
        const response = await fetch(API_BASE_URL + '/login', {
            method: 'POST',
            headers: {
                Authorization: `Bearer`,
            },
            body: JSON.stringify({
                "mail": this.state.mail,
                "password": sha256(this.state.password),
            })
        });
        const data = await response.json();

        if (data.errors) {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: data.errors,
            });
        } else {
            this.setState({
                mail: '',
                password: '',
                isLoading: false,
                error: false,
                errorMessage: '',
                users: data
            });
            console.log(this.state.users);
            localStorage.setItem('user', JSON.stringify(this.state.users));
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div>
            <Form error={this.state.error} onSubmit={this.onSubmit}>
                <Form.Field error={this.state.error}>
                    <label>name</label>
                    <input placeholder='enter user mail' value={this.state.mail} onChange={this.handleChangeMail} type="email"/>
                    <input placeholder='enter password' value={this.state.password} onChange={this.handleChangePassword} type="password"/>
                { this.state.error &&
                <Message
                    error
                    header='Error login'
                    content={this.state.errorMessage}
                />
                }
                </Form.Field>
                <Button type='submit' loading={this.state.isLoading}>Login</Button>
            </Form>
            </div>
            
            
        )
    }
});