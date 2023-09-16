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
  ask: {
    author: string
    message: string
  }
  intervenants: {
    company: string
    hide: boolean
    id: string
    name: string
  }[]
  isAsk: boolean
  name: string
  open: boolean
  readError: boolean
  colorFamily: ColorFamily
  description: string
  allowIntervenantNamesLinebreak: boolean
}
