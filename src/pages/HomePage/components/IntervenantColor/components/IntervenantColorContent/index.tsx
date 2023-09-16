import { IIntervenantColors } from "@/types"
import { Collapse, Group, SegmentedControl, Stack, Switch } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import Picker from "./components/Picker"
import PreSelected from "./components/PreSelected/index"

interface Props {
  colorField: keyof IIntervenantColors
  color: string
  onConfirm: () => void
  handleChangeColor: (newColor: string) => void
  handleChangeType: (colorField: keyof IIntervenantColors) => void
  isLoading: boolean
  disableConfirm: boolean
}

const SEGMENTED_CONTROL_DATA = [
  { label: "Couleur de l'intervenant", value: "nameColor" },
  { label: "Couleur de l'entreprise", value: "companyColor" },
]

const IntervenantColorContent = (props: Props) => {
  const [preselectedColorIsOpen, { toggle }] = useDisclosure(false)

  return (
    <Stack>
      <SegmentedControl
        data={SEGMENTED_CONTROL_DATA}
        value={props.colorField}
        onChange={props.handleChangeType}
      />

      <Picker {...props} />
      <Group>
        <Switch
          checked={preselectedColorIsOpen}
          onChange={toggle}
          label="Afficher les couleurs prédéfinies"
          size="xs"
        />
      </Group>
      <Collapse in={preselectedColorIsOpen}>
        <PreSelected handleChangeColor={props.handleChangeColor} />
      </Collapse>
    </Stack>
  )
}

export default IntervenantColorContent
