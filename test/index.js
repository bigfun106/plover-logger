'use strict';


const util = require('util');
const sinon = require('sinon');

const Logger = require('..');

const createLogger = Logger;


/* global beforeEach, afterEach */

/* eslint no-console: 0, no-process-env: 0 */


describe('index', function() {
  beforeEach(function() {
    Logger.level = 'info';
    sinon.spy(Logger, 'handler');
  });


  afterEach(function() {
    Logger.handler.restore();
  });


  it('普通日志记录', function() {
    const log = createLogger('Test');

    log.info('init service: %s', 'test');

    Logger.handler.calledOnce.should.be.true();
    Logger.handler.getCall(0).args.should.eql(
      ['Test', 'info', 'init service: test']);

    const o = { name: 'test' };
    log.info('data: %o', o);

    Logger.handler.callCount.should.equal(2);
    getMessage(1).should.equal('data: ' + util.inspect(o));

    log.debug('some debug message');
    Logger.handler.callCount.should.equal(2);
  });


  it('异常日志记录', function() {
    const log = createLogger('Test Error');
    sinon.stub(console, 'error');

    try {
      throw new Error('some error happen');
    } catch (e) {
      log.error(e);

      Logger.handler.calledOnce.should.be.true();
      getMessage(0).should.equal(util.inspect(e) + '\n' + e.stack);
    }

    const e = new Error('no stack');
    e.stack = null;
    log.error(e);

    getMessage(1).should.equal(util.inspect(e));

    console.error.restore();
  });


  it('警告和错误时还会输出在控制台上', function() {
    const log = createLogger('Test Console');

    sinon.stub(console, 'error');
    sinon.stub(console, 'warn');

    log.error('some error happen');
    log.warn('some warn happen');

    console.error.called.should.be.true();
    console.warn.called.should.be.true();

    console.error.restore();
    console.warn.restore();
  });


  it('非格式化字符串原样输出', function() {
    const log = createLogger('NoFormatter');
    log.info('hi %i', 123);

    getMessage(0).should.equal('hi %i');
  });


  it('载入不同地址的日志模块能也保证是一个，这样可以正确设置level/handler', function() {
    const path = require.resolve('..');
    delete require.cache[path];
    Logger.should.equal(require('..'));
  });


  it('可以设置日志级别，并且对已构建的日志对象也生效', function() {
    const log = createLogger('PreInit');
    log.info('hello');
    Logger.handler.calledOnce.should.be.true();

    log.debug('work');
    Logger.handler.calledOnce.should.be.true();

    Logger.level = 'debug';
    log.debug('work');
    Logger.handler.callCount.should.be.equal(2);
  });


  it('默认日志级别为warn', function() {
    const path = require.resolve('..');
    delete require.cache[path];
    require(path).Logger.level.should.be.equal('warn');
  });


  it('设置DEBUG环境变量时，默认置logLevel=debug', function() {
    process.env.DEBUG = '*';
    Logger.level.should.be.equal('info');
    // 重新加载
    const path = require.resolve('..');
    delete require.cache[path];
    require(path).Logger.level.should.be.equal('debug');
  });


  function getMessage(index) {
    return Logger.handler.getCall(index).args[2];
  }
});

