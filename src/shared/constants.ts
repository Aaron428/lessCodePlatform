export const TOOL_CONFIG: SharedType.ConstToolConfigItemType[] = [
  {
    label: '按钮',
    type: 'button'
  },
  {
    label: '文字',
    type: 'text'
  },
  {
    label: '图片',
    type: 'image'
  },
  {
    label: '视频',
    type: 'video'
  },
  {
    label: '悬浮按钮',
    type: 'float_button'
  }
]

export const INIT_IMAGE_CONFIG = {
  position: 'absolute',
  layer: 0,
  width: 100,
  height: 100
}

export const OFFSET_X = 100 - 24

export const OFFSET_TOOL_BAR = 200 + 24

export const OFFSET_TOP_BAR = 100

export const DIRECTION_MAP = {
  上: 'n',
  下: 's',
  左: 'w',
  右: 'e',
  上左: 'nw',
  上右: 'ne',
  下左: 'sw',
  下右: 'se',
  移动: 'move'
}
