import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class Task extends Component {
    render() {
        return (
            <li>{this.props.task.text}<span className="author">{this.props.task.author}</span></li>
        );
    }
}

Task.propTypes = {
    // this component gets the task to display through a react prop
    // we can use propTypes to indicate that it is required
    task: PropTypes.object.isRequired,
};