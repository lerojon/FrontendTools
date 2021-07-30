// ----------------------------------------------------------
//    功能：根据身份证号获得出生日期和性别
//    参数：身份证号 psidno
//    返回值：
//    出生日期 性别
// ----------------------------------------------------------
export function birthDayAndSexOfIdCard(idCard) {
  const card = {
    sex: null,
    birthDay: null,
    age: null
  }
  if (idCard.length === 18) {
    card.sex = idCard.substring(14, 17) % 2 === 0 ? 'e3c4d593ebd74937956b124a28ad32a5' : 'e473db455cda42b09aa3925d5c071ddb' // e3c4d593ebd74937956b124a28ad32a5 女
    const [year, month, day] = [idCard.substring(6, 10), idCard.substring(10, 12), idCard.substring(12, 14)]
    card.birthDay = year + '-' + month + '-' + day
    const nowDate = new Date()
    card.age = nowDate.getFullYear() - year
    if (nowDate.getMonth() + 1 < month) {
      card.age -= 1
    }
    if ((nowDate.getMonth() + 1 === month) && nowDate.getDate() < day) { card.age -= 1 }
  } else if (idCard.length === 15) {
    card.sex = idCard.substring(14, 15) % 2 === 0 ? '1' : '0'
    const [year, month, day] = [idCard.substring(6, 8), idCard.substring(8, 10), idCard.substring(10, 12)]
    card.birthDay = '19' + year + '-' + month + '-' + day
    const nowDate = new Date()
    card.age = nowDate.getFullYear() - year
    if (nowDate.getMonth() + 1 < month) {
      card.age -= 1
    }
    if ((nowDate.getMonth() + 1 === month) && nowDate.getDate() < day) { card.age -= 1 }
  }
  return card
}
// 链接 转换为下载地址
export function downloadUrlFormat(code, row, objSourceMap) {
  const file = row && row[code]
  const file_obj = objSourceMap && objSourceMap[code]
  const fileObj = file && file_obj && file_obj[file]
  if (fileObj && fileObj.preview_url) {
    return '<a target="_blank" href="' + fileObj.preview_url + '">下载</a>'
  }
}
export function downloadListUrlFormat(code, row) {
  const fileCaseObjAttrId = row && row['caseObjAttrIdMap'] && row['caseObjAttrIdMap'][code]
  const fileObj = fileCaseObjAttrId && row.caseObjAttrMap && row.caseObjAttrMap[fileCaseObjAttrId]
  if (fileObj && fileObj.preview_url) {
    return '<a target="_blank" href="' + fileObj['preview_url'] + '">下载</a>'
  }
}
// ----------------------------------------------------------
//    功能：根据身份证号获得出生日期
//  参数：身份证号 psidno
//    返回值：
//    出生日期
// ----------------------------------------------------------
export function GetBirthday(psidno) {
  let birthdayno, birthdaytemp
  if (psidno.length === 18) {
    birthdayno = psidno.substring(6, 14)
  } else if (psidno.length === 15) {
    birthdaytemp = psidno.substring(6, 12)
    birthdayno = '19' + birthdaytemp
  } else {
    return false
  }
  const birthday =
    birthdayno.substring(0, 4) +
    '-' +
    birthdayno.substring(4, 6) +
    '-' +
    birthdayno.substring(6, 8)
  return birthday
}

// ----------------------------------------------------------
//    功能：根据身份证号获得性别
//  参数：身份证号 psidno
//    返回值：
//    性别
// ----------------------------------------------------------
export function Getsex(psidno, sexObj) {
  let sex // sexno,
  // if (psidno.length === 18) {
  //   sexno = psidno.substring(16, 17)
  // } else if (psidno.length === 15) {
  //   sexno = psidno.substring(14, 15)
  // } else {
  //   return false
  // }
  // let tempid = sexno % 2
  // if (tempid == 0) {
  sex =
    parseInt(psidno.substr(16, 1)) % 2 === 1 ? sexObj.f : sexObj.m
  // }
  // else {
  //   sex = idConfig.personnel.sales.sex.m;
  // }
  return sex
}

// ----------------------------------------------------------
//  功能：根据生日获取年龄
//  参数：出生日期 strBirthday  格式形如 1994-06-12
//  返回值：年龄
// ----------------------------------------------------------
export function GetAgeByBirth(strBirthday) {
  let returnAge
  const strBirthdayArr = strBirthday.split('-')
  const birthYear = strBirthdayArr[0]
  const birthMonth = strBirthdayArr[1]
  const birthDay = strBirthdayArr[2]

  const d = new Date()
  const nowYear = d.getFullYear()
  const nowMonth = d.getMonth() + 1
  const nowDay = d.getDate()

  if (nowYear == birthYear) {
    returnAge = 0// 同年 则为0岁
  } else {
    const ageDiff = nowYear - birthYear // 年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        const dayDiff = nowDay - birthDay// 日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        const monthDiff = nowMonth - birthMonth// 月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = -1// 返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge// 返回周岁年龄
}

// ----------------------------------------------------------
//  功能：根据当前日期获取截止年限
//  参数：截止年限  格式形如 5(5年) 10(10年) 20(20年)
//  返回值：截止年限
// ----------------------------------------------------------
export function GetEndDayByNowDay(year) {
  let endDay = ''
  const now = new Date()
  const endyear = Number(now.getFullYear()) + year
  let endMonth = Number(now.getMonth()) + 1
  let endDate = Number(now.getDate())
  if (endMonth < 10) {
    endMonth = '0' + endMonth
  }
  if (endDate > 1) {
    endDate -= 1
    if (endDate < 10) {
      endDate = '0' + endDate
    }
  } else {
    endMonth -= 1
    if (endMonth < 10) {
      endMonth = '0' + endMonth
    }
    if (endMonth === 0) {
      endMonth = 12
    }
    endDate = new Date(endyear, endMonth, 0).getDate()
  }
  endDay = endyear + '-' + endMonth + '-' + endDate
  return endDay
}

