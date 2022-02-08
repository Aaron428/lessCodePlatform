import { useContext } from 'react'
import Input from '@shared/input'
import { TOOL_CONFIG } from '@shared/constants'
import { changeCtxHandler, EditorContext } from '@store/index'
import './index.css'

const ComponentBar = () => {
  const ctx = useContext(EditorContext)
  const onStart = (_: React.DragEvent<HTMLDivElement>, type: SharedType.IToolTypes) => {
    changeCtxHandler(ctx, { operate: 'ADD', operateType: type })
  }

  return (
    <div className="component-bar">
      <div className="page-name-wrapper">
        <label htmlFor="name">页面名称</label>
        <Input style={{ flex: 1 }} id="name" />
      </div>

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
