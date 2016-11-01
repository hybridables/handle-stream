'use strict'

module.exports = function handleStream (val, done) {
  if (!utils.isNodeStream(val)) {
    throw new TypeError('handle-stream: expect `val` to be a stream')
  }
  if (typeof done !== 'function') {
    throw new TypeError('handle-stream: expect `done` to be function')
  }
  var stream = utils.streamExhaust(val)

  process.once('newListener', function onNewListener (name) {
    this.removeAllListeners(name)
  })
  process.once('uncaughtException', function onerror (err) {
    stream.emit('error', err)
  })

  utils.onStreamEnd(stream, done)
}
