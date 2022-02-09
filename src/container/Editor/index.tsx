import React, { useContext, useState } from 'react'
import { dataToStyle, generateId } from '@utils/index'
import { INIT_IMAGE_CONFIG, OFFSET_X } from '@shared/constants'
import { EditorContext } from '@store/index'
import './index.css'

// 编辑器模块（中间的那一块）
// 负责组建的新增、移动等操作
const Editotr = () => {
  const [activeComp, setActiveComp] = useState<string | null>(null)
  const [comp, setComp] = useState<EditorType.IComp[]>([])

  const ctx = useContext(EditorContext)

  // add component
  const addComponentHandler = (e: React.DragEvent<HTMLDivElement>) => {
    setComp([
      ...comp,
      {
        ...INIT_IMAGE_CONFIG,
        id: generateId(),
        x: e.pageX - ctx.shiftX,
        y: e.pageY - ctx.shiftY,
        type: ctx.operateType
      }
    ])
  }

  // move component
  const moveComponentHandler = (e: React.DragEvent<HTMLDivElement>, id: string | null) => {
    if (id) {
      const target = comp.find(d => d.id === id)
      if (target) {
        const componentBarDom = document.querySelector('.component-bar') as HTMLElement
        let x = e.pageX - ctx.shiftX + OFFSET_X - (componentBarDom?.offsetLeft || 0)
        let y = e.pageY - ctx.shiftY
        const maxX = document.querySelector('.editor')?.clientWidth
        const maxY = document.querySelector('.editor')?.clientHeight
        // 规定边界
        if (typeof maxX === 'number' && x > maxX - target.width) {
          x = maxX - target.width
        }
        if (typeof maxY === 'number' && y > maxY - target.height) {
          y = maxY - target.height
        }
        if (x < 0) {
          x = 0
        }
        if (y < 0) {
          y = 0
        }
        target.x = x
        target.y = y

        setComp([...comp])
      }
    }
  }

  // 针对不同的动作，对组建进行相应的处理
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    switch (ctx.operate) {
      case 'ADD':
        addComponentHandler(e)
      case 'MOVE':
        moveComponentHandler(e, activeComp)
      default:
        return
    }
  }

  // 激活当前组件，记录鼠标当前偏移量，为移动时的便宜量计算做准备
  const activeCurrentComp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    if (ctx.setCtxObj) {
      const targetDom = e.target as HTMLElement
      const shiftX = e.clientX - targetDom.getBoundingClientRect().left + 340
      const shiftY = e.clientY - targetDom.getBoundingClientRect().top + 104
      ctx.setCtxObj({ operate: 'MOVE', operateType: 'image', id, shiftX, shiftY })
    }
    setActiveComp(id)
  }

  return (
    <div className="editor" onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
      {comp.map(d => (
        <div
          className={activeComp === d.id ? 'actived-component' : 'component'}
          key={d.id}
          style={dataToStyle(d)}
          draggable
          onMouseDown={e => activeCurrentComp(e, d.id)}
        ></div>
      ))}
    </div>
  )
}

export default Editotr
