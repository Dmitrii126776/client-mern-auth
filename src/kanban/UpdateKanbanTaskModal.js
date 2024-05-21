import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

function UpdateKanbanTaskModal(props) {
    const {task, modal, toggle} = props

    return (
        <div data-testid="update-task-modal">
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Are you sure you wish to update {task.taskNumber}:</ModalHeader>
                <ModalBody>
                    <div className='list-group' style={{textAlign: "left"}}>
                        <h6 data-testid="task-name">Task name: {task.name} </h6>
                        <h6 data-testid="task-assignee">Assignee to: {task.assignee}</h6>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle} data-testid="cancel-button">
                        Cancel
                    </Button>{' '}
                    <Button color="primary" onClick={toggle} data-testid="update-button">
                        Update
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default UpdateKanbanTaskModal;


