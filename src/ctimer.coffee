`#!/usr/bin/env node
`

child_process = require 'child_process'

moment = require 'moment'
posix = require 'posix'
yargs = require 'yargs'
spawnargs = require 'spawn-args'

argv = yargs
  .usage 'Usage: ctimer [options] command'
  .nargs 's', 1
  .describe 's', 'Time to Run command'
  .nargs 'e', 1
  .describe 'e', 'Time to Stop command'
  .demand 1
  .help 'h'
  .alias 'h', 'help'
  .argv

timeToStart = if argv.s? then moment(argv.s) else undefined
timeToEnd = if argv.e? then moment(argv.e) else undefined

command = (yargs.parse argv._[0])._[0]
args = spawnargs(argv._[0][command.length..])

interval = if timeToStart? then timeToStart - (new Date()) else 0
interval = if interval < 0 then 0 else interval

run = ->
  child = child_process.spawn command, args, {'stdio': 'inherit'}
  if timeToEnd?
    interval = if timeToEnd? then timeToEnd - (new Date()) else 0
    interval = if interval < 0 then 0 else interval
    stop = ->
      child_process.execFile 'kill', ['TERM', "-#{posix.getpgid(0)}"]
    setTimeout stop, interval
setTimeout run, interval
