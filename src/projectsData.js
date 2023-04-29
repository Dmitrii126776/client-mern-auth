import animals from "./images/animals.PNG";
import kanban from "./images/kanban.PNG";
import backlog from "./images/backlog.PNG";
import todolist_1 from "./images/todolist_1.PNG";

export const data = [
    {
        name: "Animals",
        image: animals,
        link: "/animals",
        description: "I use Material UI for different filters and search. All data is stored in MongoDB through ExpressJS server."
    },
    {
        name: "Kanban",
        image: kanban,
        link: "/kanban",
        description: "Drag & Drop Kanban Board App, MongoDB, ExpressJS for Back-end, Bootstrap for Front-End. All data connect with Backlog."
    },
    {
        name: "Backlog",
        image: backlog,
        link: "/kanban/backlog",
        description: "Awesome Prime-React features for pagination, filters and searches. All data connect with Kanban Board."
    },
    {
        name: "TodoList",
        image: todolist_1,
        link: "/tasks",
        description: "TodoList connect with MongoDB through ExpressJS server for store data."
    },
]