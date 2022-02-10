import { removePxAndConverseToNumber } from '@utils/index'
import { useRef, useState, useCallback } from 'react'
import './index.css'

const points = ['e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw']

let isDown = false
let currentDirectioin = ''

const EditableBox = () => {
  // 初始数据， 因为不需要重新render 所以用 useRef
  const oriPos = useRef({
    top: 0, // 元素的坐标
    left: 0,
    cX: 0, // 鼠标的坐标
    cY: 0
  })
  // 画板的
  const wrapStyle = {
    left: 100,
    top: 100,
    width: 750,
    height: document.querySelector('.editor')?.clientHeight || 1000
  }

  const [style, setStyle] = useState({
    left: 100,
    top: 100,
    width: 100,
    height: 100
  })

  // 鼠标被按下
  const onMouseDown = useCallback(
    (dir, e) => {
      console.log(dir)
      // 阻止事件冒泡
      e.stopPropagation()
      // 保存方向。
      currentDirectioin = dir
      isDown = true
      // 然后鼠标坐标是
      const cY = e.clientY // clientX 相对于可视化区域
      const cX = e.clientX
      oriPos.current = {
        ...style,
        cX,
        cY
      }
    },
    [style]
  )

  /**
   * 元素变化。 方法放在组件外部或者其他地方。
   * @param direction  方向 // move 移动 / 'e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw'
   * @param oriStyle 元素的属性 width height top left
   * @param oriPos   鼠标按下时所记录的坐标
   * @param e        事件event
   */
  const transform = (direction: any, oriPos: any, e: any) => {
    const cubeDom = document.getElementById('cube')
    if (cubeDom) {
      const domStyle = { ...style }

      const offsetX = e.clientX - oriPos.current.cX
      const offsetY = e.clientY - oriPos.current.cY
      switch (direction) {
        // 拖拽移动
        case 'move':
          // 元素当前位置 + 偏移量
          const newTop = oriPos.current.top + offsetY
          const newLeft = oriPos.current.left + offsetX
          // 限制必须在这个范围内移动 画板的高度-元素的高度
          domStyle.top = Math.max(0, Math.min(newTop, wrapStyle.height - style.height))
          domStyle.left = Math.max(0, Math.min(newLeft, wrapStyle.width - style.width))
          break
        // 东
        case 'e':
          // 向右拖拽添加宽度
          domStyle.width += offsetX
          break
        // 西
        case 'w':
          // 增加宽度、位置同步左移
          domStyle.width -= offsetX
          domStyle.left += offsetX
          break
        // 南
        case 's':
          domStyle.height += offsetY
          break
        // 北
        case 'n':
          domStyle.height -= offsetY
          domStyle.top += offsetY
          break
        // 东北
        case 'ne':
          domStyle.height -= offsetY
          domStyle.top += offsetY
          domStyle.width += offsetX
          break
        // 西北
        case 'nw':
          domStyle.height -= offsetY
          domStyle.top += offsetY
          domStyle.width -= offsetX
          domStyle.left += offsetX
          break
        // 东南
        case 'se':
          domStyle.height += offsetY
          domStyle.width += offsetX
          break
        // 西南
        case 'sw':
          domStyle.height += offsetY
          domStyle.width -= offsetX
          domStyle.left += offsetX
          break
      }
      cubeDom.style.width = `${domStyle.width}px`
      cubeDom.style.height = `${domStyle.height}px`
      cubeDom.style.left = `${domStyle.left}px`
      cubeDom.style.top = `${domStyle.top}px`
    }
  }

  // 鼠标移动
  const onMouseMove = useCallback(
    (e: any) => {
      // 判断鼠标是否按住
      if (!isDown) return
      transform(currentDirectioin, oriPos, e)
    },
    [style]
  )

  // 鼠标被抬起
  const onMouseUp = useCallback(() => {
    isDown = false
    const cubeDom = document.getElementById('cube')
    if (cubeDom) {
      const left = removePxAndConverseToNumber(cubeDom.style.left)
      const top = removePxAndConverseToNumber(cubeDom.style.top)
      const width = removePxAndConverseToNumber(cubeDom.style.width)
      const height = removePxAndConverseToNumber(cubeDom.style.height)
      setStyle({ left, top, width, height })
    }
  }, [style])

  return (
    <div
      className="drawing-wrap"
      onMouseDown={e => onMouseDown('move', e)}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      <div className="drawing-item" style={style} id="cube">
        {points.map(item => (
          <div
            key={item}
            onMouseDown={e => onMouseDown(item, e)}
            className={`control-point point-${item}`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default EditableBox
