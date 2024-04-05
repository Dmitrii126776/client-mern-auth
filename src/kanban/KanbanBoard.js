import React, {useState, useEffect, useMemo} from 'react';
import './Kanban.css';
import axios from "axios";
import {capitalizeFirstLetter} from "../support";
import CreateModal from "./CreateModal";
import KanbanTaskDropDownModal from "./KanbanTaskDropDownModal";
import {Link, useNavigate} from "react-router-dom";

const KanbanBoard = (props) => {
    const {cards, createNewCard, getCards, deleteCard, getCardById} = props;

    const priorities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
            <nav className="navbar navbar-expand-lg" style={{marginTop: 10}} data-testid="navbar">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{marginLeft: "100px"}}
                        data-testid="navbar-links">
                        <li className="nav-item">
                            <Link to="/kanban" className="nav-link"
                                  style={{color: "blue", textDecoration: "underline"}}
                                  data-testid="nav-link-tasksboard"
                            >
                                TasksBoard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/kanban/backlog" className="nav-link" data-testid="nav-link-backlog">
                                Backlog
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex justify-content-center flex-grow-1" data-testid="create-modal-container">
                        <CreateModal createNewCard={createNewCard} priorities={priorities}/>
                    </div>
                </div>
            </nav>
            <div className="kanban-container" data-testid="kanban-container">
                {boards.map((board, i) => (
                    <div
                        onDragOver={(e) => dragOverHandler(e)}
                        onDrop={(e) => dropOnEmptyHandler(e, board)}
                        className="board"
                        key={board.id}
                        data-testid={`board-${board.status}`}
                    >
                        <div className="board-title">{capitalizeFirstLetter(board.status)}</div>
                        {board.cards.map((item, index) => (
                            <div
                                onDragOver={(e) => dragOverHandler(e)}
                                onDragLeave={(e) => dragLeaveHandler(e)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                                className="item"
                                key={item._id}
                                data-testid={`data-item-${index}`}
                            >
                                <div>
                                    <h6 onClick={() => moveToCard(item._id)}
                                        style={{cursor: "pointer", textDecoration: "underline"}}
                                        data-testid="card-number"
                                    >{item.taskNumber}</h6>
                                </div>
                                <h6 data-testid="card-name">{item.name}</h6>
                                <div data-testid="card-assignee-group"
                                     style={{display: 'flex', alignItems: 'center', marginBottom: 10}}>
                                    <span data-testid="card-assignee"><strong>{item.assignee}</strong></span>
                                    <span data-testid="card-priority" className="priority-dot"
                                          style={{marginLeft: 60}}>{item.priority}</span>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center'}} data-testid="card-status-group">
                                    <span style={{marginRight: '10px'}}>State</span>
                                    <span data-testid="card-status-dot-color"
                                          className={`status-dot status-dot-${item.status?.toLowerCase()}`}></span>
                                    <span data-testid="card-status" style={{flexGrow: 1}}>{item.status}</span>

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

