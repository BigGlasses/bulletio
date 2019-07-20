const State = () => ({
    playerx: [0, 100],
    playery: [0, 100],
    bulletsx: [],
    bulletsy: [],
    playerids: [],
    frame: 0
})

let state = State();
const logic = {};

logic.addMotion = (motion) => {
    playerId = state.playerids.indexOf(motion.player)
    state.playerx[playerId] += motion.x;
    state.playery[playerId] += motion.y;
    for (let index = 0; index < 2; index++) {
        state.playerx[index] = Math.min(state.playerx[index], 99)
        state.playery[index] = Math.min(state.playery[index], 99)
        state.playerx[index] = Math.max(state.playerx[index], 0)
        state.playery[index] = Math.max(state.playery[index], 0)
    }
    console.log(state.playerx)
}

logic.toDict = () => {
    let out = {}
    return dictAddFrame(dictAddBulletsPos(dictAddPlayerPos(out)))
}

logic.addPlayer = (id) => {
    state.playerids.push(id)
    while (state.playerids.length > 2)
        state.playerids.shift()
}

let dictAddFrame = (dict) => {
    dict['frame'] = state.frame
    return dict
}

let dictAddPlayerPos = (dict) => {
    return dictAddPlayerx(dictAddPlayery(dict))
}

let dictAddPlayerx = (dict) => {
    dict['playerx'] = state.playerx
    return dict
}

let dictAddPlayery = (dict) => {
    dict['playery'] = state.playery
    return dict
}

let dictAddBulletsPos = (dict) => {
    return dictAddBulletsx(dictAddBulletsy(dict))
}

let dictAddBulletsx = (dict) => {
    dict['bulletsx'] = state.bulletsx;
    return dict
}

let dictAddBulletsy = (dict) => {
    dict['bulletsy'] = state.bulletsy;
    return dict
}

module.exports = logic