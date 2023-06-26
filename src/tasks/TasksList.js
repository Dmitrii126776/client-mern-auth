import React, {useEffect, useState} from 'react';
import Task from "./Task";
import CreateTaskModal from "./CreateTaskModel";
import axios from "axios";

const TasksList = () => {
    const [tasks, setTasks] = useState([])

    let completed = tasks.filter(el => !el.completed.status).length
    let uncompleted = tasks.filter(el => el.completed.status).length
    const getTasks = () => {
        axios.get(`https://server-mern-project.vercel.app/tasks`)
            .then(res => {
                //  console.log(res.data)
                setTasks(res.data)
            }).catch(err => {
            console.log(err)
        })
    }
    const createTask = (newTask) => {
        axios.post(`https://server-mern-project.vercel.app/tasks`, newTask)
            .then(res => {
                getTasks()
            }).catch(err => {
            console.log(err)
        })
    }
    const updateTask = (id, updatedTask) => {
        axios.patch(`https://server-mern-project.vercel.app/tasks/${id}`, updatedTask)
            .then(res => {
                getTasks()
            }).catch(err => {
            console.log(err)
        })
    }
    const deleteTask = (id) => {
        axios.delete(`https://server-mern-project.vercel.app/tasks/${id}`)
            .then(res => {
                getTasks()
            }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getTasks()
    }, [])

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
