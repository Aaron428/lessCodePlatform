declare namespace EditorType {
  interface IBasicInfoComp {
    id: string
    type: SharedType.IToolTypes
    layer: number
    x: number
    y: number
    width: number
    height: number
  }

  interface IComp extends IBasicInfoComp {}
}
