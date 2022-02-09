import { directList } from '@shared/constants'
import './index.css'

const ActiveComponent = () => {
  return (
    <>
      {directList.map(direct => (
        <div className="controler-resize" key={direct} data-direction={direct}></div>
      ))}
    </>
  )
}

export default ActiveComponent
