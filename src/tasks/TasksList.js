import React from 'react';
import Task from "./Task";
import CreateTaskModal from "./CreateTaskModel";

const TasksList = (props) => {
    const {tasks, createTask, updateTask, deleteTask} = props
    console.log(tasks)
    let completed = tasks.filter(el => !el.completed.status).length
    let uncompleted = tasks.filter(el => el.completed.status).length
    return (
        <div className="container-fluid">
            <div style={{margin: 15}} className="container-fluid d-flex justify-content-between align-items-center">
                <h3>Uncompleted Tasks({completed}/{tasks.length})</h3>
                <div className="d-flex justify-content-center flex-grow-1">
                    <CreateTaskModal createTask={createTask}/>
                </div>
            </div>
            <ul className='list-group' style={{listStyleType: 'none'}}>
                {tasks.filter(el => !el.completed.status).map((el) => (<Task
                    tasks={tasks}
                    task={el}
                    key={el._id}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />))}
            </ul>
            <div style={{margin: 15}} className="container-fluid text-lg-start">
                <h3>Completed Tasks({uncompleted}/{tasks.length})</h3>
            </div>
            <ul className='list-group' style={{listStyleType: 'none'}}>
                {tasks.filter(el => el.completed.status).map((el) => (<Task
                    tasks={tasks}
                    task={el}
                    key={el._id}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                />))}
            </ul>
        </div>
    );
};

export default TasksList;
