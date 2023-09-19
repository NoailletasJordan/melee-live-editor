import BasicCard from "@/components/Layout/components/BasicCard"
import { ColorFamily } from "@/types"
import { ICON_SIZE_DEFAULT } from "@/utils"
import { Box, Button, Group, Stack, Text } from "@mantine/core"
import { upperFirst } from "@mantine/hooks"
import { ScanEye, Settings } from "tabler-icons-react"

interface Props {
  name: string
  description: string
  actionPrimary: () => void
  actionSecondary: () => void
  colorFamily: ColorFamily
}

const Card = (props: Props) => {
  const { name, description, actionPrimary, actionSecondary, colorFamily } =
    props

  return (
    <BasicCard>
      <Stack>
        <Box>
          <Text weight={500}>{upperFirst(name)}</Text>
          <Text c="dimmed">{description}</Text>
        </Box>

        <Group position="apart" grow>
          <Button
            variant="outline"
            onClick={actionSecondary}
            color={colorFamily}
            rightIcon={<ScanEye size={ICON_SIZE_DEFAULT} />}
          >
            Bannière
          </Button>
          <Button
            variant="filled"
            onClick={actionPrimary}
            color={colorFamily}
            rightIcon={<Settings size={ICON_SIZE_DEFAULT} />}
          >
            Paramètrages
          </Button>
        </Group>
      </Stack>
    </BasicCard>
  )
}

export default Card
