class Roster {
    constructor() {
        this._players = []
    }

    getPlayers() {
        return this._players
    }

    setPlayers(players) {
        this._players = players
    }

    doItNice(str) {
        let words = str.split('_')
        words.forEach(w => { w = w.charAt(0).toUpperCase() + w.slice(1)})
        return words.join(' ');
    }
}
