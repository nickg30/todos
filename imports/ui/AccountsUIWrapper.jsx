import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {
    componentDidMount() {
        // use meteor blaze to render login buttons
        this.view = Blaze.render(Template._loginButtons,
        ReactDOM.findDOMNode(this.refs.container));
    }

    componentWillUnmount() {
        // clean up blaze view
        Blaze.remove(this.view);
    }

    render() {
        // Just render the placeholder container that will be filled in
        return <span ref="container" />;
    }
}