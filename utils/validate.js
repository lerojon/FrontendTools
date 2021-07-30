/**
 * Created by jiachenpan on 16/11/18.
 */
export function validExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/* 合法uri*/
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/* 小写字母*/
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
/**
 * 手机验证
 */
export function validMobile(value) {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(value)
}
/**
 * 字节数校验
 */
export function minByte(val, _min) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    const a = val.charAt(i)
    if (a.match(/[^\x00-\xff]/ig) != null) {
      len += 2
    } else {
      len += 1
    }
  }
  if (len >= _min) {
    return true
  } else {
    return false
  }
}
export function maxByte(val, _max) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    const a = val.charAt(i)
    if (a.match(/[^\x00-\xff]/ig) != null) {
      len += 2
    } else {
      len += 1
    }
  }
  if (len <= _max) {
    return true
  } else {
    return false
  }
}
/*
* 身份证15位编码规则：dddddd yymmdd xx p
* dddddd：6位地区编码
* yymmdd: 出生年(两位年)月日，如：910215
* xx: 顺序编码，系统产生，无法确定
* p: 性别，奇数为男，偶数为女
*
* 身份证18位编码规则：dddddd yyyymmdd xxx y
* dddddd：6位地区编码
* yyyymmdd: 出生年(四位年)月日，如：19910215
* xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女
* y: 校验码，该位数值可通过前17位计算获得
*
* 前17位号码加权因子为 Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
* 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
* 如果验证码恰好是10，为了保证身份证是十八位，那么第十八位将用X来代替
* 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
* i为身份证号码1...17 位; Y_P为校验码Y所在校验码数组位置
*/
export function validIdCard(idCard) {
  // 15位和18位身份证号码的正则表达式
  const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  // 如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length === 18) {
      const idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 将前17位加权因子保存在数组里
      const idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2] // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
      let idCardWiSum = 0 // 用来保存前17位各自乖以加权因子后的总和
      for (let i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i]
      }
      const idCardMod = idCardWiSum % 11// 计算出校验码所在数组的位置
      const idCardLast = idCard.substring(17)// 得到最后一位身份证号码
      // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod === 2) {
        if (idCardLast === 'X' || idCardLast === 'x') {
          return true
        } else {
          return false
        }
      } else {
        // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast === '' + idCardY[idCardMod]) {
          return true
        } else {
          return false
        }
      }
    } else if (idCard.length === 15) { // 验证15位数身份证号码中的生日是否是有效生日
      const [year, month, day] = [idCard.substring(6, 8), idCard.substring(8, 10), idCard.substring(10, 12)]
      const temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))
      if (temp_date.getYear() !== parseFloat(year) || temp_date.getMonth() !== parseFloat(month) - 1 || temp_date.getDate() !== parseFloat(day)) {
        return false
      } else {
        return true
      }
    }
  } else {
    return false
  }
}

/**
 *姓名中文校验
 *
 */
export function validName(value) {
  const reg = /^[\u4E00-\u9FA5]{2,10}$/
  // if (reg.test(value)) {
  //   return true
  // }
  // toast('姓名必须为2个及以上的汉字组成')
  return reg.test(value)
}

/**
 * 两位小数金钱校验
 */
export function validMoney(value) {
  const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  return value ? reg.test(value) : true
}
