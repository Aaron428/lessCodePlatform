/**
 * 生成随机含 数字、字母 的字符串
 * @returns id: string
 */
export const generateId = (): string => {
  let id = ''
  for (let i = 1; i < 15; i++) {
    let isLetter = Math.round(Math.random())

    if (i % 5 === 0) {
      id += '-'
    } else {
      if (isLetter) {
        id += String.fromCharCode(Math.floor(Math.random() * 26) + 'a'.charCodeAt(0))
      } else {
        id += Math.floor(Math.random() * 10)
      }
    }
  }
  return id
}
