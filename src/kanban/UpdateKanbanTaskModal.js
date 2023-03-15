import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Link} from "react-router-dom";
import CreateModal from "./CreateModal";

function UpdateKanbanTaskModal(props) {
    const {task, modal, toggle} = props

    return (
        <div>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Are you sure you wish to update {task.taskNumber}:</ModalHeader>
                <ModalBody>
                    <div className='list-group' style={{textAlign: "left"}}>
                        <h6>Task name: {task.name} </h6>
                        <h6>Assignee to: {task.assignee}</h6>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>{' '}
                    <Button color="primary" onClick={toggle}>
                        Update
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default UpdateKanbanTaskModal;


