import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import $api from "../http";

const KanbanCard = (props) => {
    const {card, updateCard} = props;
    const priorities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const arrayStatuses = ["new", "active", "review", "closed"];
    const [users, setUsers] = useState([])
    const usersNames = users.map(el => el.firstname)
    const [nameCardInput, setNameCardInput] = useState('');
    const [assigneeInput, setAssigneeInput] = useState('');
    const [priorityInput, setPriorityInput] = useState('');
    const [statusInput, setStatusInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const navigate = useNavigate();
    const saveAndClose = () => {
        const updatedCard = {
            name: nameCardInput,
            assignee: assigneeInput,
            priority: priorityInput,
            status: statusInput,
            description: descriptionInput,
        }
        updateCard(card.id, updatedCard)
        navigate('/kanban')
    }

    useEffect(() => {
        const getUsers = () => {
            $api.get('/users')
                .then(res => {
                    //  console.log(res.data)
                    setUsers(res.data)
                }).catch(err => {
                console.log(err)
            })
        }
        getUsers()
    }, [])

    useEffect(() => {
        const storedData = localStorage.getItem('cardItem');
        if (storedData) {
            const {name, assignee, priority, status, description} = JSON.parse(storedData);
            setNameCardInput(name);
            setAssigneeInput(assignee);
            setPriorityInput(priority);
            setStatusInput(status);
            setDescriptionInput(description);
        } else if (card) {
            setNameCardInput(card.name);
            setAssigneeInput(card.assignee);
            setPriorityInput(card.priority);
            setStatusInput(card.status);
            setDescriptionInput(card.description);
        }
    }, [card]);

    return (
        <div style={{height: 450}} data-testid="edit-task-form" className="min-vh-100">
            <nav className="navbar navbar-expand-lg" style={{marginTop: 10}}>
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{marginLeft: "100px"}}>
                        <li className="nav-item">
                            <Link to="/kanban" className="nav-link" data-testid="navlink-tasksboard">
                                TasksBoard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/kanban/backlog" className="nav-link" data-testid="navlink-backlog">
                                Backlog
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex justify-content-center flex-grow-1">
                        <button onClick={saveAndClose} type="button" className="btn btn-outline-secondary"
                                data-testid="save-close-button">
                            Save&Close
                        </button>
                    </div>
                </div>
            </nav>
            <div>
                {card ? (
                    <div className="container-fluid" style={{marginTop: 20}}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"
                                  data-testid="task-number">{card.taskNumber}</span>
                            <input
                                value={nameCardInput} onChange={e => setNameCardInput(e.target.value)}
                                type="text" className="form-control"
                                placeholder="task name ..." data-testid="task-name-input"
                            />
                        </div>
                        <div className="flex" style={{display: 'flex'}}>
                            <div className="input-group mb-3" style={{marginRight: '10px'}}>
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Assignee</label>
                                <select
                                    value={assigneeInput} onChange={e => setAssigneeInput(e.target.value)}
                                    className="form-select" id="inputGroupSelect01"
                                    data-testid="assignee-select"
                                >
                                    {usersNames.map((el, i) => (<option key={i} value={el}>{el}</option>))}
                                </select>
                            </div>
                            <div className="input-group mb-3" style={{marginRight: '10px'}}>
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Status</label>
                                <select
                                    value={statusInput} onChange={e => setStatusInput(e.target.value)}
                                    className="form-select" id="inputGroupSelect01"
                                    data-testid="status-select"
                                >
                                    {arrayStatuses.map((el, i) => (<option key={i} value={el}>{el}</option>))}
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Priority</label>
                                <select
                                    value={priorityInput} onChange={e => setPriorityInput(e.target.value)}
                                    className="form-select" id="inputGroupSelect01"
                                    data-testid="priority-select"
                                >
                                    {priorities.map((el, i) => (<option key={i} value={el}>{el}</option>))}
                                </select>
                            </div>
                        </div>

                        <div className="input-group">
                            <span className="input-group-text">Description</span>
                            <textarea
                                value={descriptionInput} onChange={e => setDescriptionInput(e.target.value)}
                                className="form-control" aria-label="With textarea"
                                data-testid="description-textarea"
                            ></textarea>
                        </div>
                    </div>
                ) : (
                    <p>No card found.</p>
                )}
            </div>
        </div>
    );
};

export default KanbanCard;
