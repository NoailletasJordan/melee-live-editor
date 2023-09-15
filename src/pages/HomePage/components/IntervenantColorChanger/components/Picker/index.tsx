import { Button, ColorInput, Group } from "@mantine/core"

interface Props {
  onConfirm: () => void
  color: string
  handleChangeColor: (newColor: string) => void
  isLoading: boolean
}

const Picker = ({ isLoading, color, handleChangeColor, onConfirm }: Props) => (
  <Group>
    <ColorInput
      format="hexa"
      placeholder="Sélectionner"
      value={color}
      onChange={handleChangeColor}
      withPreview={true}
    />
    <Button loading={isLoading} onClick={onConfirm}>
      Confirmer
    </Button>
  </Group>
)

export default Picker
