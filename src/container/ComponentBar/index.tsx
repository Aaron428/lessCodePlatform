import Input from '@shared/input'
import { TOOL_CONFIG } from '@shared/constants'
import './index.css'

const ComponentBar = ({}) => {
  return (
    <div className="component-bar">
      <div className="page-name-wrapper">
        <label htmlFor="name">页面名称</label>
        <Input style={{ flex: 1 }} id="name" />
      </div>

      <div className="component-wrapper">
        {TOOL_CONFIG.map(config => (
          <div draggable className="item" key={config.type}>
            <div className="icon">icon</div>
            {config.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComponentBar
