# servicebus-bus-common
[![Build Status](https://travis-ci.org/patrickleet/servicebus-bus-common.svg?branch=master)](https://travis-ci.org/patrickleet/servicebus-bus-common)
[![codecov](https://codecov.io/gh/patrickleet/servicebus-bus-common/branch/master/graph/badge.svg)](https://codecov.io/gh/patrickleet/servicebus-bus-common) [![Greenkeeper badge](https://badges.greenkeeper.io/patrickleet/servicebus-bus-common.svg)](https://greenkeeper.io/)

## Usage Example

```
#!/bin/sh 
":" //# http://sambal.org/?p=1014 ; exec /usr/bin/env node --experimental-modules "$0" "$@"

import path from 'path'
import log from 'llog'
import errortrap from 'errortrap'
import registerHandlers from 'servicebus-register-handlers'
import { makeBus, handleError } from 'servicebus-bus-common';
import { config } from '../config.mjs'

errortrap()

const bus = makeBus(config)
const { queuePrefix } = config

registerHandlers({
  bus,
  handleError,
  path:  path.resolve(process.cwd(), 'handlers'),
  queuePrefix
})

log.info('service is running')
```

### Config

```
{
  prefetch: 10,
  queuePrefix: 'microservice',
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL
  }
}
```