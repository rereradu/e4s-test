'use strict';

const e = React.createElement;

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [], finishedTasks: [], currentTask: ''};
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.finishTask = this.finishTask.bind(this);
        this.unFinishTask = this.unFinishTask.bind(this);
    }

    handleChange(event) {
        this.setState({error: '', currentTask: event.target.value});
    }

    addTask(ev) {
        ev.preventDefault();
        let {tasks, currentTask} = this.state;

        if (tasks.indexOf(currentTask) > -1) {
            this.setState(prevState => ({
                error: 'Task name already exists',
                currentTask: ''
            }));
        } else {
            this.setState(prevState => ({
                tasks: [...prevState.tasks, currentTask],
                currentTask: ''
            }));
        }
    }

    deleteTask(task) {
        let {tasks} = this.state;
        tasks.splice( tasks.indexOf(task), 1 );
        this.setState({tasks: tasks});
    }

    finishTask(task) {
        let {tasks} = this.state;
        tasks.splice( tasks.indexOf(task), 1 );

        this.setState(prevState => ({
            tasks: tasks,
            finishedTasks: [...prevState.finishedTasks, task],
        }));
    }

    unFinishTask(task) {
        let {finishedTasks} = this.state;
        finishedTasks.splice( finishedTasks.indexOf(task), 1 );

        this.setState(prevState => ({
            finishedTasks: finishedTasks,
            tasks: [...prevState.tasks, task],
        }));
    }

    render() {
        
        let { tasks, finishedTasks, currentTask, error } = this.state;

        return (
            <div>
                
                <h2>Add new task</h2>
                <div>
                    <form onSubmit={this.addTask}>
                        <label>
                            Task name:
                            <input type="text" value={currentTask} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Add Task" />
                    </form>
                </div>

                {error &&
                    <p className="error">{error}</p>
                }

                <br />


                <h2>Current Tasks:</h2>

                <br />

                {tasks.length > 0 ?
                    tasks.map((task, index) => (
                        <div className="task" key={index}>
                            <span title="Delete Task" className="deleteTask" onClick={(e) => this.deleteTask(task)}>x</span>
                            <span title="Mark as done" className="deleteTask" onClick={(e) => this.finishTask(task)}>v</span>
                            {task}
                        </div>
                    ))
                :
                    <p>There are no current tasks yet.</p>
                }

                

                <br />

                <h2>Finished tasks</h2>

                <br />

                {finishedTasks.length ?
                    finishedTasks.map((task, index) => (
                        <div className="finished-task" key={index}>
                            <span title="Un-finish Task" className="deleteTask" onClick={(e) => this.unFinishTask(task)}>v</span>
                            {task}
                        </div>
                    ))
                :
                    <p>There are no finished tasks yet.</p>
                }

            </div>
        )
    }
}

const mainContainer = document.querySelector('#main');
ReactDOM.render(e(Tasks, {tasks: []} ), mainContainer);