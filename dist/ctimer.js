#!/usr/bin/env node
;
var args, argv, child_process, command, interval, moment, posix, run, spawnargs, timeToEnd, timeToStart, yargs;

child_process = require('child_process');

moment = require('moment');

posix = require('posix');

yargs = require('yargs');

spawnargs = require('spawn-args');

argv = yargs.usage('Usage: ctimer [options] command').nargs('s', 1).describe('s', 'Time to Run command').nargs('e', 1).describe('e', 'Time to Stop command').demand(1).help('h').alias('h', 'help').argv;

timeToStart = argv.s != null ? moment(argv.s) : void 0;

timeToEnd = argv.e != null ? moment(argv.e) : void 0;

command = (yargs.parse(argv._[0]))._[0];

args = spawnargs(argv._[0].slice(command.length));

interval = timeToStart != null ? timeToStart - (new Date()) : 0;

interval = interval < 0 ? 0 : interval;

run = function() {
  var child, stop;
  child = child_process.spawn(command, args, {
    'stdio': 'inherit'
  });
  if (timeToEnd != null) {
    interval = timeToEnd != null ? timeToEnd - (new Date()) : 0;
    interval = interval < 0 ? 0 : interval;
    stop = function() {
      return child_process.execFile('kill', ['TERM', "-" + (posix.getpgid(0))]);
    };
    return setTimeout(stop, interval);
  }
};

setTimeout(run, interval);
