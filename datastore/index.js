const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId( (err, id) => {
    const filePath = path.join(this.dataDir, `${id}.txt`);
    fs.writeFile(filePath, text, (err) => {
      if (err) {
        throw err;
      } else {
        callback(null, {id, text});
      }
    });
  });
};

exports.readAll = (callback) => {
  fs.readdir(this.dataDir, (err, files) => {
    var results = [];

    for (var i = 0; i < files.length; i++) {
      var newObj = {}
      newObj.id = files[i].slice(0,5);
      newObj.text = files[i].slice(0,5);
      results.push(newObj);
    }
    callback(null, results);
  })
};

exports.readOne = (id, callback) => {
  var filePath = path.join(this.dataDir, `${id}.txt`);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(err);
    } else {
      var result = {
        id: id,
        text: data.toString()
      };
      callback(null, result);
    }
  });
};

exports.update = (id, text, callback) => {
  var filePath = path.join(this.dataDir, `${id}.txt`);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(err);
    } else {
      fs.writeFile(filePath, text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }
  });
  
};

exports.delete = (id, callback) => {
  var filePath = path.join(this.dataDir, `${id}.txt`);

  fs.readFile(filePath, (err,data) => {
    if (err) {
      callback(err);
    } else {
      fs.unlink(filePath, (err) => {
        callback();
      });
    }
  })
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};




// exports.create = (text, callback) => {
//   var id = counter.getNextUniqueId();
//   items[id] = text;
//   callback(null, { id, text });
// };



// exports.readAll = (callback) => {
//   var data = _.map(items, (text, id) => {
//     return { id, text };
//   });
//   callback(null, data);
// };


// exports.readOne = (id, callback) => {
//   var text = items[id];
//   if (!text) {
//     callback(new Error(`No item with id: ${id}`));
//   } else {
//     callback(null, { id, text });
//   }
// };


// exports.update = (id, text, callback) => {
//   var item = items[id];
//   if (!item) {
//     callback(new Error(`No item with id: ${id}`));
//   } else {
//     items[id] = text;
//     callback(null, { id, text });
//   }
// };

// exports.delete = (id, callback) => {
//   var item = items[id];
//   delete items[id];
//   if (!item) {
//     // report an error if item not found
//     callback(new Error(`No item with id: ${id}`));
//   } else {
//     callback();
//   }
// };