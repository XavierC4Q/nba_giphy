import * as NBA from 'nba'

const isValidTeamName = (name) => {
    const teamName = name.split('')
    if(teamName.length !== 2){
        return false
    }

    const first = `${teamName[0].charAt(0).toUpperCase()}${teamName[0].slice(1).toLowerCase()}`
    const last = `${teamName[1].charAt(0).toUpperCase()}${teamName[1].slice(1).toLowerCase()}`

    return `${first} ${last}`
}

export const isNBAPlayer = (name) => {
    const player = NBA.findPlayer(name)
    return player
}

export const isNBATeam = (teamName) => {
    const validName = isValidTeamName(teamName)
    if(validName){
        const team = NBA.teams.find(team => team.teamName === validName)
        if(team){
            return team
        }
        return false
    }
   return false
}