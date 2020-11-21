class Renderer {
    constructor() {
        this.resultsTemplate = Handlebars.compile($("#results-template").html())
        this.statsTemplate = Handlebars.compile($("#stats-template").html())
    }

    renderResults(players) {
        $("#results-container").empty()
        const resultsHTML = this.resultsTemplate(players)
        $("#results-container").append(resultsHTML)
    }

    doItNice(str) {
        let words = str.split('_')
        // words.forEach(w => { w = (w[0].toUpperCase() + w.slice(1))})
        return words.join(' ');
    }

    renderStats(stats) {
        let statsArr = Object.entries(stats)
        let newStats = []
        statsArr.forEach(([key, value]) => newStats.push({
            key: (this.doItNice(key))[0].toUpperCase() + (this.doItNice(key)).slice(1),
            value
        }))
        const statsHTML = this.statsTemplate(newStats)
        return this.statsTemplate(newStats)
    }
}