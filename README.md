ctimer
======

ctimer runs a command at a given time. A time to stop the command can be specified as well.

This command line tool only runs on environments which support POSIX.

Install
-------

```
npm install -g ctimer
```

Example
-------

```
# Send HTTP request at specified time
ctimer -s '2016-04-17 20:00:00' 'curl http://example.com'
```

```
# Record a streaming video during specified time
ctimer -s '2016-04-17 21:00:00' -e '2016-04-17 22:30:00' 'stream-dl -o output.mp4 http://example.com/path/to/watch/page'
```
