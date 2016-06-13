# plover-logger


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]


【核心模块】提供统一的日志接口，让使用者不用关心日志实现，方便日志实现切换。

## Usage
```js
const log = require('plover-logger')('namespace');

log.info('init application: %s', name);
log.error(e);
log.debug('data return: %o', data);
log.warn('data already exist: %o', o);
```

## Level
分为`error`, `warn`, `info`, `debug`四个日志级别。

| name | priority |
|:-----|:--------:|
| error | 1 |
| warn | 2 |
| info | 3 |
| debug | 4 |

日志级别从高到低分别为:

`error` > `warn` > `info` > `debug`

日志级别默认为`warn`，此时仅显示`error`、`warn`级别的日志信息。可以通过设置`DEBUG`环境变量来显示`namespace`下`info`和`debug`级别的日志信息。例如：

```bash
$ DEBUG=namespace node example/app
```

**Note**

更多`DEBUG`的设置方式，请参考[debug模块](https://github.com/visionmedia/debug).


[npm-image]: https://img.shields.io/npm/v/plover-logger.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/plover-logger
[travis-image]: https://img.shields.io/travis/plover-modules/plover-logger/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/plover-modules/plover-logger
[coveralls-image]: https://img.shields.io/codecov/c/github/plover-modules/plover-logger.svg?style=flat-square
[coveralls-url]: https://codecov.io/github/plover-modules/plover-logger?branch=master
