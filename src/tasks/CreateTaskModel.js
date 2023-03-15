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
        <div>
            {/*<Button style={{margin: 20}}*/}
            {/*        type="button" class="btn btn-outline-secondary" onClick={toggle}>*/}
            {/*    AddNewTask*/}
            {/*</Button>*/}
            <button type="button" className="btn btn-outline-secondary" onClick={toggle}>AddNewTask</button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create New Task</ModalHeader>
                <ModalBody>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Task Name:</span>
                        <input type="text" className="form-control" placeholder="... add new task"
                               value={nameInput} onChange={e => setNameInput(e.target.value)}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button disabled={nameInput === ''} color="primary" onClick={addTask}>
                        Save
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default CreateTaskModal;
