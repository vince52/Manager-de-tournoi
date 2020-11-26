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
        constructor(name) {
          this.Name = name
          this.Players = [];
          this.Score = 0
        }
    },
    Game : class Game {
      constructor(T1, T2) {
        this.Team1 = T1;
        this.Team2 = T2;
      }
    },
}