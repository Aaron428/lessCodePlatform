declare namespace EditableBoxType {
  type DireactionType = 'e' | 'w' | 's' | 'n' | 'ne' | 'nw' | 'se' | 'sw' | 'move' | ''

  interface IBasicStyle {
    top: number
    left: number
    width: number
    height: number
  }

  interface IMousePos {
    top: number
    left: number
    cX: number
    cY: number
  }
}
