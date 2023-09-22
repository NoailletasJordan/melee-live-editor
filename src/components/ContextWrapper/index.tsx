import { Unsubscribe } from "firebase/firestore"
import { ReactNode, useEffect, useRef, useState } from "react"
import { subscribeToIntervenantColors } from "../../firebase"
import {
  ColorsContext,
  IColorsConfigContext,
  colorsConfigContextInitial,
} from "./context"

interface Props {
  children: ReactNode
}

const ContextWrapper = ({ children }: Props) => {
  const unsubscriberRef = useRef<Unsubscribe>()
  const [context, setContext] = useState<IColorsConfigContext>(
    colorsConfigContextInitial
  )
  useEffect(() => {
    ;(async () => {
      const unsubscriber = await subscribeToIntervenantColors((newColors) =>
        setContext({
          isLoading: false,
          colors: newColors,
        })
      )

      unsubscriberRef.current = unsubscriber

      return () => {
        unsubscriberRef.current?.()
      }
    })()
  }, [])

  return (
    <ColorsContext.Provider value={context}>{children}</ColorsContext.Provider>
  )
}

export default ContextWrapper
