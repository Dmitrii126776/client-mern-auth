import React, {useEffect, useState} from 'react';
import Task from "./Task";
import CreateTaskModal from "./CreateTaskModel";
import axios from "axios";
import $api from "../http";
import Loader from "../components/Loader";

const TasksList = () => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true);

    let completed = tasks.filter(el => !el.completed.status).length
    let uncompleted = tasks.filter(el => el.completed.status).length
    const getTasks = () => {
        $api.get(`https://server-mern-project.vercel.app/tasks`)
            .then(res => {
                setTasks(res.data)
                setLoading(false)
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
        <div className="container-fluid min-vh-100" data-testid="task-container">
            {loading ? (
                <div>
                    <Loader/>
                    <p>Loading...</p>
                </div>
            ) : (

                <div>
                    <div style={{margin: 15}}
                         className="container-fluid d-flex justify-content-between align-items-center">
                        <h3 data-testid="uncompleted-tasks-header">Uncompleted Tasks({completed}/{tasks.length})</h3>
                        <div className="d-flex justify-content-center flex-grow-1">
                            <CreateTaskModal createTask={createTask}/>
                        </div>
                    </div>

                    <ul className='list-group' style={{listStyleType: 'none'}} data-testid="uncompleted-tasks-list">
                        {tasks.filter(el => !el.completed.status).map((el) => (<Task
                            tasks={tasks}
                            task={el}
                            key={el._id}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                        />))}
                    </ul>
                    <div style={{margin: 15}} className="container-fluid text-lg-start">
                        <h3 data-testid="completed-tasks-header">Completed Tasks({uncompleted}/{tasks.length})</h3>
                    </div>
                    <ul className='list-group' style={{listStyleType: 'none'}} data-testid="completed-tasks-list">
                        {tasks.filter(el => el.completed.status).map((el) => (<Task
                            tasks={tasks}
                            task={el}
                            key={el._id}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                        />))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TasksList;
