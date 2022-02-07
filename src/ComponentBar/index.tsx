import Input from '@shared/input'
import './index.css'

const ComponentBar = () => {
  return (
    <div className="component-bar">
      <div className="page-name-wrapper">
        <label htmlFor="name">页面名称</label>
        <Input style={{ flex: 1 }} id="name" />
      </div>
    </div>
  )
}

export default ComponentBar
