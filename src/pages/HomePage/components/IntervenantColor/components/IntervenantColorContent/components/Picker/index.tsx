import { Button, ColorInput, Group } from "@mantine/core"

interface Props {
  onConfirm: () => void
  color: string
  handleChangeColor: (newColor: string) => void
  isSubmitting: boolean
  disableConfirm: boolean
}

const Picker = ({
  disableConfirm,
  isSubmitting,
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
    />
    <Button
      disabled={!isSubmitting && disableConfirm}
      loading={isSubmitting}
      onClick={onConfirm}
    >
      Confirmer
    </Button>
  </Group>
)

export default Picker
