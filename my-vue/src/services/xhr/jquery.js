import { rootPath, errHandler } from './config'
import eventEmitter from 'services/timeout'

const xhr = ({ url, body = null, method = 'get', other = {} }) => {
  const defer = $.Deferred()

  $.ajax({
    type: method,
    url: rootPath + url,
    data: body,
    ...other
    // xhrFields: { // 跨域允许带上 cookie
    //   withCredentials: [域名]
    // },
    // crossDomain: true
  })
  .done(defer.resolve)
  .fail(defer.reject)

  return defer.promise()
}

export default xhr