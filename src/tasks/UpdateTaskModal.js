import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

function UpdateTaskModal(props) {
    const {updateTask, task} = props
    const [nameInput, setNameInput] = useState(task.name)
    const [modal, setModal] = useState(false);

    const saveUpdateTask = () => {
        const updatedTask = {
            name: nameInput
        }
        updateTask(task._id, updatedTask)
        toggle()
    }

    const cancelUpdate = () => {
        setNameInput(task.name)
        toggle()
    }
    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button data-testid="update-task-button" className="btn btn-secondary btn-sm half-size" onClick={toggle}>
                Update
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Update Task</ModalHeader>
                <ModalBody>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Task Name:</span>
                        <input type="text" className="form-control" placeholder="... add new task"
                               value={nameInput} onChange={e => setNameInput(e.target.value)}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={saveUpdateTask}>
                        Save
                    </Button>{' '}
                    <Button color="secondary" onClick={cancelUpdate}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default UpdateTaskModal;
