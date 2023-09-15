import Title from "@/components/Layout/components/Title"
import {
  subscribeToIntervenantColors,
  updateIntervenantColors,
} from "@/firebase"
import { IIntervenantColors } from "@/types"
import { Button, Drawer, ScrollArea } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"
import type { DataSnapshot, Unsubscribe } from "firebase/database"
import { useEffect, useRef, useState } from "react"
import IntervenantColorChanger from "../IntervenantColorChanger/index"

const COLOR_SETTINGS_INITIAL = {
  companyColor: "white",
  nameColor: "white",
}

const IntervenantColor = () => {
  const unsubscriberRef = useRef<Unsubscribe>()
  const [type, setType] = useState<keyof IIntervenantColors>("nameColor")
  const [colorSettings, setColorSettings] = useState<IIntervenantColors>(
    COLOR_SETTINGS_INITIAL
  )
  const [drawerIsOpened, drawerHandler] = useDisclosure(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      const unsubscriber = await subscribeToIntervenantColors(
        onIntervenantColorCallback
      )
      unsubscriberRef.current = unsubscriber

      return () => {
        unsubscriberRef.current?.()
      }
    })()
  }, [])

  const onIntervenantColorCallback = (snapshot: DataSnapshot) => {
    const newColorSettings: IIntervenantColors = snapshot.val()
    setColorSettings(newColorSettings)
  }

  const updateColorSettings =
    (type: keyof IIntervenantColors) => (newColor: string) => {
      setColorSettings({ ...colorSettings, [type]: newColor })
    }

  const onSubmit = async () => {
    /** Temp */
    console.log({ colorSettings }, "submit")
    setIsLoading(true)
    await updateIntervenantColors(colorSettings)
    setIsLoading(false)

    notifications.show({
      icon: <IconCheck size="1.2rem" />,
      title: "Success",
      message: "Mise a jour prise en compte",
    })

    drawerHandler.close()
  }

  return (
    <>
      <Drawer
        opened={drawerIsOpened}
        onClose={drawerHandler.close}
        position="right"
        title={<Title>Configuration de l'intervenant</Title>}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <IntervenantColorChanger
          onConfirm={onSubmit}
          handleChangeColor={updateColorSettings(type)}
          color={colorSettings[type]}
          type={type}
          handleChangeType={setType}
          isLoading={isLoading}
        />
      </Drawer>

      <Button variant="subtle" onClick={drawerHandler.open}>
        Couleurs intervenant
      </Button>
    </>
  )
}

export default IntervenantColor
