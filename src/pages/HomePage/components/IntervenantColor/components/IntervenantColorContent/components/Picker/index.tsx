import { Button, ColorInput, Group } from "@mantine/core"

interface Props {
  onConfirm: () => void
  color: string
  handleChangeColor: (newColor: string) => void
  isLoading: boolean
  disableConfirm: boolean
}

const Picker = ({
  disableConfirm,
  isLoading,
  color,
  handleChangeColor,
  onConfirm,
}: Props) => (
  <Group>
    <ColorInput
      format="hexa"
      placeholder="Sélectionner"
      value={color}
      onChange={handleChangeColor}
      withPreview={true}
      maxLength={9}
    />
    <Button
      disabled={!isLoading && disableConfirm}
      loading={isLoading}
      onClick={onConfirm}
    >
      Confirmer
    </Button>
  </Group>
)

export default Picker
