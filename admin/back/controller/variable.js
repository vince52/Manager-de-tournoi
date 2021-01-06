var _idtokeep = 0;

exports.getName = function() {
    return _idtokeep;
  };
exports.setName = function(idtokeep) {
//validate the name...
    _idtokeep = idtokeep;
};