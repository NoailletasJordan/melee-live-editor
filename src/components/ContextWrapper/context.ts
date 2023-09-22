import { IIntervenantColors } from "@/types"
import { createContext } from "react"

export interface IColorsConfigContext {
  isLoading: boolean
  colors: IIntervenantColors
}

export const colorsConfigContextInitial = {
  colors: {
    companyColor: "#000000",
    nameColor: "#000000",
  },
  isLoading: true,
}

export const ColorsContext = createContext<IColorsConfigContext>(
  colorsConfigContextInitial
)
