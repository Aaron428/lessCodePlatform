import React, { useContext, useState } from 'react'
import { EditorContext } from '@store/index'
import { dataToStyle, generateId } from '@utils/index'
import { INIT_IMAGE_CONFIG } from '@shared/constants'
import './index.css'

const Editotr = () => {
  const [comp, setComp] = useState<EditorType.IComp[]>([])

  const ctx = useContext(EditorContext)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setComp([
      ...comp,
      {
        ...INIT_IMAGE_CONFIG,
        id: generateId(),
        x: e.pageX - 320 - (ctx.shiftX || 0),
        y: e.pageY - (ctx.shiftY || 0),
        type: ctx.operateType
      }
    ])
  }

  return (
    <div className="editor" onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
      {comp.map(d => (
        <div className="component" key={d.id} style={dataToStyle(d)}></div>
      ))}
    </div>
  )
}

export default Editotr
