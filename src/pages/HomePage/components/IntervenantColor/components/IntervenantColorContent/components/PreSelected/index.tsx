import {
  Accordion,
  ActionIcon,
  ColorSwatch,
  Group,
  useMantineTheme,
} from "@mantine/core"

interface Props {
  handleChangeColor: (newColor: string) => void
}

const PreSelected = ({ handleChangeColor }: Props) => {
  const theme = useMantineTheme()
  const colorsEntries = Object.entries(theme?.colors)

  return (
    <Accordion variant="filled">
      {colorsEntries.map(([colorFamily, colors]) => (
        <Accordion.Item key={colorFamily} value={colorFamily}>
          <Accordion.Control>
            <Group>
              <ColorSwatch color={colors[6]} size={"1.4rem"} />

              {colorFamily}
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <Group spacing={"xs"}>
              {colors.map((color) => (
                <ActionIcon
                  key={color}
                  onClick={() => handleChangeColor(color)}
                >
                  <ColorSwatch color={color} size={"1.4rem"} />
                </ActionIcon>
              ))}
            </Group>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

export default PreSelected
