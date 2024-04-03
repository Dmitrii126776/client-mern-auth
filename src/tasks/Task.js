import React, {useState} from 'react';
import {createTodayDate} from "../support";
import UpdateTaskModal from "./UpdateTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";

const Task = (props) => {
    const {task, updateTask, deleteTask} = props;
    const [checkedTaskCompleted, setCheckedTaskCompleted] = useState(task.completed.status);
    const [dateTaskCompleted, setDateTaskCompleted] = useState(task.completed.date);

    const handleTaskCompleted = (event) => {
        const isChecked = event.target.checked;
        setCheckedTaskCompleted(isChecked);
        setDateTaskCompleted(isChecked ? createTodayDate() : '');
        const completedTask = {
            completed: {status: isChecked, date: isChecked ? createTodayDate() : ''}
        };
        updateTask(task._id, completedTask);
    };

    return (
        <div>
            <li className="list-group-item" style={{margin: 5, boxShadow: '1px 1px 1px #888888'}}
                data-testid="task-item">
                <div className="d-flex task-section"
                     style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{marginRight: '10px'}}>
                            <input onChange={handleTaskCompleted} data-testid="task-checkbox"
                                   type={'checkbox'} checked={checkedTaskCompleted}/>
                        </div>
                        <div style={{marginRight: '10px'}} data-testid="task-created-date">
                            Created: {task.created.date}
                        </div>
                        <span style={{
                            marginLeft: '30px',
                            fontWeight: 'bold', textDecoration: checkedTaskCompleted ? 'line-through' : 'none'
                        }} data-testid="task-created-name">
                                   {task.name}
                         </span>
                    </div>

                    <div className="button-container"
                         style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
                        {checkedTaskCompleted ? (
                            <div data-testid="task-completed-date">Completed: {dateTaskCompleted}</div>
                        ) : (
                            <div style={{marginRight: '10px'}}>
                                <UpdateTaskModal task={task} updateTask={updateTask}/>
                            </div>
                        )}
                        <div className="mobile" style={{marginLeft: '10px'}}>
                            <DeleteTaskModal deleteTask={deleteTask} task={task}/>
                        </div>
                    </div>
                </div>
            </li>
        </div>
    );
};
export default Task;
// <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task._id)}>Delete</button>

// return (
//     <div>
//         {/*<li className='list-group-item form-control'*/}
//         {/*    style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>*/}
//         <li className="list-group-item">
//             <div className="d-flex"
//                  style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
//                 <div style={{display: 'flex', alignItems: 'center'}}>
//                     <input onChange={handleTaskCompleted} type={'checkbox'} checked={checkedTaskCompleted}/>
//                     {' '}
//                     <span style={{textDecoration: checkedTaskCompleted ? 'line-through' : 'none'}}>
//         {task.name}
//       </span>{' '}
//                     Was created: {task.created.date}{' '}
//                 </div>
//                 <ModalWindow buttonLabel={'Update'} title={'Update task'} task={task}/> {' '}
//                 <div>
//                     {checkedTaskCompleted && (
//                         <>
//                             Was completed: {dateTaskCompleted}
//                             {' '}
//                         </>
//                     )}
//
//                     <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task._id)}>Delete</button>
//                 </div>
//             </div>
//         </li>
//         {/*</li>*/}
//     </div>
// );



