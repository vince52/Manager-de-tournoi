const fs = require('fs');
const readline = require('readline');
const { isContext } = require('vm');
const f = require('./ParsingFunctions/Action')
const g = require('./ParsingFunctions/Game')
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('example.log')
});

var ThisGame = new g.Game();
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

  //if (line.includes("scored"))  //Score du round je pense que c'est usefull pour plus tard
  //  parseScored(line);

  if (line.includes("World triggered \"Match_Start\""))
    Starts()

  if (line.includes(": Game Over: "))
    DisplayResult()

  if (line.includes("switched from team"))
    Switch() //ONCE

}).on('close', DisplayResult)