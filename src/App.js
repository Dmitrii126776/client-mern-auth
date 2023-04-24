import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import Registration from "./pages/Registration";
import axios from "axios";
import UserContext from "./UserContext";
import Home from "./pages/Home";
import TasksList from "./tasks/TasksList";
import KanbanBoard from "./kanban/KanbanBoard";
import Layout from "./components/Layout";
import Backlog from "./kanban/Backlog";
import KanbanCard from "./kanban/KanbanCard";
import AnimalsBoard from "./animals/AnimalsBoard";
import Animal from "./animals/Animal";
import Header from "./components/Header";
import Projects from "./components/Projects";


function App() {
    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('')
    const [tasks, setTasks] = useState([])
    const [taskNumber, setTaskNumber] = useState(0)
    const [number, setNumber] = useState('')
    const [users, setUsers] = useState([])
    const [statuses, setStatuses] = useState([])
    const [cards, setCards] = useState([])
    const [animals, setAnimals] = useState([])
    const [card, setCard] = useState(null)
    const [loading, setLoading] = useState(true);
    // const [animal, setAnimal] = useState({})

    const url = "https://server-mern-project.vercel.app"
    // 'http://localhost:5050/logout'

    const priorities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const usersNames = users.map(el => el.firstname)
    const arrayStatuses = statuses.map(el => el.title)

    const user = useContext(UserContext)

    const getTasks = () => {
        axios.get(`${url}/tasks`)
            .then(res => {
                //  console.log(res.data)
                setTasks(res.data)
            }).catch(err => {
            console.log(err)
        })
    }
    const getTaskNumber = () => {
        axios.get(`${url}/numbers`)
            .then(res => {
                setTaskNumber(res.data[0].numberTask)
                setNumber(res.data[0]._id)
            })
            .catch(err => {
                console.log("Error retrieving task number:", err);
            })
    }

    const updateTaskNumber = (id, nextTaskNumber) => {
        axios.patch(`https://server-mern-project.vercel.app/numbers/${id}`, nextTaskNumber)
            .then(res => {
                getTaskNumber()
            }).catch(err => {
            console.log(err)
        })
    }

    const getStatuses = () => {
        axios.get(`https://server-mern-project.vercel.app/statuses`)
            .then(res => {
                //  console.log(res.data)
                setStatuses(res.data)
            }).catch(err => {
            console.log(err)
        })
    }

    const getUsers = () => {
        axios.get(`https://server-mern-project.vercel.app/users`)
            .then(res => {
                //  console.log(res.data)
                setUsers(res.data)
            }).catch(err => {
            console.log(err)
        })
    }

    const getCards = () => {
        axios.get(`https://server-mern-project.vercel.app/cards`)
            .then(res => {
                //  console.log(res.data)
                setCards(res.data)
            }).catch(err => {
            console.log(err)
        })
    }
    const getAnimals = () => {
        axios.get(`https://server-mern-project.vercel.app/animals`)
            .then(res => {
                // console.log(res.data)
                setAnimals(res.data)
                setLoading(false);
            }).catch(err => {
            console.log(err)
        })
    }

    const [animal, setAnimal] = useState({})
    const getAnimalById = (id) => {
        axios.get(`${url}/animals/${id}`)
            .then(res => {
                // console.log(res.data)
                setAnimal(res.data)
            }).catch(err => {
            console.log(err)
        })
    }

    const getCardById = (id) => {
        axios.get(`${url}/cards/${id}`)
            .then(res => {
                //console.log(res.data)
                setCard(res.data)
                localStorage.setItem('cardId', id);
                localStorage.setItem('cardItem', JSON.stringify(res.data));
            }).catch(err => {
            console.log(err)
        })
    }

    const createNewCard = (newCard) => {
        // console.log(newCard)
        axios.post(`https://server-mern-project.vercel.app/cards`, newCard)
            .then(res => {
                getCards()
            }).catch(err => {
            console.log(err)
        })
    }

    const updateCard = (id, card) => {
        axios.patch(`https://server-mern-project.vercel.app/cards/${id}`, card)
            .then(res => {
                getCards()
            }).catch(err => {
            console.log(err)
        })
    }

    const deleteCard = (id) => {
        axios.delete(`https://server-mern-project.vercel.app/cards/${id}`)
            .then((res) => {
                getCards()
            }).catch((err) => {
            console.log(err)
        })
    }

    const createTask = (newTask) => {
        axios.post(`https://server-mern-project.vercel.app/tasks`, newTask)
            .then(res => {
                getTasks()
            }).catch(err => {
            console.log(err)
        })
    }

    const updateTask = (id, updatedTask) => {
        axios.patch(`https://server-mern-project.vercel.app/tasks/${id}`, updatedTask)
            .then(res => {
                getTasks()
            }).catch(err => {
            console.log(err)
        })
    }

    const deleteTask = (id) => {
        axios.delete(`https://server-mern-project.vercel.app/tasks/${id}`)
            .then(res => {
                getTasks()
            }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');
        axios.get(`https://server-mern-project.vercel.app/users/${userId}`, {
            headers: {Authorization: `Bearer ${token}`},
        })
            .then(response => {
                setEmail(response.data.email);
                setFirstName(response.data.firstname);
            })
            .catch(error => {
                console.log(error)
            });
    }, [])

    useEffect(() => {
        const cardId = localStorage.getItem('cardId');
        if (cardId) {
            getCardById(cardId);
        }
    }, []);


    useEffect(() => {
        getTasks()
        getTaskNumber()
        getUsers()
        getStatuses()
        getCards()
        getAnimals()
    }, [])


    function logout() {
        axios.post('https://server-mern-project.vercel.app/logout', {}, {withCredentials: true})
            .then(() => {
                setEmail('')
                localStorage.removeItem('id')
                localStorage.removeItem('token')
            });
    }

    return (
        <UserContext.Provider value={{email, setEmail, firstname, setFirstName,}}>

            <BrowserRouter>
                <div className="App">
                    <Layout email={email} firstname={firstname} logout={logout}/>
                    <Routes>
                        {/*<Route path="/" element={<Welcome/>}/>*/}
                        <Route path="/" element={<Header/>}/>
                        <Route path="/projects" element={<Projects/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/home" element={<Home
                            animals={animals}
                            firstname={firstname}
                            logout={logout}
                            email={email}/>}/>
                        <Route path='/tasks' element={<TasksList
                            tasks={tasks}
                            createTask={createTask}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                        />}/>
                        <Route path="/kanban" element={<KanbanBoard
                            cards={cards}
                            taskNumber={taskNumber}
                            users={users}
                            updateTaskNumber={updateTaskNumber}
                            setCards={setCards}
                            createNewCard={createNewCard}
                            getCards={getCards}
                            getCardById={getCardById}
                            deleteCard={deleteCard}
                            usersNames={usersNames}
                            priorities={priorities}
                            arrayStatuses={arrayStatuses}
                            number={number}
                        />}/>
                        <Route path="/kanban/backlog" element={<Backlog
                            cards={cards}
                            usersNames={usersNames}
                            priorities={priorities}
                            arrayStatuses={arrayStatuses}
                            createNewCard={createNewCard}
                            getCardById={getCardById}
                        />}/>
                        <Route path="/kanban/card/:id" element={<KanbanCard
                            card={card}
                            usersNames={usersNames}
                            priorities={priorities}
                            arrayStatuses={arrayStatuses}
                            updateCard={updateCard}
                        />}/>
                        <Route path="/animals" element={<AnimalsBoard
                            loading={loading}
                            animals={animals}
                            getAnimalById={getAnimalById}
                        />}/>
                        <Route path="/animals/animal/:id" element={<Animal
                            animal={animal}
                        />}/>

                    </Routes>
                </div>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
