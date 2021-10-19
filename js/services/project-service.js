'use strict'

var gProjects = [
    {
        id: "mineSweeper",
        name: "MineSweeper",
        title: "The old game in a new edition",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem temporibus sapiente nobis atque illo repudiandae alias voluptatibus tempora quam quasi?",
        url: '/projects/mineSweeper/index.html',
        publishedAt: 1630277123509,
        labels: ["Matrixes", "keyboard events"],
        homePage: '/projects/ballBoard/index.html'
    },
    {
        id: "bookShop",
        name: "Book Shop",
        title: "An example of an inventory management site",
        desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius nisi voluptate nesciunt nihil enim cumque officia animi a vero fugit?",
        url: '/projects/bookShop/index.html',
        publishedAt: 1631137123509,
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "todos",
        name: "ToDo's",
        title: "Responsive application for creating tasks",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus neque numquam eligendi, quaerat vitae necessitatibus cupiditate adipisci. Necessitatibus, ipsa dolores?",
        url: '/projects/todos/index.html',
        publishedAt: 1631997123509,
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "pacman",
        name: "Pacman",
        title: "The old game in the first edition",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, quis atque! Sapiente enim maiores blanditiis voluptates nobis eveniet quos rerum!",
        url: '/projects/pacman/index.html',
        publishedAt: 1632857123509,
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "touchNums",
        name: "Touch Nums",
        title: "Better push those numbers fast!",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae impedit officia quis asperiores fugit beatae, libero consequatur voluptates. Cumque, nam.",
        url: '/projects/touchNums/index.html',
        publishedAt: 1633717123509,
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "ballBoard",
        name: "Ball Board",
        title: "A cute and adorable game",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus neque numquam eligendi, quaerat vitae necessitatibus cupiditate adipisci. Necessitatibus, ipsa dolores?",
        url: '/projects/ballBoard/index.html',
        publishedAt: 1634577123509,
        labels: ["Matrixes", "keyboard events"],
    },
]

function getProjects() {
    return gProjects
}

function getProjectById(projectid) {
    var project = gProjects.find(function (project) {
        return projectid === project.id
    })
    return project
}

function openProject(projectid) {
    var project = getProjectById(projectid)
    window.open(project.url, '_blank').focus();
}
