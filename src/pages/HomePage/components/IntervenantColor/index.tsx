import Title from "@/components/Layout/components/Title"
import {
  subscribeToIntervenantColors,
  updateIntervenantColor,
} from "@/firebase"
import { IIntervenantColors } from "@/types"
import { ICON_SIZE_DEFAULT } from "@/utils"
import { Box, Button, Drawer, ScrollArea, Skeleton } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"
import type { Unsubscribe } from "firebase/database"
import { useEffect, useRef, useState } from "react"
import { Adjustments } from "tabler-icons-react"
import IntervenantColorContent from "./components/IntervenantColorContent"

const COLOR_SETTINGS_INITIAL = {
  companyColor: "",
  nameColor: "",
}

const IntervenantColor = () => {
  const unsubscriberRef = useRef<Unsubscribe>()
  const [drawerIsOpened, drawerHandler] = useDisclosure(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedColorField, setType] =
    useState<keyof IIntervenantColors>("nameColor")
  const [colorsConfig, setColorsConfig] = useState<IIntervenantColors>(
    COLOR_SETTINGS_INITIAL
  )
  // Used to reset colorsConfig state and compare values
  const [colorsConfigOld, setColorsConfigOld] = useState(COLOR_SETTINGS_INITIAL)

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

  const resetColorsConfigToOld = () => setColorsConfig(colorsConfigOld)

  const onIntervenantColorCallback = (newColors: IIntervenantColors) => {
    setColorsConfig(newColors)
    setColorsConfigOld(newColors)
    setIsLoading(false)
  }

  const updateColorSettings =
    (selectedColorField: keyof IIntervenantColors) => (newColor: string) => {
      setColorsConfig({ ...colorsConfig, [selectedColorField]: newColor })
    }

  const handleSubmit = async () => {
    setIsLoading(true)
    await updateIntervenantColor({
      data: colorsConfig[selectedColorField],
      colorField: selectedColorField,
    })

    notifications.show({
      icon: <IconCheck size="1.2rem" />,
      title: "Success",
      message: "Mise a jour prise en compte",
    })

    drawerHandler.close()
  }

  const currentEntryIsValid = () => {
    const isValidEntry = CSS.supports("color", colorsConfig[selectedColorField])
    const isDifferentThanOldValue =
      colorsConfig[selectedColorField] !== colorsConfigOld[selectedColorField]
    return isValidEntry && isDifferentThanOldValue
  }

  return (
    <>
      <Drawer
        opened={drawerIsOpened}
        onClose={() => {
          drawerHandler.close()
          resetColorsConfigToOld()
        }}
        position="right"
        title={<Title>Configuration de l'intervenant</Title>}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <IntervenantColorContent
          disableConfirm={!currentEntryIsValid()}
          onConfirm={handleSubmit}
          handleChangeColor={updateColorSettings(selectedColorField)}
          color={colorsConfig[selectedColorField]}
          colorField={selectedColorField}
          handleChangeType={setType}
          isLoading={isLoading}
        />
      </Drawer>

      <Box>
        <Skeleton visible={isLoading}>
          <Button
            leftIcon={<Adjustments size={ICON_SIZE_DEFAULT} />}
            variant="subtle"
            onClick={drawerHandler.open}
          >
            Couleurs intervenant
          </Button>
        </Skeleton>
      </Box>
    </>
  )
}

export default IntervenantColor
