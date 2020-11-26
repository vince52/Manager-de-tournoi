const g = require('./Game')

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
    CreateTournament : function CreateTournament(list) {
        if (list.length == 1)
          return new module.exports.Node(list[0], null, null);
        else
        {
          var fst = [];
          var snd = [];
          var size = list.length;
          for (let i = 0; i < size / 2; i++)
            fst.push(list[i]);
          for (let i = size / 2; i < size; i++)
            snd.push(list[i]);
          return new module.exports.Node(null, CreateTournament(fst), CreateTournament(snd));
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
    getGameOfTeam : function getGameOfTeam(node, name)
    {
        if (node.left != null && node.right != null && 
            node.left.data != null && node.right.data != null &&
            (node.left.data.Name === name || node.right.data.Name === name)) {
                return new g.Game(node.left.data, node.right.data)
        }
        if (node.left != null && getGameOfTeam(node.left, name) != null)
            return getGameOfTeam(node.left, name)
        if (node.right != null && getGameOfTeam(node.left, name) != null)
            return getGameOfTeam(node.right, name)
        return null
    },
    BinaryTree : class BinaryTree { 
        constructor(li) {
          this.list = module.exports.resorting(li);
          this.root = module.exports.CreateTournament(this.list); 
        }  
    },
    Node : class Node { 
        constructor(data, left, right) {
            this.data = data; 
            this.left = left; 
            this.right = right; 
        } 
    },
    Tournament : class Tournament {
        constructor(size, list) {
          this.ok;
          var pow2 = isPowOfTwo(size);
          if (pow2 == -1 || list.length != size || size == 1) 
          {
            this.ok = false;
          }
          else
          {
            this.ok = true;
            this.Tree = new module.exports.BinaryTree(list);
          } 
        }
    },
}