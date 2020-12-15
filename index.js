let globalCorrelationID = require('cuid')()

module.exports = (correlationID) => {
  globalCorrelationID = correlationID || globalCorrelationID
  return {
    info: info(globalCorrelationID),
    warn: warn(globalCorrelationID),
    error: error(globalCorrelationID),
    trace: trace(globalCorrelationID),
    getCorrelationID: () => globalCorrelationID
  }
}

function info (correlationID) {
  return (message) => {
    log({ message, level: 'INFO', correlationID })
  }
}

function warn (correlationID) {
  return (message) => {
    log({ message, level: 'WARN', correlationID })
  }
}

function error (correlationID) {
  return (context, error) => {
    log({ context, level: 'ERROR', correlationID, stack: error.stack, message: error.message })
  }
}

function trace (correlationID) {
  return (message, payload) => {
    log({ message, level: 'TRACE', correlationID, payload })
  }
}

function log ({ level, message, correlationID, stack, payload, context }) {
  const options = {
    level,
    message,
    correlationID,
    stack,
    payload,
    context
  }
  console.log(JSON.stringify(options, null, 2))
}
