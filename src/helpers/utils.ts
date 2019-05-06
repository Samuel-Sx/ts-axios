export function isDate(value: any) :value is Date{
    return Object.prototype.toString.call(value) === '[object Date]'
}

export function isObject(value: any) :value is Object{
    return (value !== null && typeof value === 'object')
}