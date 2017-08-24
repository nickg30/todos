import React, { Component, PropTypes } from 'react';

import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
export default class Task extends Component {
    toggleChecked() {
        // set the checked property to the opposite of its current value
        Tasks.update(this.props.task._id, {
            // set this prop.checked to what ISN'T its current boolean value
            $set: { checked: !this.props.task.checked },
        });
    }

    deleteThisTask() {
        Tasks.remove(this.props.task._id);
    }

    render() {
                // is checked true? if yes = 'checked' otherwise false
        var taskClassName =  this.props.task.checked ? 'checked' : '';

        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask.bind(this)}>&times;
                </button>

                <input
                    type="checkbox"
                    readOnly
                    checked={this.props.task.checked}
                    onClick={this.toggleChecked.bind(this)}
                />

                <span className="text">{this.props.task.text}</span>
            </li>
        );
    }
}

Task.propTypes = {
    // this component gets the task to display through a react prop
    // we can use propTypes to indicate that it is required
    task: PropTypes.object.isRequired,
};