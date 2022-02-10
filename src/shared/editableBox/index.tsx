import { DIRECTION_MAP } from '@shared/constants'
import { removePxAndConverseToNumber } from '@utils/index'
import { useRef, useState, useCallback } from 'react'
import './index.css'

const points: EditableBoxType.DireactionType[] = ['e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw']

let isDown = false
let currentDirectioin: EditableBoxType.DireactionType = 'move'
let oriPos: EditableBoxType.IMousePos = { top: 0, left: 0, cX: 0, cY: 0 }

const EditableBox = () => {
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
      // 阻止事件冒泡
      e.stopPropagation()
      // 保存方向。
      currentDirectioin = dir
      isDown = true
      // 然后鼠标坐标是
      const cY = e.clientY // clientX 相对于可视化区域
      const cX = e.clientX
      oriPos = {
        ...style,
        cX,
        cY
      }
    },
    [style]
  )

  /**
   * 元素变化。 方法放在组件外部或者其他地方。
   * @param direction 'move', 'e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw'
   * @param oriStyle  元素的属性 width height top left
   * @param oriPos    鼠标按下时所记录的坐标
   * @param e         事件event
   */
  const transform = (
    direction: EditableBoxType.DireactionType,
    oriPos: EditableBoxType.IMousePos,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const cubeDom = document.getElementById('cube')
    if (cubeDom) {
      const domStyle = { ...style }

      const offsetX = e.clientX - oriPos.cX
      const offsetY = e.clientY - oriPos.cY
      switch (direction) {
        // 移动
        case DIRECTION_MAP.移动:
          // 元素当前位置 + 偏移量
          const newTop = oriPos.top + offsetY
          const newLeft = oriPos.left + offsetX
          // 限制必须在这个范围内移动 画板的高度-元素的高度
          domStyle.top = Math.max(0, Math.min(newTop, wrapStyle.height - style.height))
          domStyle.left = Math.max(0, Math.min(newLeft, wrapStyle.width - style.width))
          break
        // 东
        case DIRECTION_MAP.右:
          // 向右拖拽添加宽度
          domStyle.width += offsetX
          break
        // 西
        case DIRECTION_MAP.左:
          // 增加宽度、位置同步左移
          domStyle.width -= offsetX
          domStyle.left += offsetX
          break
        // 南
        case DIRECTION_MAP.下:
          domStyle.height += offsetY
          break
        // 北
        case DIRECTION_MAP.上:
          domStyle.height -= offsetY
          domStyle.top += offsetY
          break
        // 东北
        case DIRECTION_MAP.上右:
          domStyle.height -= offsetY
          domStyle.top += offsetY
          domStyle.width += offsetX
          break
        // 西北
        case DIRECTION_MAP.上左:
          domStyle.height -= offsetY
          domStyle.top += offsetY
          domStyle.width -= offsetX
          domStyle.left += offsetX
          break
        // 东南
        case DIRECTION_MAP.下右:
          domStyle.height += offsetY
          domStyle.width += offsetX
          break
        // 西南
        case DIRECTION_MAP.下左:
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
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
