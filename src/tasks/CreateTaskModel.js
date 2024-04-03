import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {createTodayDate} from "../support";

function CreateTaskModal(props) {
    const {createTask} = props
    const [modal, setModal] = useState(false);
    const [nameInput, setNameInput] = useState('')

    const addTask = () => {
        const newTask = {
            name: nameInput,
            created: {
                date: createTodayDate(),
                status: true
            },
            completed: {
                date: "",
                status: false,
            }
        }
        createTask(newTask)
        toggle()
    }

    const toggle = () => {
        setNameInput('')
        setModal(!modal)
    };

    return (
        <div data-testid="create-task">
            {/*<Button style={{margin: 20}}*/}
            {/*        type="button" class="btn btn-outline-secondary" onClick={toggle}>*/}
            {/*    AddNewTask*/}
            {/*</Button>*/}
            <button type="button" className="btn btn-outline-secondary"
                    onClick={toggle} data-testid="add-new-task-button">AddNewTask
            </button>
            <Modal isOpen={modal} toggle={toggle} data-testid="create-task-modal">
                <ModalHeader toggle={toggle} data-testid="create-task-modal-header">Create New Task</ModalHeader>
                <ModalBody>
                    <div className="input-group mb-3" data-testid="task-name-input-group">
                        <span className="input-group-text" id="basic-addon1">Task Name:</span>
                        <input type="text" className="form-control" placeholder="... add new task"
                               value={nameInput} onChange={e => setNameInput(e.target.value)}
                               data-testid="task-name-input"
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button disabled={nameInput === ''} color="primary"
                            onClick={addTask} data-testid="save-task-button">
                        Save
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle} data-testid="cancel-task-button">
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default CreateTaskModal;
