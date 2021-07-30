export function getFormatDate(dayCount, fmt) {
  const date = new Date()
  date.setDate(date.getDate() + dayCount)
  return dateformat.call(date, fmt)
}
export function getFormatYear(yearCount, fmt) {
  const date = new Date()
  date.setFullYear(date.getFullYear() + yearCount)
  return dateformat.call(date, fmt)
}
export function getFormatYearDate(yearCount, dayCount, fmt) {
  const date = new Date()
  date.setDate(date.getDate() + dayCount)
  date.setFullYear(date.getFullYear() + yearCount)
  return dateformat.call(date, fmt)
}

export function getDateFormatDate(date, dayCount, fmt) {
  date.setDate(date.getDate() + dayCount)
  return dateformat.call(date, fmt)
}
export function getDateFormatYear(date, yearCount, fmt) {
  date.setFullYear(date.getFullYear() + yearCount)
  return dateformat.call(date, fmt)
}
export function getDateFormat(date, yearCount, dayCount, fmt) {
  date.setFullYear(date.getFullYear() + yearCount)
  date.setDate(date.getDate() + dayCount)
  return dateformat.call(date, fmt)
}
export function dateformat(fmt) {
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
