import Editotr from './Editor'
import ComponentBar from './ComponentBar'
import AttributeArea from './AttributeArea'
import 'normalize.css'
import './App.css'

const App = () => {
  return (
    <div className="editor-wrapper">
      <ComponentBar />
      <Editotr />
      <AttributeArea />
    </div>
  )
}

export default App
