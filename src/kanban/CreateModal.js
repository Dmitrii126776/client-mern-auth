import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

function CreateModal(props) {
    const {priorities, usersNames, arrayStatuses, createNewCard} = props

    const [modal, setModal] = useState(false);
    const [nameCardInput, setNameCardInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [assigneeInput, setAssigneeInput] = useState(usersNames[0])
    const [priorityInput, setPriorityInput] = useState(priorities[0])
    const [statusInput, setStatusInput] = useState(arrayStatuses[0])

    const createTask = () => {
        const newCard = {
            name: nameCardInput,
            assignee: assigneeInput,
            description: descriptionInput,
            status: statusInput,
            priority: +priorityInput,
        }
        createNewCard(newCard)
        toggle()
    }
    const toggle = () => {
        setNameCardInput('')
        setDescriptionInput('')
        setAssigneeInput(usersNames[0])
        setPriorityInput(priorities[0])
        setStatusInput(arrayStatuses[0])
        setModal(!modal);
    }

    return (
        <div>
            <Button color="secondary" outline onClick={toggle}>
                AddNewTask
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create Task Modal</ModalHeader>
                <ModalBody>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">TaskName</span>
                        <input value={nameCardInput} onChange={e => setNameCardInput(e.target.value)}
                               type="text" className="form-control" placeholder="task name ..."/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Description</span>
                        <input value={descriptionInput} onChange={e => setDescriptionInput(e.target.value)}
                               type="text" className="form-control" placeholder="description ..."/>
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Assignee</label>
                        <select value={assigneeInput} onChange={e => setAssigneeInput(e.target.value)}
                                className="form-select" id="inputGroupSelect01">
                            {usersNames.map((el, i) => (<option key={i} value={el}>{el}</option>))}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Priority</label>
                        <select value={priorityInput} onChange={e => setPriorityInput(e.target.value)}
                                className="form-select" id="inputGroupSelect01">
                            {priorities.map((el, i) => (<option key={i} value={el}>{el}</option>))}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Status</label>
                        <select value={statusInput} onChange={e => setStatusInput(e.target.value)}
                                className="form-select" id="inputGroupSelect01">
                            {arrayStatuses.map((el, i) => (<option key={i} value={el}>{el}</option>))}
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>{' '}
                    <Button color="primary" onClick={createTask}
                            disabled={nameCardInput === '' || descriptionInput === ''}>
                        Create
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default CreateModal;
