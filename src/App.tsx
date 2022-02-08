import { createContext, useEffect, useState } from 'react'
import Editotr from '@container/Editor'
import ComponentBar from '@container/ComponentBar'
import AttributeArea from '@container/AttributeArea'

import { operateState } from '@store/index'
import 'normalize.css'
import './App.css'

const EditorContext = createContext({})

const App = () => {
  const [ctxObj] = useState<StoreType.IOperateState>(operateState)

  useEffect(() => {}, [])

  return (
    <EditorContext.Provider value={ctxObj}>
      <div className="editor-wrapper">
        <ComponentBar />
        <Editotr />
        <AttributeArea />
      </div>
    </EditorContext.Provider>
  )
}

export default App
