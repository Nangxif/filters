# filters

一个过滤器集

### 一、包含的过滤器

| 过滤器              | 作用                                                         |
| ------------------- | ------------------------------------------------------------ |
| filterToDateAndTime | 将时间转换成规定格式                                         |
| filterToDecimal     | 最多保留几位小数                                             |
| filterToSystem      | 简单的进制转换                                               |
| filterToSeparation  | 规定固定位置用自定义分隔号隔开，用于分隔电话号码以及银行卡号等 |
| filterToHide        | 转换自定义位置字符                                           |

### 二、各自的用法

1.filterToDateAndTime

| 参数      | 默认值      | 可取值                     | 含义                 |
| --------- | ----------- | -------------------------- | -------------------- |
| data      | /           | 时间                       | 接收的数据           |
| type      | DateAndTime | DateAndTime、Date、Time    | 转换的类型           |
| separator | -           | 自定义的分隔字符或者字符串 | 用于分隔日期的分隔符 |

2.filterToDecimal

| 参数  | 默认值 | 可取值       | 含义             |
| ----- | ------ | ------------ | ---------------- |
| data  | /      | 数字，浮点数 | 接收的数据       |
| count | 1      | 正整数       | 最多保留几位小数 |

3.filterToSystem

| 参数           | 默认值 | 可取值   | 含义                                 |
| -------------- | ------ | -------- | ------------------------------------ |
| data           | /      | 数字     | 接收的数据                           |
| originUnit     | g      | 有效单位 | 小于进制时显示的原始单位             |
| transitionUnit | kg     | 有效单位 | 大于等于进制时显示的转换单位         |
| SystemNum      | 1000   | 正整数   | originUnit到transitionUnit的转换进制 |
| count          | 1      | 正整数   | 转换之后最多保留几位小数             |

4.filterToSeparation

| 参数     | 默认值 | 可取值       | 含义             |
| -------- | ------ | ------------ | ---------------- |
| data     | /      | 字符串       | 接收的数据       |
| interval | 3      | 正整数       | 隔几位插入symbol |
| symbol   | ,      | 自定义分隔符 | 分隔符           |

5.filterToHide

| 参数   | 默认值 | 可取值                              | 含义             |
| ------ | ------ | ----------------------------------- | ---------------- |
| data   | /      | 数字、字符串                        | 接收的数据       |
| start  | /      | 大于等于0的正整数                   | 起始位置，包含   |
| end    | /      | 大于start且小于等于data长度的正整数 | 终止位置，不包含 |
| symbol | *      | 自定义的替换字符                    | 替换的字符       |

### 三、导入及初始化

1.可以在vue中作为过滤器使用

```javascript
//按需注册
import Filters from "@nangxif/filters";
Vue.filter("filterToDateAndTime", Filters.filterToDateAndTime);

//一键注册
import Filters from "@nangxif/filters";
Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key]);
});

//eg:
{{ new Date() | filterToDateAndTime }}
```

2.在js中使用

```html
<script src="filters.min.js"></script>

<script>
Filters.filterToSystem(99,"cm","m",100);
</script>
```

