import Title from "@/components/Layout/components/Title"
import { IRoomData, RoomId } from "@/types"
import { getRoomBannerLink, getRoomSettingsLink } from "@/utils"
import { Group, SimpleGrid, Stack } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import Card from "./components/Card"
import IntervenantColor from "./components/IntervenantColor/index"

interface Props {
  roomsWithId: (IRoomData & { id: RoomId })[]
}

const GRID_RESPONSIVE = [
  { maxWidth: "md", cols: 2 },
  { maxWidth: "sm", cols: 1 },
  { maxWidth: "xs", cols: 2 },
]

const HomePage = ({ roomsWithId }: Props) => {
  const navigate = useNavigate()

  return (
    <Stack>
      <Group position="apart">
        <Title>Espace de travail</Title>
        <IntervenantColor />
      </Group>

      <SimpleGrid cols={3} breakpoints={GRID_RESPONSIVE}>
        {roomsWithId.map(({ id, name, description, colorFamily }) => (
          <Card
            key={id}
            actionPrimary={() => navigate(getRoomSettingsLink(id))}
            actionSecondary={() => navigate(getRoomBannerLink(id))}
            name={name}
            description={description}
            colorFamily={colorFamily}
          />
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default HomePage

/** Temp */
// NAME SPA DEFAULT ETC
