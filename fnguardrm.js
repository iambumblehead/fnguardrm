var fs = require('fs'),
    argv = require('optimist').argv,
    path = require('path'),
    fnguard = require('fnguard'),
    UglifyJS = require('uglify-js');

var cmd = {
  log : function (opts, msg) {
    if (opts.verbose) {
      console.log(msg);
    }
  },

  read : function (opts, filename, fn) {
    cmd.log(opts, '[...] read: ' + filename);
    fs.readFile(filename, 'utf8', fn);
  },

  write : function (opts, filename, content, fn) {
    cmd.log(opts, '[...] write: ' + filename);
    fs.writeFile(filename, content, fn);
  },  

  splicestr : function (str, begin, end, replacement) {
    return str.substr(0, begin) + replacement + str.substr(end);
  },

  getastexprnodearr : function (str, exprstr) {
    var nodeArr = [],
        startposArr = [];

    UglifyJS.parse(str).walk(new UglifyJS.TreeWalker(function(node){
      if (node instanceof UglifyJS.AST_Call && 
          node.start.value === exprstr &&
          typeof node.start === 'object' && 
          typeof node.start.pos === 'number' &&
          startposArr.indexOf(node.start.pos) === -1) {

        startposArr.push(node.start.pos);
        nodeArr.push(node);
      }
    }));

    return nodeArr;
  },

  replace : function (str, exprstr, fn) {
    var i, consoleStrNodeArr = cmd.getastexprnodearr(str, exprstr);

    // now go through the nodes backwards and replace code
    for (i = consoleStrNodeArr.length; i--;) {
      str = fn(str, consoleStrNodeArr[i]);
    }
    return str;
  },

  getasmodifiedscriptstr : function (modification, str) {
    return cmd.types[modification](str);
  },

  // return given javascript string w/ fnguard use commented out
  // 
  // not robust. usable w/ unminified sources, fnguard calls are on own lines.
  comment : function (str) {
    return str.replace(/(^\s*[^/]fnguard[\n\r\s]*\.[^;]*;)/gm, function (m) {
      var spacelen = m.match(/^\s*/)[0].length;

      // loop through each newline...
      // comment-out along existing whitespace at begin of each newline
      // tries adding comment-out slashes to same position as those added on
      // same line as 'fnguard' match
      return m.replace(/^\s*/gm, function (match) {
        // try adding comment-out slashes to same place as original fnguard
        if (match.length < spacelen) {
          match = match + '// ';
        } else {
          match = cmd.splicestr(match, spacelen, spacelen, '// ');
        }

        return match;
      });
    });
  },

  // return given javascript string w/ fnguard use un-commented out
  // 
  // not robust. usable w/ unminified sources, fnguard calls are on own lines.
  uncomment : function (str) {
    return str.replace(/(^\s*(\/\/) fnguard[\n\r\s\/]*\.[^;]*;)/gm, function (m) {
      return m.replace(/^(\s*)\/\/\s/gm, function (match, g1) {
        return g1;
      });
    });
  },

  // return given javascript string w/ fnguard use replaced with "0"
  // 
  // robust. usable on minified sources.
  astremove : function (str) {    
    return cmd.replace(str, 'fnguard', function (str, node) {
      return cmd.splicestr(str, node.start.pos, node.end.endpos, '"0"');
    });
  }
};

cmd.types = {
  comment   : cmd.comment,
  uncomment : cmd.uncomment,
  astremove : cmd.astremove
};

// if called from command line...
if (require.main === module) { 
  // modifiers are: 
  //   [i]nput, [o]utput, [t]ype
  //
  // type: 
  //   [astremove|comment|uncomment]
  //
  // input and output are paths to files
  var inputpath = argv.i,
      outputpath = argv.o,
      type = argv.t,
      opts = { verbose : argv.v !== 'false' && argv.v ? true : false };

  if (!inputpath) {
    throw new Error('[!!!] input path must be given, ex.: -i /path/to/input.js');
  } else if (!outputpath) {
    throw new Error('[!!!] output path must be given, ex.: -o /path/to/output.js');
  } else if (!cmd.types[type]) {
    throw new Error('[!!!] type of modification must be given, ex.: -t comment');
  }

  cmd.read(opts, inputpath, function (err, filestr) {
    if (err) throw new Error(err);

    cmd.write(opts, outputpath, cmd.getasmodifiedscriptstr(type, filestr), function (err, res) {
      if (err) throw new Error(err);

      cmd.log(opts, '[...] finished.');
    });
  });
}

module.exports = cmd;
