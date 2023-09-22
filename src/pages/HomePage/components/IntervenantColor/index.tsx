import { ColorsContext } from "@/components/ContextWrapper/context"
import Title from "@/components/Title"
import { updateIntervenantColor } from "@/firebase"
import { IIntervenantColors } from "@/types"
import { ICON_SIZE_DEFAULT } from "@/utils"
import { Box, Button, Drawer, ScrollArea, Skeleton } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"
import { useContext, useEffect, useState } from "react"
import { Adjustments } from "tabler-icons-react"
import IntervenantColorContent from "./components/IntervenantColorContent"

const COLOR_SETTINGS_INITIAL = {
  companyColor: "",
  nameColor: "",
}

const IntervenantColor = () => {
  const [drawerIsOpened, drawerHandler] = useDisclosure(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedColorField, setSelectedColorField] =
    useState<keyof IIntervenantColors>("nameColor")
  // The colors in database
  const colorsContext = useContext(ColorsContext)
  // The colors potentialy localy modified by the user before pushing the update
  const [localColors, setLocalColors] = useState<IIntervenantColors>(
    COLOR_SETTINGS_INITIAL
  )

  useEffect(() => {
    ;(async () => {
      setLocalColors(colorsContext.colors)
      setIsSubmitting(false)
    })()
  }, [colorsContext.colors])

  const resetColorsConfigToOld = () => setLocalColors(colorsContext.colors)

  const updateColorSettingsLocally =
    (selectedColorField: keyof IIntervenantColors) => (newColor: string) => {
      setLocalColors({ ...localColors, [selectedColorField]: newColor })
    }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await updateIntervenantColor({
      data: localColors[selectedColorField],
      colorField: selectedColorField,
    })

    notifications.show({
      icon: <IconCheck size="1.2rem" />,
      title: "C'est validé !",
      message: "Mise a jour prise en compte",
    })

    drawerHandler.close()
  }

  const currentEntryIsValid = () => {
    const isValidEntry = CSS.supports("color", localColors[selectedColorField])
    const isDifferentThanOldValue =
      localColors[selectedColorField] !==
      colorsContext.colors[selectedColorField]
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
          handleChangeColor={updateColorSettingsLocally(selectedColorField)}
          color={localColors[selectedColorField]}
          colorField={selectedColorField}
          handleColorField={setSelectedColorField}
          isSubmitting={isSubmitting}
        />
      </Drawer>

      <Box>
        <Skeleton visible={colorsContext.isLoading}>
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
