const express = require('express')
const router = express.Router()
const urllib = require('urllib');

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

const dreamTeam = []

router.get("/teams/:teamName", function (req, res) {
    const { teamName } = req.params
    const teamId = teamToIDs[teamName]
    urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (err, response) {
        const data = JSON.parse(response.toString()).league.standard
        const newData = data.filter(p => p.teamId === teamId && p.isActive).map(({ jersey, pos, firstName, lastName }) => ({
            firstName,
            lastName,
            jersey,
            pos,
            img: `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`
        }))
        console.log(newData)
        res.send(newData)
    })
})

router.get("/playerStats/:firstName/:lastName", function(req, res){
    const { firstName } = req.params
    const { lastName } = req.params
    urllib.request(`https://nba-players.herokuapp.com/players-stats/${lastName}/${firstName}`, function (err, response){
        res.send(response)
    })
})

router.put("/team", function(req, res){
    teamToIDs[req.body.teamName] = req.body.teamId
    res.send('Teams updated')
})

router.get("/dreamTeam", function(req, res){
    res.send(dreamTeam)
})

router.post("/roster", function(req, res){
    if (dreamTeam.length < 5){
        dreamTeam.push(req.body)
        res.send("Dream team updated")
    } else {
        res.send("Dream team full")
    }
    console.log(dreamTeam)
})

module.exports = router