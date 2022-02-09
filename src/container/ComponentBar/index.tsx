import { useContext } from 'react'
import { OFFSET_TOOL_BAR, OFFSET_TOP_BAR, TOOL_CONFIG } from '@shared/constants'
import { changeCtxHandler, EditorContext } from '@store/index'
import './index.css'

const ComponentBar = () => {
  const ctx = useContext(EditorContext)

  /**
   * 记录拖拽的偏移量和组件类型，为添加做准备
   * @param _ drag event
   * @param type component type
   */
  const onStart = (e: React.DragEvent<HTMLDivElement>, type: SharedType.IToolTypes) => {
    const shiftX = e.clientX + OFFSET_TOOL_BAR
    const shiftY = e.clientY - OFFSET_TOP_BAR
    changeCtxHandler(ctx, {
      operate: 'ADD',
      operateType: type,
      shiftX,
      shiftY,
      id: ''
    })
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
