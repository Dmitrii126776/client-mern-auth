import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

const KanbanCard = (props) => {

    const {card, usersNames, priorities, arrayStatuses, updateCard} = props;
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
        <div style={{height:500}}>
            <nav className="navbar navbar-expand-lg" style={{marginTop: 10}}>
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{marginLeft: "100px"}}>
                        <li className="nav-item">
                            <Link to="/kanban" className="nav-link">
                                TasksBoard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/kanban/backlog" className="nav-link">
                                Backlog
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex justify-content-center flex-grow-1">
                        <button onClick={saveAndClose}
                                type="button" className="btn btn-outline-secondary">Save&Close
                        </button>
                    </div>
                </div>
            </nav>
            <div>
                {card ? (
                    <div className="container-fluid" style={{marginTop: 20}}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1">{card.taskNumber}</span>
                            <input value={nameCardInput} onChange={e => setNameCardInput(e.target.value)}
                                   type="text" className="form-control" placeholder="task name ..."/>
                        </div>
                        <div className="flex" style={{display: 'flex'}}>
                            <div className="input-group mb-3" style={{marginRight: '10px'}}>
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Assignee</label>
                                <select value={assigneeInput} onChange={e => setAssigneeInput(e.target.value)}
                                        className="form-select" id="inputGroupSelect01">
                                    {usersNames.map((el, i) => (<option key={i} value={el}>{el}</option>))}
                                </select>
                            </div>
                            <div className="input-group mb-3" style={{marginRight: '10px'}}>
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Status</label>
                                <select value={statusInput} onChange={e => setStatusInput(e.target.value)}
                                        className="form-select" id="inputGroupSelect01">
                                    {arrayStatuses.map((el, i) => (<option key={i} value={el}>{el}</option>))}
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <label className="input-group-text" htmlFor="inputGroupSelect01">Priority</label>
                                <select value={priorityInput} onChange={e => setPriorityInput(e.target.value)}
                                        className="form-select" id="inputGroupSelect01">
                                    {priorities.map((el, i) => (<option key={i} value={el}>{el}</option>))}
                                </select>
                            </div>
                        </div>

                        <div className="input-group">
                            <span className="input-group-text">Description</span>
                            <textarea value={descriptionInput} onChange={e => setDescriptionInput(e.target.value)}
                                      className="form-control" aria-label="With textarea"></textarea>
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
