import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
// import mongo collection
import { Tasks } from '../api/tasks.js';
// import single task definition
import Task from './Task.jsx';
// get accountsUIWrapper
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents whole app
class App extends Component {

    constructor(props) {
        // makes props available to component
        super(props);

        this.state = {
            hideCompleted: false,
        };
    }
    // when submit is clicked
    handleSubmit(event) {
        //prevent auto-reload
        event.preventDefault();

        // find the text field via react ref
        var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        //insert into tasks collection
        Meteor.call('tasks.insert', text);

        // clear form 
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }
    // set completed to the opposite of its current state
    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }
    
    renderTasks() {
        var filteredTasks = this.props.tasks;
        // if hide completed is on
        if(this.state.hideCompleted) {
            // save unchecked items to fiteredTasks variable
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        // return each filtered tasks variable in the singleTask template
        return filteredTasks.map((task) => {
            var currentUserId =  this.props.currentUser && this.props.currentUser._id;
            var showPrivateButton = task.owner === currentUserId;

            return (
                <Task
                    key={task._id}
                    task={task}
                    showPrivateButton={showPrivateButton}
                />
            );
        });
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List ({this.props.incompleteCount})</h1>

                    <label className="hide-completed">
                        <input
                            type="checkbox"
                            readOnly
                            checked={this.state.hideCompleted}
                            onClick={this.toggleHideCompleted.bind(this)}
                        />
                        Hide Completed Tasks
                    </label>
                    <AccountsUIWrapper />

                    { this.props.currentUser ?
                        <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                            <input
                                type="text"
                                ref="textInput"
                                placeholder="Type to add new tasks"
                            />
                        </form> : ''
                    }
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('tasks');

    return {
        tasks: Tasks.find({}, { sort: {createAt: -1} }).fetch(),
        incompleteCount: Tasks.find({ checked: {$ne: true} }).count(),
        currentUser: Meteor.user(),
    };
},App);