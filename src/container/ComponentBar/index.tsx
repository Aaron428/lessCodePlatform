import { useContext } from 'react'
import Input from '@shared/input'
import { TOOL_CONFIG } from '@shared/constants'
import { changeCtxHandler, EditorContext } from '@store/index'
import './index.css'

const ComponentBar = () => {
  const ctx = useContext(EditorContext)

  /**
   * add component
   * @param _ drag event
   * @param type component type
   */
  const onStart = (e: React.DragEvent<HTMLDivElement>, type: SharedType.IToolTypes) => {
    const targetDom = e.target as HTMLElement
    const shiftX = e.clientX - targetDom.getBoundingClientRect().left
    const shiftY = e.clientY - targetDom.getBoundingClientRect().top
    changeCtxHandler(ctx, { operate: 'ADD', operateType: type, shiftX, shiftY })
  }

  return (
    <div className="component-bar">
      <div className="component-wrapper">
        {TOOL_CONFIG.map(config => (
          <div
            draggable
            className="item"
            key={config.type}
            onDragStart={e => onStart(e, config.type)}
          >
            <div className="icon">icon</div>
            {config.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComponentBar
