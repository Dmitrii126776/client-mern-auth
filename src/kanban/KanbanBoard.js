import React, {useState, useEffect, useMemo} from 'react';
import './Kanban.css';
import axios from "axios";
import {capitalizeFirstLetter} from "../support";
import CreateModal from "./CreateModal";
import KanbanTaskDropDownModal from "./KanbanTaskDropDownModal";
import {Link, useNavigate} from "react-router-dom";

const KanbanBoard = (props) => {
    const {
        cards,
        createNewCard,
        getCards,
        deleteCard,
        getCardById,
        usersNames,
        priorities,
        arrayStatuses
    } = props;

    const statusesCards = useMemo(() => [
        {id: 1, status: 'new', cards: []},
        {id: 2, status: 'active', cards: []},
        {id: 3, status: 'review', cards: []},
        {id: 4, status: 'closed', cards: []},
    ], []);

    const [boards, setBoards] = useState(statusesCards);

    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)
    const navigate = useNavigate();
    const moveToCard = (id) => {
        getCardById(id)
        navigate(`/kanban/card/${id}`)
    }

    const dragOverHandler = (e) => {
        e.preventDefault()
        if (e.target.className === 'item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }
    }
    const dragLeaveHandler = (e) => {
        e.target.style.boxShadow = 'none'
    }
    const dragStartHandler = (e, board, item) => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }
    const dragEndHandler = (e) => {
        e.target.style.boxShadow = 'none'

    }
    const dropHandler = (e, board, item) => {
        e.preventDefault()
        const currentIndex = currentBoard.cards.indexOf(currentItem)
        currentBoard.cards.splice(currentIndex, 1)
        const dropIndex = board.cards.indexOf(item)
        board.cards.splice(dropIndex + 1, 0, currentItem)
        // setBoards([...boards]);
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board;
            }
            if (b.id === currentBoard.id) {
                return currentBoard;
            }
            return b;
        }))
        const newStatus = {status: board.status}
        updateCardStatus(currentItem._id, newStatus)
    }

    const dropOnEmptyHandler = (e, board) => {
        e.preventDefault();
        if (!board.cards.includes(currentItem)) {
            board.cards.push(currentItem);
            const currentIndex = currentBoard.cards.indexOf(currentItem);
            currentBoard.cards.splice(currentIndex, 1);
            setBoards([...boards]); // Update the state to trigger a re-render
            const newStatus = {status: board.status};
            updateCardStatus(currentItem._id, newStatus);
        }
    };

    const updateCardStatus = (id, newStatus) => {
        axios.patch(`https://server-mern-project.vercel.app/cards/${id}`, newStatus)
            .then(res => {
                getCards()
            })
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        if (cards.length === 0 || !Array.isArray(cards)) {
            return;
        }

        const filteredCards = [
            ...statusesCards.map((statusCard) => ({
                ...statusCard,
                cards: cards.filter((card) => card.status === statusCard.status),
            })),
        ];
        // console.log("This is a message from console");
        setBoards(filteredCards);
    }, [cards, statusesCards]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{marginTop: 10}}>
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{marginLeft: "100px"}}>
                        <li className="nav-item">
                            <Link to="/kanban" className="nav-link"
                                  style={{color: "blue", textDecoration: "underline"}}>
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
                        <CreateModal createNewCard={createNewCard} arrayStatuses={arrayStatuses}
                                     priorities={priorities} usersNames={usersNames}/>
                    </div>
                </div>
            </nav>
            <div className="kanban-container">
                {boards.map((board, i) => (
                    <div
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropOnEmptyHandler(e, board)}
                        className="board"
                        key={board.id}
                    >
                        <div className="board-title">{capitalizeFirstLetter(board.status)}</div>
                        {board.cards.map((item) => (
                            <div
                                onDragOver={e => dragOverHandler(e)}
                                onDragLeave={e => dragLeaveHandler(e)}
                                onDragStart={e => dragStartHandler(e, board, item)}
                                onDragEnd={e => dragEndHandler(e)}
                                onDrop={e => dropHandler(e, board, item)}
                                draggable={true}
                                className="item" key={item._id}>
                                <div>
                                    <h6 onClick={() => moveToCard(item._id)}
                                        style={{cursor: "pointer", textDecoration: "underline"}}
                                    >{item.taskNumber}</h6>
                                </div>
                                <h6>{item.name}</h6>
                                <div style={{display: 'flex', alignItems: 'center', marginBottom: 10}}>
                                    <span><strong>{item.assignee}</strong></span>
                                    <span className="priority-dot" style={{marginLeft: 60}}>{item.priority}</span>
                                </div>
                                {/*<h6>{item._id}</h6>*/}
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <span style={{marginRight: '10px'}}>State</span>
                                    <span className={`status-dot status-dot-${item.status?.toLowerCase()}`}></span>
                                    <span style={{flexGrow: 1}}>{item.status}</span>

                                    <KanbanTaskDropDownModal task={item} deleteCard={deleteCard}
                                                             getCardById={getCardById}/>

                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;

