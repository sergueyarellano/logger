Simple logger
===

Purpose of this logger is to provide simple JSON logs.

If a correlationID is not passed when creating the log instance, a collision resistant id is generated with [cuid](https://www.npmjs.com/package/cuid)

# usage
```js
// file1.js
const log = require('@sergueyarellano/logger')()

log.info('Init session')

/*
{
    "level": "INFO",
    "message": "Init session",
    "correlationID": "ckiqdesvu000407ief1nphdwd"
}
*/

log.trace('new trace', {"version": "0","region": "us-east-1",})

/*
{
    "level": "TRACE",
    "message": "new trace",
    "correlationID": "ckiqdesvu000407ief1nphdwd",
    "payload": {
        "version": "0",
        "region": "us-east-1",
    }
}
*/
```
```js
// file2.js
const log = require('@sergueyarellano/logger')()
const currentID = log.getCorrelationID() // returns current correlationID "ckiqdesvu000407ief1nphdwd"

log.warn('warning message')

/*
{
    "level": "WARN",
    "message": "warning message",
    "correlationID": "ckiqdesvu000407ief1nphdwd"
}
*/

log.error('inside a catch', new Error('Something went wrong'))

/*
{
    "level": "ERROR",
    "message": "Something went wrong",
    "stack": "at file path..... at file path...",
    "context": "inside a catch",
    "correlationID": "ckiqdesvu000407ief1nphdwd"
}
*/
```

# Reuse an external correlationID

```js
const correlationID = 'qqq'
const log = require('@sergueyarellano/logger')(correlationID)

log.info('Init session')

/*
{
    "level": "INFO",
    "message": "Init session",
    "correlationID": "qqq"
}
*/
```