const Match = require('./schemaMatch')

function isPowOfTwo(size) {
    if (size <= 0)
        return -1;
    if (size == 1)
        return 1;
    return 1 + isPowOfTwo(size/2);
}

module.exports = {
    resorting : function resorting(list) {
        var size = list.length;
        var ret = [];
        for (let i= 0; i < size / 2; i++) {
          ret.push(list[i])
          ret.push(list[size - i - 1]);
        }
        return ret;
    },
    CreateTournament : async function CreateTournament(list) {
        var obj = {}
        if (list.length == 2)
            return Match({ left_team: list[0], right_team: list[1], left: null, right: null}).save()
        else
        {
            var fst = [];
            var snd = [];
            var size = list.length;
            for (let i = 0; i < size / 2; i++)
                fst.push(list[i]);
            for (let i = size / 2; i < size; i++)
                snd.push(list[i]);
            var l = await CreateTournament(fst)
            var r = await CreateTournament(snd)
            var right = null
            var left = null
            if (l) {
                left = l._id
            }
            if (r) {
                right = r._id
            }    
            return Match({ left: l, right: r }).save()
        }
    },
    TeamWon : function TeamWon(match, id)
    {
        if (match === null)
            return null
        if (match.left != null &&
            match.left.left_team != null && match.left.right_team != null &&
            (match.left.right_team.id === id || match.left.left_team.id === id )) {
            if (match.left.right_team.id === id)
                match.left_team = match.left.right_team
            else
                match.left_team = match.left.left_team
        }
        else if (match.right != null &&
            match.right.left_team != null && match.right.right_team != null &&
            (match.right.right_team.id === id || match.right.left_team.id === id )) {
            if (match.right.right_team.id === id)
                match.right_team = match.right.right_team
            else
                match.right_team = match.right.left_team
        }
        else {
            match.left = TeamWon(match.left, id)
            match.right = TeamWon(match.right, id)
        }
        return match
    },
}
