const State = () => ({
    playerx: [0, 100],
    playery: [0, 100],
    bullets: [],
    playerids: [],
    frame: 0
})

let state = State();
const logic = {};

logic.getPlayerIndex = (id) => {
    return state.playerids.indexOf(id)
}

logic.shootBullet = (bullet) => {
    playerId = logic.getPlayerIndex(bullet.player)
    state.bullets.push({
        x: state.playerx[playerId],
        y: state.playery[playerId],
        vx: [1, -1][playerId],
        vy: 0,
    })
}

logic.addMotion = (motion) => {
    playerId = logic.getPlayerIndex(motion.player)
    console.log(playerId)
    state.playerx[playerId] += motion.x;
    state.playery[playerId] += motion.y;
    for (let index = 0; index < 2; index++) {
        state.playerx[index] = Math.min(state.playerx[index], 99)
        state.playery[index] = Math.min(state.playery[index], 99)
        state.playerx[index] = Math.max(state.playerx[index], 0)
        state.playery[index] = Math.max(state.playery[index], 0)
    }
}

logic.reset = () => {
    console.log("Reset")
    let socketIds = state.playerids;
    state = State();
    state.playerids = socketIds;
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

logic.updateGameState = () => {
    for (let index = 0; index < state.bullets.length; index++) {
        state.bullets[index].x += state.bullets[index].vx;
        state.bullets[index].y += state.bullets[index].vy;
    }
    state.bullets = state.bullets.filter((elem) => (0 <= elem.x && elem.x <= 100 && 0 <= elem.y && elem.y <= 100));
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
    dict['bulletsx'] = state.bullets.map((elem) => (elem.x));
    return dict
}

let dictAddBulletsy = (dict) => {
    dict['bulletsy'] =state.bullets.map((elem) => (elem.y));
    return dict
}

module.exports = logic