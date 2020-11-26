const fs = require('fs');
const readline = require('readline');
const { isContext } = require('vm');
const f = require('./ParsingFunctions/Action')
const g = require('./ParsingFunctions/Game')
const t = require('./ParsingFunctions/Tree')
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('example.log')
});

var teamlist = [new g.Team("1"), new g.Team("2"),
                new g.Team("3"), new g.Team("4"),
                new g.Team("5"), new g.Team("6"),
                new g.Team("7"), new g.Team("8"),
                new g.Team("9"), new g.Team("10"),
                new g.Team("11"),new g.Team("12"),
                new g.Team("13"),new g.Team("14"),
                new g.Team("15"),new g.Team("16")]

var ThisGame = new g.Game(new g.Team("1"), new g.Team("2"));
var ThisTournament = new t.Tournament(16, teamlist);
var Actions = [];
var CT_Score = 0;
var TER_Score = 0;
var switched = false;
var match_is_running = true;

function Starts()
{
  Actions = [];
  CT_Score = 0;
  TER_Score = 0;
  switched = false;
}

function WinRound(isterro)
{
  if (isterro)
    TER_Score += 1;
  else
    CT_Score += 1;
}

function getName(str)
{
  var res = str.substring(0, str.indexOf("<"))
  if (res === "Player")
    return str.substring(0, str.indexOf("<") + 3)
  return res
}

function IsinList(str, Game)
{
  for (let index = 0; index < Game.Team1.Players.length; index++) {
    if (Game.Team1.Players[index].Name === str) {
      return true
    }
  }
  for (let index = 0; index < Game.Team2.Players.length; index++) {
    if (Game.Team2.Players[index].Name === str) {
      return true
    }
  }
  return false
}

function Switch()
{
  if (!switched)
  {
    var tmp = CT_Score;
    CT_Score = TER_Score;
    TER_Score = tmp;
    switched = true;
  }
}

function TidyActions()
{
  var index = 0;
  while (Actions.length > index) {

    if (!IsinList(getName(Actions[index].from), ThisGame)) {
      if (Actions[index].from.includes("<CT>") && switched) {
        ThisGame.Team1.Players.push(new g.Player(getName(Actions[index].from)))
      }
      else if (Actions[index].from.includes("<TERRORIST>") && switched) {
        ThisGame.Team2.Players.push(new g.Player(getName(Actions[index].from)))
      }
    }


    if (Actions[index].what === "Killed") {

      for (let i = 0; i < ThisGame.Team1.Players.length; i++) {
        
        if (ThisGame.Team1.Players[i].Name === getName(Actions[index].from)) {
          ThisGame.Team1.Players[i].Kills += 1;
        }
        else {
          if (ThisGame.Team1.Players[i].Name === getName(Actions[index].to))
            ThisGame.Team1.Players[i].Deaths += 1;
        }
      }

      for (let i = 0; i < ThisGame.Team2.Players.length; i++) {
        if (ThisGame.Team2.Players[i].Name === getName(Actions[index].from)) {
          ThisGame.Team2.Players[i].Kills += 1;
        }
        else {
          if (ThisGame.Team2.Players[i].Name === getName(Actions[index].to))
            ThisGame.Team2.Players[i].Deaths += 1;
        }
      }  
    }


    if (Actions[index].what === "Assist") {
      for (let i = 0; i < ThisGame.Team1.Players.length; i++) {
        if (ThisGame.Team1.Players[i].Name === getName(Actions[index].from))
          ThisGame.Team1.Players[i].Assists += 1;
      }

      for (let i = 0; i < ThisGame.Team2.Players.length; i++) {
        if (ThisGame.Team2.Players[i].Name === getName(Actions[index].from))
          ThisGame.Team2.Players[i].Assists += 1;
      }  
    }

    index += 1;
  }
}

function print2DUtil(node)  
{  
    if (node == null)  
        return;  
    print2DUtil(node.left);
    if (node.data != null)
      console.log(node.data.Name)
    print2DUtil(node.right);  
} 


function DisplayTournament(tournament)
{
  print2DUtil(tournament.Tree.root)
  var game;
  var line = readline.createInterface(process.stdin, process.stdout);
  line.question("What Team do you want to see play ?  ", (team) => {
    game = t.getGameOfTeam(team)
    console.log("Team : " + team + " is playing..." )
    tournament.Tree.root = t.TeamWon(tournament.Tree.root, team)
    console.log("Team " + team + " has won and advances the bracket !" )
    print2DUtil(tournament.Tree.root)
    line.close();
  });
}


function DisplayResult() 
{
  if (match_is_running) {
    match_is_running = false
    ThisGame.Team1.Score = TER_Score
    ThisGame.Team2.Score = CT_Score
    TidyActions()

    console.log("TEAM 1 SCORE : " + CT_Score)
    for (let index = 0; index < ThisGame.Team1.Players.length; index++) {
      const element = ThisGame.Team1.Players[index];
      console.log("K:"+ element.Kills + " D:" + element.Deaths + " A:" + element.Assists + "  " + element.Name)
    }

    console.log("TEAM 2 SCORE : " + TER_Score)
    for (let index = 0; index < ThisGame.Team2.Players.length; index++) {
      const element = ThisGame.Team2.Players[index];
      console.log("K:"+ element.Kills + " D:" + element.Deaths + " A:" + element.Assists + "  " + element.Name)
    }
    console.log("------------------------")
    if (CT_Score > 15)
      console.log("CT Wins !")
    if (TER_Score > 15)
      console.log("TERRORISTS Wins !")
    if (TER_Score === 15 && CT_Score === 15)
      console.log("THAT'S A DRAW !")
    console.log("------------------------")
  }
}
  
lineReader.on('line', function (line) {

  if (line.includes("attacked"))
    Actions.push(f.parseAttack(line));
  if (line.includes("killed"))
    Actions.push(f.parseKilled(line));
  if (line.includes("assisted killing"))
    Actions.push(f.parseAssist(line));


  if (line.includes("Team \"TERRORIST\" triggered") || line.includes("Team \"CT\" triggered"))
    WinRound(line.includes("Team \"TERRORIST\" triggered"))


  if (line.includes("World triggered \"Match_Start\""))
    Starts()

  if (line.includes(": Game Over: "))
    DisplayTournament(ThisTournament);
    //DisplayResult()

  if (line.includes("switched from team"))
    Switch() //ONCE

})//.on('close', DisplayResult)