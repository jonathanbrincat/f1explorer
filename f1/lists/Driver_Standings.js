const {Text, Integer, Float} = require('@keystonejs/fields');
const {lockedAuth} = require('../auth/locked');
const {unlockedAuth} = require('../auth/unlocked');

const fields = {
    driverStandingsId: {
        type: Integer
    },
    raceId: {
        type: Integer
    },
    driverId: {
        type: Integer
    },
    points: {
        type: Integer
    },
    position: {
        type: Integer
    },
    wins: {
        type: Integer
    }
}

module.exports = {
    access: (process.env.NODE_ENV === 'development')? unlockedAuth : lockedAuth,
    fields
}

// "driverStandingsId" : 3, "raceId" : 18, "driverId" : 3, "points" : 6, "position" : 3, "positionText" : 3, "wins" : 0 }