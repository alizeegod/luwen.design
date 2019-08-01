/**
 * Author: alizeegod
 * Create Time: 2019-08-01 16:19
 * Description:
 */
const environment = process.env
const NODE_ENV = environment.NODE_ENV
const isDevMode = Object.is(NODE_ENV, 'development')
const isProdMode = Object.is(NODE_ENV, 'production')

const isStatic = process && process.static
const isServer = process && process.server
const isBrowser = process && process.browser
const isModern = process && process.modern

module.exports = {
    NODE_ENV,
    environment,
    isDevMode,
    isProdMode,
    isStatic,
    isServer,
    isBrowser,
    isModern
}
