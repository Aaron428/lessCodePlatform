declare namespace SharedType {
  type IToolTypes = 'button' | 'text' | 'image' | 'video' | 'float_button'

  type ConstToolConfigItemType = {
    label: string
    type: IToolTypes
    icon?: React.ReactNode
  }
}
