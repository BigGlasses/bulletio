const Game = require('./game.js');

const defaultEvents = (socket) => {

    const pushGameState = () => {
        socket.emit("GameStateUpdate",
        Game.toDict())
    }

    socket.on("Move", (data) => {
        // /console.log("Move")
        data.player = socket.id
        console.log(data)
        Game.addMotion(data)
        pushGameState()
    })

    socket.on('NewConnection', (data) => {
        console.log("NewConnection")
        console.log(data)
        
        socket.emit('ConfirmConnection')
        pushGameState()
    })

    setInterval(pushGameState, 50)
}


const init = async (io) => {
    io.on('connection', (socket) => {
        defaultEvents(socket)
        console.log('we have a connection socket.id', socket.id)
        Game.addPlayer(socket.id)
    });
}


module.exports = init