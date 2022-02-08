declare namespace StoreType {
  interface IOperateState {
    operate: 'ADD' | 'DELETE' | 'MOVE' | 'MODIFY' | undefined
    operateType: SharedType.IToolTypes | undefined
  }
}
