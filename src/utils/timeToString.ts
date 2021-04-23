/**
 * convert time to two digits string
 * @param num time number
 */
export default (num: number): string => (num < 10 ? `0${num}` : num.toString())
