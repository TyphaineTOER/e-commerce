import React, { Component } from 'react';
import { Header, Message, Table } from 'semantic-ui-react';
import { withAuth } from '@okta/okta-react';
import ArticleForm from './ArticleForm';
import IncreaseCountButton from './IncreaseCountButton';

import { API_BASE_URL } from './Config'

export default withAuth(class Articles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: null,
            isLoading: null
        };
        this.onAddition = this.onAddition.bind(this);
        this.onIncrease = this.onIncrease.bind(this);
    }

    onAddition(article) {
        this.setState({
            articles: [...this.state.articles, article]
        })
    }

    onIncrease(data, id) {
        let articles = this.state.articles;
        let article = articles.find(article => article.id === id);
        article.count = data.count;
        this.setState({
            articles: articles
        })
    }

    componentDidMount() {
        this.getArticles();
    }

    async getArticles() {
        if (!this.state.articles) {
            try {
                this.setState({ isLoading: true });
                const accessToken = await this.props.auth.getAccessToken();
                const response = await fetch(API_BASE_URL + '/articles', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const data = await response.json();
                this.setState({ articles: data, isLoading: false});
            } catch (err) {
                this.setState({ isLoading: false });
                console.error(err);
            }
        }
    }

    render() {
        return (
            <div>
                <Header as="h1">My articles</Header>
                {this.state.isLoading && <Message info header="Loading articles..." />}
                {this.state.articles &&
                    <div>
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Bad Puns Count</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.articles.map(
                                    article => 
                                        <tr id={article.id} key={article.id}>
                                            <td>{article.id}</td>
                                            <td>{article.name}</td>
                                            <td>{article.count}</td>
                                            <td>
                                            <IncreaseCountButton onIncrease={this.onIncrease} articleId={article.id} />
                                            </td>
                                        </tr>
                            )}
                            </tbody>
                        </Table>
                        <ArticleForm onAddition={this.onAddition} />
                    </div>
                }
            </div>
        );
    }
});