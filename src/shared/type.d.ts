declare namespace SharedType {
  type IToolTypes = 'button' | 'text' | 'image' | 'video' | 'float_button' | undefined

  type ConstToolConfigItemType = {
    label: string
    type: IToolTypes
    icon?: React.ReactNode
  }
}
