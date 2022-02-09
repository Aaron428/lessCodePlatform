import { useContext, useState } from 'react'
import { directList } from '@shared/constants'
import { EditorContext } from '@store/index'
import './index.css'

const ActiveComponent = () => {
  const ctx = useContext(EditorContext)
  const [currentPoint, setCurrentPoint] = useState<null | string>(null)
  const [pos, setPos] = useState<ActiveComponentType.IPos | null>(null)

  const handleMove = (e: ActiveComponentType.IMouseEvent, direct: string) => {
    if (currentPoint && pos) {
      console.log(pos)
      const { id } = ctx
      let disY = e.pageX - pos.x
      let disX = e.pageY - pos.y
      let hasT = /t/.test(direct)
      let hasB = /b/.test(direct)
      let hasL = /l/.test(direct)
      let hasR = /r/.test(direct)
      // let newHeight = +height + (hasT ? -disY : hasB ? disY : 0)
      // let newWidth = +width + (hasL ? -disX : hasR ? disX : 0)
      console.log(disY)
      console.log(disX)
    }
  }

  const handleMouseDown = (e: ActiveComponentType.IMouseEvent, direct: string) => {
    setPos({ x: e.pageX, y: e.pageY })
    setCurrentPoint(direct)
  }

  return (
    <>
      {directList.map(direct => (
        <div
          className="controler-resize"
          key={direct}
          data-direction={direct}
          onMouseMove={e => handleMove(e, direct)}
          onMouseDown={e => handleMouseDown(e, direct)}
          onMouseUp={() => setCurrentPoint(null)}
        ></div>
      ))}
    </>
  )
}

export default ActiveComponent
