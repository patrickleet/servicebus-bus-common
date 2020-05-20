const servicebus = require('@servicebus/rabbitbus')
const retry = require('@servicebus/retry')
const log = require('llog')

module.exports.handleError = function (msg, err) {
  log.error('error handling %s: %s. rejecting message w/ cid %s and correlationId %s.', msg.type, err, msg.cid, this.correlationId)
  log.error(err)
  msg.handle.reject(throwErr(err))
}

const throwErr = function (err) {
  throw err
}

module.exports.throwErr = throwErr

const onBusReady = function (bus, resolve) {
  resolve(bus)
}

module.exports.onBusReady = onBusReady

module.exports.makeBus = function ({
  redis = {
    host: 'localhost',
    port: '6379'
  },
  prefetch,
  rabbitmq = {
    url: 'amqp://localhost:5672'
  },
  queuePrefix,
  enableConfirms = true
} = {}) {
  return new Promise((resolve, reject) => {
    const bus = servicebus.bus({
      enableConfirms,
      prefetch,
      ...rabbitmq,
      queuePrefix
    })

    bus.use(bus.logger())
    bus.use(bus.package())
    bus.use(bus.correlate())

    bus.use(retry({
      store: new retry.RedisStore({
        ...redis
      })
    }))

    bus.on('ready', onBusReady(bus, resolve))
  })
}
