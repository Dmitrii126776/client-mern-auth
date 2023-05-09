import animals from "./images/animals.gif";
import kanban from "./images/kanban_long.gif";
import backlog from "./images/backlog.gif";
import todolist_1 from "./images/todolist_1.PNG";
import profile from "./images/profile.gif";

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
        description: "TodoList connect with MongoDB through ExpressJS server for store data. " +
            "All other pages also contain awesome Footer with links."
    },
    {
        name: "Profile",
        image: profile,
        link: "/profile",
        description: "You can see current weather data, which are fetched from the OpenWeather service " +
            "and map of New York City"
    },
]
