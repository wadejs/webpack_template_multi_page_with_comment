/*
 * @Author: wadejs
 * @Date: 2018-10-17 12:01:29
 * @GitHub: 'https://github.com/wadejs'
 * @Blog: 'http://blog.wadejs.cn'
 * @Last Modified by: wadejs
 * @Last Modified time: 2018-12-10 16:38:49
 */

function getQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  let qs = ''
  if (r != null) qs = decodeURIComponent(r[2])
  return qs
};

export { getQueryString }
