
import { isDate, isObject } from './utils'
/**
 * 定义encodeURIComponent方法，将参数特殊符号转为URI编码
 * 注意：根据XHR规定，'@' ':' '$' ',' '+' '[' ']'特殊字符不需要转义，需要使用replace方法进行还原操作
 */
function encode(value: string) :string {
    return encodeURIComponent(value)
           .replace(/%40/g, '@')
           .replace(/%3A/ig, ':')
           .replace(/%24/g, '$')
           .replace(/%2C/ig, ',')
           .replace(/%20/g, '+')
           .replace(/%5B/ig, '[')
           .replace(/%5D/ig, ']');
}
/**
 * 将参数与url拼接，生成新的url
 */
export default function buildUrl (url: string, params?: any):string{
    // 如果参数为空，直接返回url
    if(!params){
        return url
    }
    // 创建空数组，保存拼接好的参数项 之后通过&符号 拼合为完整的参数字符串
    var parts: string[] = [];
    /**
     * 通过Object.keys获取params的keys
     * 对keys数组进行遍历，获取params的每条参数，并对其进行加工
     */
    Object.keys(params).forEach(key => {
        // 缓存当前拿到的参数项
        let val = params[key];
        // 判断如果当前参数项为空，则不进行任何操作，跳出该次循环
        if(val === null || typeof val === 'undefined'){
            return;
        }
        //否则创建临时数组，保存使用 '=' 拼接完成的参数项字符串
        let values = [];
        /**判断当前参数项数据类型  准备进行降维操作
         * 如果是Array类型，则直接复制给临时数组，并按照XHR数据格式，为key添加'[]'数组标识
         * 否则将参数项转为数组，复制给临时数组。
         */
        if(Array.isArray(val)){
            values = val;
            key += '[]';
        }else{
            values = [val];
        }
        /**
         * 遍历临时数组，判断当前值的类型，按照类型将参数值分别转换为XHR规定的数据格式
         * 如果是Date类型，则使用toISOString（）将其转换为ISO通用日期类型
         * 如果是Object类型，则对其进行JSON字符串转换
         * 最后将键值对由 '=' 拼接为字符串插入待完整拼接的parts数组中
         */
        values.forEach(val => {
            if(isDate(val)){
                val = val.toISOString()
            }else if (isObject(val)){
                val = JSON.stringify(val);
            }
            parts.push(`${encode(key)}=${encode(val)}`)
        })
        
        /**
         * 将转换好的参数字符串数组使用&符号拼接为完整字符串
         * 判断url是否存在hash，如果存在，将hash过滤
         * 判断url是否已经存在参数，如果存在，则使用&连接，否则使用？连接
         */
        let serializedParams = parts.join('&');
        if(serializedParams){
            const hashIndex = url.indexOf('#');
            if(hashIndex > -1){
                url = url.slice(0, hashIndex)
            }
            url += (url.indexOf('?') > -1 ? '&' : '?') + serializedParams
        }
        return url
    })
}