import React, { useContext } from 'react'
import { generateId } from '@utils/index'
import { INIT_IMAGE_CONFIG, OFFSET_X } from '@shared/constants'
import { changeCtxHandler, EditorContext } from '@store/index'
import EditableBox from '@shared/editableBox'
import './index.css'

// 编辑器模块（中间的那一块）
// 负责组建的新增、移动等操作
const Editotr = () => {
  const ctx = useContext(EditorContext)

  // add component
  const addComponentHandler = (e: React.DragEvent<HTMLDivElement>) => {
    const { comps } = ctx
    const newData = [...comps]
    newData.push({
      ...INIT_IMAGE_CONFIG,
      id: generateId(),
      x: e.pageX - ctx.shiftX,
      y: e.pageY - ctx.shiftY,
      type: ctx.operateType
    })
    changeCtxHandler(ctx, { comps: newData })
  }

  // move component
  const moveComponentHandler = (e: React.DragEvent<HTMLDivElement>) => {
    if (ctx.id) {
      const target = ctx.comps.find(d => d.id === ctx.id)
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
        changeCtxHandler(ctx, { comps: [...ctx.comps] })
      }
    }
  }

  // 针对不同的动作，对组建进行相应的处理
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    switch (ctx.operate) {
      case 'ADD':
        addComponentHandler(e)
      case 'MOVE':
        moveComponentHandler(e)
      default:
        return
    }
  }

  // 激活当前组件，记录鼠标当前偏移量，为移动时的便宜量计算做准备
  const activeCurrentComp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    const targetDom = e.target as HTMLElement
    const shiftX = e.clientX - targetDom.getBoundingClientRect().left + 340
    const shiftY = e.clientY - targetDom.getBoundingClientRect().top + 104
    changeCtxHandler(ctx, { id, shiftX, shiftY })
  }

  return (
    <div className="editor" onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
      {ctx.comps.map(d => (
        <EditableBox key={d.id} />
      ))}
    </div>
  )
}

export default Editotr
