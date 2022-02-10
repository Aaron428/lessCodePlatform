declare namespace EditableBoxType {
  type DireactionType =
    | 'right'
    | 'left'
    | 'bottom'
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'move'

  interface IBasicStyle {
    top: number
    left: number
    width: number
    height: number
  }

  interface IMousePos {
    top: number
    left: number
    mouseX: number
    mouseY: number
  }
}
