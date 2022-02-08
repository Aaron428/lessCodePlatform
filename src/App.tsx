import { useState } from 'react'
import Editotr from '@container/Editor'
import ComponentBar from '@container/ComponentBar'
import AttributeArea from '@container/AttributeArea'
import Input from '@shared/input'

import { EditorContext, operateState } from '@store/index'
import 'normalize.css'
import './App.css'

const App = () => {
  // 把全局的 ctx，和修改 ctx 的方法传给子组件
  const [ctxObj, setCtxObj] = useState<StoreType.IOperateState>(operateState)

  return (
    <EditorContext.Provider value={{ ...ctxObj, setCtxObj }}>
      <div className="page">
        <div className="editor-menu">
          <label htmlFor="name">页面名称</label>
          <Input style={{ width: 240 }} id="name" />
        </div>
        <div className="editor-wrapper">
          <ComponentBar />
          <Editotr />
          <AttributeArea />
        </div>
      </div>
    </EditorContext.Provider>
  )
}

export default App
