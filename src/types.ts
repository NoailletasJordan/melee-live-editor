type ColorRGB = string
export type RoomId = string

// Has to be in Mantine.ui "theme.colors"
// Default ones: https://mantine.dev/theming/colors/#default-colors
export type ColorFamily =
  | "dark"
  | "gray"
  | "red"
  | "pink"
  | "grape"
  | "violet"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "green"
  | "lime"
  | "yellow"
  | "orange"

export interface IDatabase {
  configIntervenant: {
    colorSettings: IIntervenantColors
  }
  salles: Record<RoomId, IRoomData>
}

export interface IIntervenantColors {
  companyColor: ColorRGB
  nameColor: ColorRGB
}

export interface IRoomData {
  name: string
  colorFamily: ColorFamily
  description: string
  preventNamesLineBreak: boolean
  groups?: IGroup[]
}

export interface IGroup {
  id: string
  title: string
  hidden: boolean
  intervenants: IIntervenant[]
}

export type IGroupWithIntervenants = Required<IGroup>

export interface IIntervenant {
  company: string
  id: string
  name: string
}
