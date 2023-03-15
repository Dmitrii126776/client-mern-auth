import React, {useState} from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import DeleteKanbanTaskModal from "./DeleteKanbanTaskModal";
import UpdateKanbanTaskModal from "./UpdateKanbanTaskModal";
import {useNavigate} from "react-router-dom";


function KanbanTaskDropDownModal(props) {
    const {task, deleteCard, getCardById} = props
    const navigate = useNavigate();
    const moveToCard = (id) => {
        getCardById(id)
        //console.log(`/kanban/${id}`)
        navigate(`/kanban/card/${id}`)
    }

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const [deleteModal, setDeleteModal] = useState(false);
    const deleteToggle = () => setDeleteModal(!deleteModal);

    const [updateModal, setUpdateModal] = useState(false);
    const updateToggle = () => setUpdateModal(!updateModal);

    return (
        <div className="d-flex">
            <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{color: "gray"}}>
                <DropdownToggle caret>Actions</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <div className="btn-sm" color="danger" onClick={deleteToggle}>
                          <span style={{fontSize: 18, color: "red"}}>
                                        Delete <i className="fas fa-trash"></i>
                           </span>
                        </div>
                        <DeleteKanbanTaskModal
                            deleteCard={deleteCard}
                            task={task} modal={deleteModal} toggle={deleteToggle}/>
                    </DropdownItem>
                    <DropdownItem>
                        <div className="btn-sm" onClick={() => moveToCard(task._id)}>
                           <span style={{fontSize: 18, color: "black"}}>
                               Update <i className="fas fa-pencil-alt"></i>
                           </span>
                        </div>
                        <UpdateKanbanTaskModal getCardById={getCardById} task={task} modal={updateModal}
                                               toggle={updateToggle}/>
                    </DropdownItem>

                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default KanbanTaskDropDownModal;
