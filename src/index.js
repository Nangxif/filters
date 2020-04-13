function filterToDateAndTime(data, type = 'DateAndTime', separator = '-') {
  let date = new Date(data);
  let dateTime = `${date.getFullYear()}${separator}${
    date.getMonth() + 1
  }${separator}${date.getDate()}`;
  let hour = `${
    date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
  }`;
  let minute = `${
    date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
  }`;
  let second = `${
    date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
  }`;
  if (type === 'Date') {
    return `${dateTime}`;
  } else if (type === 'Time') {
    return `${hour}:${minute}:${second}`;
  } else if (type === 'Week') {
    return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][
      date.getDay()
    ];
  } else {
    return `${dateTime} ${hour}:${minute}:${second}`;
  }
}
// count最多保留几位小数
function filterToDecimal(data, count = 1) {
  if (Number.isInteger(data)) {
    return data;
  } else {
    let returnVal = data.toFixed(count);
    return Number(returnVal);
  }
}
/*
data 转换的数
originUnit 原始单位
transitionUnit 转换单位
SystemNum 进制
count 最多保留几位小数
*/

function filterToSystem(
  data,
  originUnit = 'g',
  transitionUnit = 'kg',
  SystemNum = 1000,
  count = 1
) {
  if (data >= SystemNum) {
    return `${filterToDecimal(data / SystemNum, count)}${transitionUnit}`;
  } else {
    return `${data}${originUnit}`;
  }
}

/*
用于分隔电话号码以及银行卡号
interval 隔几位
symbol 隔开符号
*/

function filterToSeparation(data, interval = 3, symbol = ',') {
  let returnVal = '';
  let reverseVal = data.toString().split('').reverse().join('');
  let finVal;
  for (let i = 0; i < Math.ceil(reverseVal.length / interval); i++) {
    returnVal += `${reverseVal.slice(i * interval, (i + 1) * interval)}${
      i == Math.ceil(reverseVal.length / interval) - 1 ? '' : symbol
    }`;
  }
  finVal = returnVal.split('').reverse().join('');
  return finVal;
}
/*
替换字符
包含start不包含end
*/

function filterToHide(data, start, end, symbol = '*') {
  let item = new Array(end - start).fill(symbol);
  let val = data.toString().split('');
  return [...val.slice(0, start), ...item, ...val.slice(end)].join('');
}

/**
 * 大小写转换
 */

function filterToTextTransform(data, type = 'AllInitialUpper') {
  // let exp = new RegExp(/\s+[A-za-z]/,"g");
  let exp = new RegExp(/\s+/, 'g');
  let dataCopy = data.replace(exp, ' ');
  let strArray = dataCopy.split(' ');
  let symbol = [
    ',',
    '.',
    '!',
    '?',
    ';',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '[',
    ']',
    '{',
    '}',
    '<',
    '>'
  ];
  let symbolExp = new RegExp(
    /(\,|\.}|\!|\?|\;|\@|\#|\$|\%|\^|\&|\*|\(|\)|\[|\]|\{|\}|\<|\>)(\s*|\n*)([a-zA-z])/,
    'g'
  );
  let result;
  if (type === 'AllInitialUpper' || type === 'AllInitialLower') {
    result = strArray.reduce((total, item) => {
      if (item[0] !== undefined) {
        if (symbol.includes(item[0])&&item[1]) {
          return `${total}${item[0]}${
            type == 'AllInitialUpper'
              ? item[1].toUpperCase()
              : item[1].toLowerCase()
          }${item.slice(2)} `;
        } else {
          return `${total}${
            type == 'AllInitialUpper'
              ? item[0].toUpperCase()
              : item[0].toLowerCase()
          }${item.slice(1)} `;
        }
      }
      return total;
    }, '');
  } else if (type === 'InitialUpper' || type === 'InitialLower') {
    dataCopy = dataCopy.replace(symbolExp, res => {
      return `${res.slice(0, -1)}${
        type == 'InitialUpper'
          ? res.slice(-1).toUpperCase()
          : res.slice(-1).toLowerCase()
      }`;
    });
    result = `${
      type == 'InitialUpper'
        ? dataCopy.slice(0, 1).toUpperCase()
        : dataCopy.slice(0, 1).toLowerCase()
    }${dataCopy.slice(1)}`;
  } else if (type === 'Upper' || type === 'Lower') {
    result = type === 'Upper' ? dataCopy.toUpperCase() : dataCopy.toLowerCase();
  }
  return result.trim();
}

export default {
  filterToDateAndTime,
  filterToDecimal,
  filterToSystem,
  filterToSeparation,
  filterToHide,
  filterToTextTransform
};
