import React, { useEffect, useState } from 'react'
import { removePxAndConverseToNumber } from '@utils/index'
import { DIRECTION_MAP } from '@shared/constants'
import '@shared/editableBox/index.css'
import './App.css'

let isDown = false
const points: EditableBoxType.DireactionType[] = ['e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw']
let operateDirectioin: EditableBoxType.DireactionType = ''
let oriPos = { top: 0, left: 0, x: 0, y: 0 }
let prevStyle = {
  left: 0,
  top: 0,
  width: 100,
  height: 100
}

const TestComp = () => {
  const handleMove = (e: MouseEvent) => {
    if (isDown && operateDirectioin !== '') {
      const dom = document.getElementById('test')
      if (dom) {
        const domStyle = { ...prevStyle }

        const offsetX = e.clientX - oriPos.x
        const offsetY = e.clientY - oriPos.y
        switch (operateDirectioin) {
          case DIRECTION_MAP.移动:
            domStyle.left = offsetX + oriPos.left
            domStyle.top = offsetY + oriPos.top
            break
          // 东
          case DIRECTION_MAP.右:
            domStyle.width += offsetX
            break
          // 西
          case DIRECTION_MAP.左:
            domStyle.width -= offsetX
            domStyle.left += offsetX
            break
          // 南
          case DIRECTION_MAP.下:
            domStyle.height += offsetY
            break
          // 北
          case DIRECTION_MAP.上:
            domStyle.height -= offsetY
            domStyle.top += offsetY
            break
          // 东北
          case DIRECTION_MAP.上右:
            domStyle.height -= offsetY
            domStyle.top += offsetY
            domStyle.width += offsetX
            break
          // 西北
          case DIRECTION_MAP.上左:
            domStyle.height -= offsetY
            domStyle.top += offsetY
            domStyle.width -= offsetX
            domStyle.left += offsetX
            break
          // 东南
          case DIRECTION_MAP.下右:
            domStyle.height += offsetY
            domStyle.width += offsetX
            break
          // 西南
          case DIRECTION_MAP.下左:
            domStyle.height += offsetY
            domStyle.width -= offsetX
            domStyle.left += offsetX
            break
          default:
            return
        }
        dom.style.width = `${domStyle.width}px`
        dom.style.height = `${domStyle.height}px`
        dom.style.left = `${domStyle.left}px`
        dom.style.top = `${domStyle.top}px`
      }
    }
  }

  const handleDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    direction: EditableBoxType.DireactionType
  ) => {
    e.stopPropagation()
    operateDirectioin = direction
    isDown = true
    const y = e.clientY
    const x = e.clientX
    oriPos = {
      ...prevStyle,
      x,
      y
    }
  }

  const handleUp = (e: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    isDown = false
    operateDirectioin = ''
    const dom = document.getElementById('test')
    if (dom) {
      const left = removePxAndConverseToNumber(dom.style.left)
      const top = removePxAndConverseToNumber(dom.style.top)
      const width = removePxAndConverseToNumber(dom.style.width)
      const height = removePxAndConverseToNumber(dom.style.height)
      prevStyle = { height, width, left, top }
    }
  }

  useEffect(() => {
    document.addEventListener('mousemove', e => handleMove(e))
    return document.removeEventListener('mousemove', handleMove)
  }, [])

  useEffect(() => {
    document.addEventListener('mouseup', e => handleUp(e))
    return document.removeEventListener('mouseup', handleUp)
  }, [])

  return (
    <div
      id="test"
      style={prevStyle}
      onMouseDown={e => handleDown(e, 'move')}
      onMouseUp={e => handleUp(e)}
    >
      {points.map(item => (
        <div
          key={item}
          className={`control-point point-${item}`}
          onMouseDown={e => handleDown(e, item)}
          onMouseUp={e => handleUp(e)}
        ></div>
      ))}
    </div>
  )
}

export default TestComp
