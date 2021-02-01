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
    TeamWon : function TeamWon(node, name)
    {
        if (node === null)
            return null
        if (node.left != null && node.left.data != null && node.left.data.Name === name) {
            node.data = node.left.data
            node.left = null
            node.right = null
        }
        else if (node.right != null && node.right.data != null && node.right.data.Name === name) {
            node.data = node.right.data
            node.left = null
            node.right = null
        }
        else {
            node.left = TeamWon(node.left, name)
            node.right = TeamWon(node.right, name)
        }
        return node
    },
}
