import React, {useEffect, useState} from 'react';
import Task from "./Task";
import CreateTaskModal from "./CreateTaskModel";
import $api from "../http";
import Loader from "../components/Loader";
import LoginAlert from "../components/LoginAlert";
import LoginAlertMUI from "../components/LoginAlertMUI";

const TasksList = () => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true);
    const [loginAlert, setLoginAlert] = useState(false);


    let completed = tasks.filter(el => !el.completed.status).length
    let uncompleted = tasks.filter(el => el.completed.status).length
    const getTasks = () => {
        $api.get('/tasks')
            .then((response) => {
                setTasks(response.data)
                setLoading(false)
            }).catch((error) => {
            if (error.response) {
                setLoginAlert(true)
                setLoading(false)
                console.log('get tasks error', error.response)
            } else if (error.request) {
                console.log('network error', error.request);
                setLoading(true)
            } else {
                console.log('error-message', error.message);
            }
        })
    }
    const createTask = (newTask) => {
        $api.post('/tasks', newTask)
            .then(res => {
                getTasks()
            }).catch(err => {
            console.log(err)
        })
    }
    const updateTask = (id, updatedTask) => {
        $api.patch(`/tasks/${id}`, updatedTask)
            .then(res => {
                getTasks()
            }).catch(err => {
            console.log(err)
        })
    }
    const deleteTask = (id) => {
        $api.delete(`/tasks/${id}`)
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
        <>
            {loginAlert ? (
                <div className="min-vh-100 mt-5">
                    <LoginAlertMUI/>
                    {/*<LoginAlert/>*/}
                </div>
            ) : (
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
                                <h3 data-testid="uncompleted-tasks-header">Uncompleted
                                    Tasks({completed}/{tasks.length})</h3>
                                <div className="d-flex justify-content-center flex-grow-1">
                                    <CreateTaskModal createTask={createTask}/>
                                </div>
                            </div>
                            <ul className='list-group' style={{listStyleType: 'none'}}
                                data-testid="uncompleted-tasks-list">
                                {tasks.filter(el => !el.completed.status).map((el) => (<Task
                                    tasks={tasks}
                                    task={el}
                                    key={el._id}
                                    updateTask={updateTask}
                                    deleteTask={deleteTask}
                                />))}
                            </ul>
                            <div style={{margin: 15}} className="container-fluid text-lg-start">
                                <h3 data-testid="completed-tasks-header">Completed
                                    Tasks({uncompleted}/{tasks.length})</h3>
                            </div>
                            <ul className='list-group' style={{listStyleType: 'none'}}
                                data-testid="completed-tasks-list">
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
            )}
        </>
    );
};

export default TasksList;
