import React from 'react';
import animals from '../images/animals.PNG';
import backlog from '../images/backlog.PNG';
import animals_2 from '../images/animal_2.PNG';
import kanban from '../images/kanban.PNG';
import todolist_1 from '../images/todolist_1.PNG';

const data = [
    {name: "Animals", image: animals},
    {name: "Kanban", image: kanban},
    {name: "TodoList", image: todolist_1},
    {name: "Backlog", image: backlog},
    {name: "Animals_2", image: animals_2}
]

const Projects = () => {
    return (
        <div className="container-fluid" style={{marginTop: 20}}>
            <div className="row mx-3">
                {data.map((el, index) => (
                    <div key={index} className="col-md-4 col-auto mb-3">
                        <div className="card p-0 d-flex flex-column justify-content-between"
                             style={{
                                 display: 'flex', flexDirection: 'column', height: '100%',
                                 //boxShadow: '1px 1px 2px #888888, -1px -1px 2px #888888',
                                 // boxShadow: '2px 2px 4px #888888, -2px -2px 4px #888888',
                                 boxShadow: '2px 4px 4px #888888',
                             }}>
                            <img src={el.image} className="card-img-top" alt="..." style={{height: '60%'}}/>
                            <div className="card-body" style={{height: '40%'}}>
                                <h5 className="card-title">{el.name}</h5>
                                <p className="card-text">
                                    Some quick example text to build on the card title and make up the bulk of the
                                    card's content.
                                </p>
                                <div className="card-links">
                                    <a href="mailto:kuz@gmail.com" target="_blank" rel="noopener noreferrer" className="card-link">
                                        Contact me
                                    </a>
                                    {/*    <a href="#" className="card-link">*/}
                                    {/*        Another link*/}
                                    {/*    </a>*/}
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
