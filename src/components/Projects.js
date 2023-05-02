import React from 'react';
import {data} from '../projectsData'
// import animals from '../images/animals.PNG';
// import backlog from '../images/backlog.PNG';
// import kanban from '../images/kanban.PNG';
// import todolist_1 from '../images/todolist_1.PNG';

// const data = [
//     {name: "Animals", image: animals, link: "/animals"},
//     {name: "Kanban", image: kanban, link: "/kanban"},
//     {name: "Backlog", image: backlog, link: "/kanban/backlog"},
//     {name: "TodoList", image: todolist_1, link: "/tasks"},
// ]

const Projects = () => {
    return (
        <div className="container-fluid" style={{marginTop: 20}}>
            <div className="row mx-3">
                {data.map((el, index) => (
                    <div key={index} className="col-md-4 col-auto mb-3">
                        <div className="card p-0 d-flex flex-column justify-content-between"
                             style={{
                                 display: 'flex', flexDirection: 'column', height: 400,
                                 //boxShadow: '1px 1px 2px #888888, -1px -1px 2px #888888',
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
                                        Live Here
                                    </a>
                                    <a href="https://github.com/Dmitrii126776" target="_blank" rel="noopener noreferrer"
                                       className="card-link" style={{textDecoration: "none"}}>
                                        GitHub
                                    </a>
                                    {/*<a href="mailto:kuzhilind@gmail.com" target="_blank" rel="noopener noreferrer"*/}
                                    {/*   className="card-link">*/}
                                    {/*    Contact Me*/}
                                    {/*</a>*/}
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


// import React, {useEffect} from 'react';
// import animals from '../images/animals.PNG';
// import backlog from '../images/backlog.PNG';
// import kanban from '../images/kanban.PNG';
// import todolist_1 from '../images/todolist_1.PNG';
//
// const data = [
//     {
//         name: 'Animals',
//         image: animals,
//         link: '/animals',
//         description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
//     },
//     {
//         name: 'Kanban',
//         image: kanban,
//         link: '/kanban',
//         description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
//     },
//     {
//         name: 'Backlog',
//         image: backlog,
//         link: '/kanban/backlog',
//         description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
//     },
//     {
//         name: 'TodoList',
//         image: todolist_1,
//         link: '/tasks',
//         description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
//     },
// ];

// const Projects = () => {
//     useEffect(() => {
//         const cardTexts = document.querySelectorAll('.card-text');
//         cardTexts.forEach((cardText) => {
//             const text = cardText.textContent;
//             if (text.length > 100) {
//                 cardText.textContent = text.slice(0, 100) + '...';
//             }
//         });
//     }, []);
//
//     return (
//         <div className="container-fluid" style={{marginTop: 20}}>
//             <div className="row mx-3">
//                 {data.map((el, index) => (
//                     <div key={index} className="col-md-4 col-auto mb-3">
//                         <div
//                             className="card p-0 d-flex flex-column justify-content-between"
//                             style={{
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 height: '100%',
//                                 boxShadow: '2px 4px 4px #888888',
//                                 // boxShadow: '1px 1px 2px #888888, -1px -1px 2px #888888',
//                                 // boxShadow: '2px 2px 4px #888888, -2px -2px 4px #888888',
//                             }}
//                         >
//                             <img
//                                 src={el.image}
//                                 className="card-img-top"
//                                 alt="..."
//                                 style={{height: '50%'}}
//                             />
//                             <div className="card-body" style={{height: '50%'}}>
//                                 <h5 className="card-title">{el.name}</h5>
//                                 <div id={`card-text-${index}`} className="card-text">{el.description}</div>
//                                 <div className="card-links">
//                                     <a
//                                         href={`${el.link}`}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="card-link"
//                                     >
//                                         LiveHere
//                                     </a>
//                                     <a
//                                         href="https://github.com/Dmitrii126776"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="card-link"
//                                     >
//                                         GitHub
//                                     </a>
//                                     <a href="mailto:kuzhilind@gmail.com" target="_blank" rel="noopener noreferrer"
//                                        className="card-link">
//                                         Contact
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default Projects;



