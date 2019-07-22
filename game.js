const State = () => ({
    playerx: [0, 100],
    playery: [0, 100],
    bullets: [],
    playerids: [],
    frame: 0
})

let state = State();

getState = () => {
    return { ...state }
}

const logic = {};

logic.getPlayerIndex = (state) => (id) => { // Pure
    return state.playerids.indexOf(id)
}

logic.shootBullet = (bullet) => { //Impure
    playerId = logic.getPlayerIndex(getState())(bullet.player);
    updateState(addBullet(state)(playerId)(bullet)) // State Update
}

addBullet = (state) => (playerId) => (bullet => {
    let newState = {
        ...state,
        bullets: state.bullets.concat([{
            x: state.playerx[playerId],
            y: state.playery[playerId],
            vx: [1, -1][playerId],
            vy: 0,
        }])
    }
    return newState
})

logic.addMotion = (motion) => {
    playerId = logic.getPlayerIndex(getState())(motion.player)
    updateState(addMotion(getState())(playerId)(motion)) // State Update
}

addMotion = (state) => (playerId) => (motion) => {
    state.playerx[playerId] += motion.x;
    state.playery[playerId] += motion.y;
    state.playerx[playerId] = Math.min(state.playerx[playerId], 99)
    state.playery[playerId] = Math.min(state.playery[playerId], 99)
    state.playerx[playerId] = Math.max(state.playerx[playerId], 0)
    state.playery[playerId] = Math.max(state.playery[playerId], 0)
    return state;
}

logic.reset = () => {
    let socketIds = state.playerids;
    state = reset(getState())
}

reset = (state) => {
    let socketIds = state.playerids;
    return {
        ...State(),
        playerids: socketIds}
}

logic.toDict = () => {
    let currState = {
        ...getState()
    } // Prevent racing!
    let dict = {}
    
    dict['frame'] = currState.frame
    dict['playerx'] = currState.playerx
    dict['playery'] = currState.playery
    dict['bulletsx'] = currState.bullets.map((elem) => (elem.x));
    dict['bulletsy'] = currState.bullets.map((elem) => (elem.y));
    return dict
}

logic.addPlayer = (id) => {
    let state = getState()
    state.playerids.push(id)
    while (state.playerids.length > 2)
        state.playerids.shift()
    updateState(state)
}

logic.updateGameState = () => {
    let state = getState()
    for (let index = 0; index < state.bullets.length; index++) {
        state.bullets[index].x += state.bullets[index].vx;
        state.bullets[index].y += state.bullets[index].vy;
    }
    state.bullets = state.bullets.filter((elem) => (0 <= elem.x && elem.x <= 100 && 0 <= elem.y && elem.y <= 100));
    updateState(state)
}

updateState = (newState) => {
    state = newState;
}

module.exports = logic