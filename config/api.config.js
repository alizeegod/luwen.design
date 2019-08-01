/**
 * Author: alizeegod
 * Create Time: 2019-08-01 16:15
 * Description:
 */
const apiJson = require('./api.json')
const { NODE_ENV } = require('../environment')

module.exports = apiJson[NODE_ENV]
