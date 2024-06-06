import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {lazy, Suspense, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import axios from "axios";
import Home from "./pages/Home";
import TasksList from "./tasks/TasksList";
import KanbanBoard from "./kanban/KanbanBoard";
import Layout from "./components/Layout";
import Backlog from "./kanban/Backlog";
import KanbanCard from "./kanban/KanbanCard";
import Animal from "./animals/Animal";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import RegistrationForm from "./pages/RegistrationForm";
import LoginForm from "./pages/LoginForm";
import $api from "./http";
import AnimalsGallery from "./animals/AnimalsGallery";

const AnimalsBoard = lazy(() => import('./animals/AnimalsBoard'))

function App() {
    const [cards, setCards] = useState([])
    const [card, setCard] = useState(null)
    const [loading, setLoading] = useState(true);

    const getCards = () => {
        axios.get(`https://server-mern-project.vercel.app/cards`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }
        }).then(res => {
            //  console.log(res.data)
            setCards(res.data)
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }

    const [animal, setAnimal] = useState({});

    const getAnimalById = (id) => {
        $api.get(`/animals/${id}`)
            .then(res => {
                // console.log(res.data)
                setAnimal(res.data)
            }).catch(err => {
            console.log(err)
        })
    }

    const getCardById = (id) => {
        $api.get(`/cards/${id}`)
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
        $api.post(`/cards`, newCard)
            .then(res => {
                getCards()
            }).catch(err => {
            console.log(err)
        })
    }

    const updateCard = (id, card) => {
        $api.patch(`/cards/${id}`, card)
            .then(res => {
                getCards()
            }).catch(err => {
            console.log(err)
        })
    }

    const deleteCard = (id) => {
        $api.delete(`/cards/${id}`)
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
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                <Layout/>
                <Routes>
                    <Route path="/" element={<Header/>}/>
                    <Route path="/projects" element={<Projects/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/registration" element={<RegistrationForm/>}/>
                    {/*<Route path="/home" element={<Home/>}/>*/}
                    <Route path="/gallery" element={<AnimalsGallery/>}/>
                    <Route path='/tasks' element={<TasksList/>}/>
                    <Route path="/kanban" element={
                        <Suspense fallback={<div>
                            <Loader/>
                        </div>}>
                            <KanbanBoard
                                loading={loading}
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
    );
}

export default App;
