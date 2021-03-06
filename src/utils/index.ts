import React from 'react'

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

// 把数据转化成对应的样式
export const dataToStyle = (data: EditorType.IComp): React.CSSProperties => ({
  zIndex: data.layer,
  position: 'absolute',
  left: data.x,
  top: data.y,
  width: data.width,
  height: data.height
})
