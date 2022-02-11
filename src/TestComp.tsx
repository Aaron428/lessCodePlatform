import React, { useEffect, useState } from 'react'
import { removePxAndConverseToNumber } from '@utils/index'
import './App.css'

let isDown = false
let oriPos = { top: 0, left: 0, x: 0, y: 0 }

const TestComp = () => {
  const [style, setStyle] = useState({ left: 0, top: 0, width: 100, height: 100 })

  const handleMove = (e: MouseEvent) => {
    if (isDown) {
      const dom = document.getElementById('test')
      if (dom) {
        const newLeft = e.clientX - oriPos.x + oriPos.left
        const newTop = e.clientY - oriPos.y + oriPos.top
        dom.style.left = `${newLeft}px`
        dom.style.top = `${newTop}px`
      }
    }
  }

  const handleDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isDown = true
    const y = e.clientY
    const x = e.clientX
    oriPos = {
      ...style,
      x,
      y
    }
  }

  const handleUp = () => {
    isDown = false
    const dom = document.getElementById('test')
    if (dom) {
      const left = removePxAndConverseToNumber(dom.style.left)
      const top = removePxAndConverseToNumber(dom.style.top)
      setStyle({ ...style, left, top })
    }
    console.log()
  }

  useEffect(() => {
    document.addEventListener('mousemove', e => handleMove(e))

    return document.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div style={style} id="test" onMouseDown={handleDown} onMouseUp={handleUp}>
      TestComp
    </div>
  )
}

export default TestComp
