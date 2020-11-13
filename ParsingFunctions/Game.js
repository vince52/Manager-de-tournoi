class Player {
    constructor(Name) {
      this.Name = Name;
      this.Kills = 0;
      this.Deaths = 0;
      this.Assists = 0;
    }
}

class Team {
    constructor() {
      this.Players = [];
      this.Score = 0
    }
}

class Game {
    constructor() {
      this.Team1 = new Team();
      this.Team2 = new Team();
    }
}


module.exports = {
    Player : class Player {
        constructor(Name) {
          this.Name = Name;
          this.Kills = 0;
          this.Deaths = 0;
          this.Assists = 0;
        }
    },
    Team : class Team {
        constructor() {
          this.Players = [];
          this.Score = 0
        }
    },
    Game : class Game {
        constructor() {
          this.Team1 = new Team();
          this.Team2 = new Team();
        }
    },
}