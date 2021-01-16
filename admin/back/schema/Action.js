class Action {
    constructor(from, to, what, where, how) {
      this.from = from;
      this.what = what;
      this.where = where;
      this.to = to;
      this.how = how;
    }
}


module.exports = {

Action : class Action {
    constructor(from, to, what, where, how) {
      this.from = from;
      this.what = what;
      this.where = where;
      this.to = to;
      this.how = how;
    }
},



parseKilled : function parseKilled(line)
{
  var tmp = line.substring(
    line.lastIndexOf(": \"") + 1, 
    line.lastIndexOf(" killed")
  );
  
  var from = tmp.substring(
    tmp.lastIndexOf(" \"") + 2,
    tmp.lastIndexOf("\" [")
  );

  var where = tmp.substring(
    tmp.lastIndexOf("[") + 1,
    tmp.lastIndexOf("]")
  );

  tmp = line.substring(
    line.lastIndexOf("killed ") + 6, 
    line.lastIndexOf("with")
  );

  var to = tmp.substring(
    tmp.lastIndexOf(" \"") + 2,
    tmp.lastIndexOf("\" [")
  );

  var how = tmp.substring(
    tmp.lastIndexOf("with ") + 5,
    tmp.lastIndexOf("\"")
  );

  var act = new Action(from, to, "Killed", where, how);
  return act;
},



parseAttack : function parseAttack(line)
{
  var tmp = line.substring(
    line.lastIndexOf(": \"") + 2, 
    line.lastIndexOf(" attacked")
  );

  var from = tmp.substring(
    tmp.lastIndexOf("\"") + 1,
    tmp.lastIndexOf("\" [")
  );

  var where = tmp.substring(
    tmp.lastIndexOf("[") + 1,
    tmp.lastIndexOf("]")
  );

  tmp = line.substring(
    line.lastIndexOf("attacked ") + 9, 
    line.lastIndexOf("with")
  );

  var to = tmp.substring(
    tmp.lastIndexOf("\"") + 1,
    tmp.lastIndexOf("\" [")
  );

  var how = tmp.substring(
    tmp.lastIndexOf("with ") + 5,
    tmp.lastIndexOf("\" (")
  );

  var act = new Action(from, to, "Attack", where, how);
  return act;
},




parseAssist : function parseAssist(line)
{
  var from = line.substring(
    line.lastIndexOf(": \"") + 3, 
    line.lastIndexOf(" assisted killing ")
  );

  var to = line.substring(
    line.lastIndexOf(" assisted killing ") + 18, 
    line.lastIndexOf(">\"")
  );

  var act = new Action(from, to, "Assist", "", "");
  return act;
}



}