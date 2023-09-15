import { IIntervenantColors } from "@/types"
import { Collapse, Group, SegmentedControl, Stack, Switch } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import Picker from "./components/Picker"
import PreSelected from "./components/PreSelected/index"

interface Props {
  type: keyof IIntervenantColors
  color: string
  onConfirm: () => void
  handleChangeColor: (newColor: string) => void
  handleChangeType: (type: keyof IIntervenantColors) => void
  isLoading: boolean
}

const IntervenantColorChanger = (props: Props) => {
  const [preselectedColorIsOpen, { toggle }] = useDisclosure(false)

  return (
    <Stack>
      <SegmentedControl
        data={[
          { label: "Couleur de l'intervenant", value: "nameColor" },
          { label: "Couleur de l'entreprise", value: "companyColor" },
        ]}
        value={props.type}
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

export default IntervenantColorChanger
