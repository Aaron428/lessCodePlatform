import React, { useContext, useState } from 'react'
import { EditorContext } from '@store/index'
import { dataToStyle, generateId } from '@utils/index'
import { INIT_IMAGE_CONFIG } from '@shared/constants'
import './index.css'

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

  const moveComponentHandler = (e: React.DragEvent<HTMLDivElement>, id: string | null) => {
    if (id) {
      const target = comp.find(d => d.id === id)
      if (target) {
        target.x = e.pageX - ctx.shiftX
        target.y = e.pageY - ctx.shiftY
        setComp([...comp])
      }
    }
  }

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

  const activeCurrentComp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    if (ctx.setCtxObj) {
      const targetDom = e.target as HTMLElement
      const shiftX = e.clientX - targetDom.getBoundingClientRect().left + 320
      const shiftY = e.clientY - targetDom.getBoundingClientRect().top + 100
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
