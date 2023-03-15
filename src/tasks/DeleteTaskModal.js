import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

function DeleteTaskModal(props) {
    const {deleteTask, task} = props
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const removeTask = (id) => {
        deleteTask(id)
        toggle()
    }

    return (
        <div>
            <Button className="btn btn-danger btn-sm" onClick={toggle}>
                Remove
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Remove Task</ModalHeader>
                <ModalBody>
                    Are you sure to remove {task.name}?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => removeTask(task._id)}>
                        Remove
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default DeleteTaskModal;
