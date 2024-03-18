import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {lazy, Suspense, useContext, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Registration from "./pages/Registration";
import axios from "axios";
import UserContext from "./UserContext";
import Home from "./pages/Home";
import TasksList from "./tasks/TasksList";
import KanbanBoard from "./kanban/KanbanBoard";
import Layout from "./components/Layout";
import Backlog from "./kanban/Backlog";
import KanbanCard from "./kanban/KanbanCard";
// import AnimalsBoard from "./animals/AnimalsBoard";
import Animal from "./animals/Animal";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

const AnimalsBoard = lazy(() => import('./animals/AnimalsBoard'))

function App() {
    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('')
    const [cards, setCards] = useState([])
    const [card, setCard] = useState(null)
    // const [animals, setAnimals] = useState([])
    // const [loading, setLoading] = useState(true);

    const url = "https://server-mern-project.vercel.app"

    const user = useContext(UserContext)

    const getCards = () => {
        axios.get(`https://server-mern-project.vercel.app/cards`)
            .then(res => {
                //  console.log(res.data)
                setCards(res.data)
            }).catch(err => {
            console.log(err)
        })
    }

    // const getAnimals = () => {
    //     axios.get(`https://server-mern-project.vercel.app/animals`)
    //         .then(res => {
    //             // console.log(res.data)
    //             setAnimals(res.data)
    //             setLoading(false);
    //         }).catch(err => {
    //         console.log(err)
    //     })
    // }

    // const getAnimals = () => {
    //     const cachedAnimals = localStorage.getItem('animals');
    //
    //     if (cachedAnimals) {
    //         setAnimals(JSON.parse(cachedAnimals));
    //         setLoading(false);
    //     } else {
    //         axios
    //             .get(`${url}/animals`)
    //             .then((res) => {
    //                 setAnimals(res.data);
    //                 setLoading(false);
    //                 localStorage.setItem('animals', JSON.stringify(res.data));
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     }
    // };

    const [animal, setAnimal] = useState({});

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

    useEffect(() => {
        const cardId = localStorage.getItem('cardId');
        if (cardId) {
            getCardById(cardId);
        }
    }, []);


    useEffect(() => {
        getCards()
        // getAnimals()
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
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/home" element={<Home
                            // animals={animals}
                            firstname={firstname}
                            logout={logout}
                            email={email}/>}/>
                        <Route path='/tasks' element={<TasksList/>}/>
                        <Route path="/kanban" element={
                            <Suspense fallback={<div>
                                <Loader/>
                            </div>}>
                                <KanbanBoard
                                    cards={cards}
                                    createNewCard={createNewCard}
                                    getCards={getCards}
                                    getCardById={getCardById}
                                    deleteCard={deleteCard}
                                />
                            </Suspense>
                        }/>
                        <Route path="/kanban/backlog" element={<Backlog
                            cards={cards}
                            createNewCard={createNewCard}
                            getCardById={getCardById}
                        />}/>
                        <Route path="/kanban/card/:id" element={<KanbanCard
                            card={card}
                            updateCard={updateCard}
                        />}/>
                        <Route path="/animals" element={
                            <Suspense fallback={<div>
                                <Loader/>
                            </div>}>
                                <AnimalsBoard
                                    // loading={loading}
                                    // animals={animals}
                                    getAnimalById={getAnimalById}
                                />
                            </Suspense>

                        }/>
                        <Route path="/animals/animal/:id" element={<Animal
                            animal={animal}
                        />}/>

                    </Routes>
                    <Footer/>

                </div>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
