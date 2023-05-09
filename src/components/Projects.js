import React from 'react';
import {data} from '../projectsData'

const Projects = () => {
    return (
        <div className="container-fluid" style={{marginTop: 20}}>
            <div className="row mx-3">
                {data.map((el, index) => (
                    <div key={index} className="col-md-4 col-auto mb-3">
                        <div className="card p-0 d-flex flex-column justify-content-between"
                             style={{
                                 display: 'flex', flexDirection: 'column', height: 400,
                                 // boxShadow: '2px 2px 4px #888888, -2px -2px 4px #888888',
                                 boxShadow: '2px 4px 4px #888888',
                             }}>
                            <h5 className="card-title" style={{marginTop: 10}}>{el.name}</h5>
                            <img src={el.image} className="card-img-top" alt="..." style={{height: '50%'}}/>
                            <div className="card-body" style={{height: '50%'}}>
                                <p style={{textAlign: "left"}} className="card-text">{el.description}</p>
                                <div className="card-links">
                                    <a href={`${el.link}`} target="_blank" rel="noopener noreferrer"
                                       className="card-link" style={{textDecoration: "none"}}>
                                        Website
                                    </a>
                                    <a href="https://github.com/Dmitrii126776" target="_blank" rel="noopener noreferrer"
                                       className="card-link" style={{textDecoration: "none"}}>
                                        GitHub
                                    </a>
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
