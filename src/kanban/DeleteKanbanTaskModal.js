import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

function DeleteKanbanTaskModal(props) {
    const {task, modal, toggle, deleteCard} = props

    const deleteCardButton = () => {
        deleteCard(task._id)
        toggle()
    }

    return (
        <div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Are you sure you wish to remove this task:</ModalHeader>
                <ModalBody>
                    <div className='list-group' style={{textAlign: "left"}}>
                        <h6>Task number: {task.taskNumber} </h6>
                        <h6>Task name: {task.name} </h6>
                        <h6>Assignee to: {task.assignee}</h6>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>{' '}
                    <Button color="danger" onClick={deleteCardButton}>
                        Remove
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default DeleteKanbanTaskModal;
