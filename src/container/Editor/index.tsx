import React, { useContext } from 'react'
import { EditorContext } from '@store/index'
import './index.css'

const Editotr = () => {
  const ctx = useContext(EditorContext)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e.pageX)
    console.log(e.pageY)
    console.log(ctx)
  }

  return (
    <div className="editor" onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
      Editotr
    </div>
  )
}

export default Editotr
