const roster = new Roster()
const renderer = new Renderer()

$("#get-roster").on("click", function () {
    const input = $("input").val()
    $("input").val('')
    $.get(`/teams/${input}`, function(result){
        roster.setPlayers(result)
        renderer.renderResults(roster.getPlayers())
    })
})

$("#results-container").on("click", "img", function(){
    const name = $(this).closest("div").find("p:first-child").html().toLowerCase().split(" ")
    const section = $(this).closest("div")
    $.get(`/playerStats/${name[0]}/${name[1]}`, function(result){
        section.append(renderer.renderStats(JSON.parse(result)))
    })
})

$("#results-container").on("click", ".stats", function(){
    $(this).remove()
})

$("#results-container").on("click", ".addDream", function(){
    const name = $(this).closest("div").find("p:first-child").html().toLowerCase().split(" ")
    const players = roster.getPlayers()
    const player = players.find(p => (p.firstName.toLowerCase() == name[0] && p.lastName.toLowerCase() === name[1]))
    $.post("/roster", player, function(result){
        console.log(result)
    })
})

$("#dream-team").on("click", function () {
    $.get(`/dreamTeam`, function(result){
        roster.setPlayers(result)
        renderer.renderResults(roster.getPlayers())
    })
})