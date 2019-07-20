import $ from 'jquery';
import 'popper.js';
import 'bootstrap'
const socket = io('/'); //exposed on window object from layout.pug


window.addEventListener("keydown", onKeyDown, false);

function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
        case 68: //d
            socket.emit('Move', {
                player: 0,
                x: 1,
                y: 0
            })
            break;
        case 83: //s
            socket.emit('Move', {
                player: 0,
                x: 0,
                y: 1
            })
            break;
        case 65: //a
            socket.emit('Move', {
                player: 0,
                x: -1,
                y: 0
            })
            break;
        case 87: //w
            socket.emit('Move', {
                player: 0,
                x: 0,
                y: -1
            })
            break;
        case 82: //w
            socket.emit('Reset', {
            })
            break;
        case 32: //w
            socket.emit('Shoot', {
            })
            break;
    }
}

const State = () => {
    let canvas = document.getElementById("mainCanvas");
    return {
        scale: 4,
        ctx: canvas.getContext("2d"),
        canvas: canvas
    }
}

let state = State();
const logic = {};

logic.flush = () => {
    state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height)
}

logic.drawPlayers = (data) => {
    logic.drawDot(data.playerx[0], data.playery[0], "#FF0000")
    logic.drawDot(data.playerx[1], data.playery[1], "#FF0000")
}

logic.drawBullets = (data) => {
    for (let index = 0; index < data.bulletsx.length; index++) {
        logic.drawDot(data.bulletsx[index], data.bulletsy[index], "#000000")
    }
}

logic.drawDot = (x, y, color) => {
    state.ctx.fillStyle = color;
    console.log(x + " " + y)
    state.ctx.fillRect((x + 1) * state.scale, (y + 1) * state.scale, 1 * state.scale, 1 * state.scale)
}


socket.on('ConfirmConnection', () => {
    console.log('%c Connected to server.', 'color:green')
})

socket.on('GameStateUpdate', (data) => {
    console.log(data)
    logic.flush()
    logic.drawPlayers(data)
    logic.drawBullets(data)
})


// Try to open server connection.
socket.emit('NewConnection', { d: 'brandon' })
