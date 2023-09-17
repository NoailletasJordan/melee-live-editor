import Title from "@/components/Layout/components/Title"
import { IRoomData, RoomId } from "@/types"
import { getRoomBannerLink, getRoomSettingsLink } from "@/utils"
import { Group, SimpleGrid, Skeleton, Stack } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import Card from "./components/Card"
import IntervenantColor from "./components/IntervenantColor/index"

interface Props {
  roomsWithId: (IRoomData & { id: RoomId })[]
  isLoading: boolean
}

const GRID_RESPONSIVE = [
  { maxWidth: "md", cols: 2 },
  { maxWidth: "sm", cols: 1 },
  { maxWidth: "xs", cols: 2 },
]

const HomePage = ({ roomsWithId, isLoading }: Props) => {
  const navigate = useNavigate()

  const LoadingComponents = [...Array(6)].map((_, index) => (
    <Skeleton key={index} height={100} radius="md" />
  ))

  return (
    <Stack>
      <Group position="apart">
        <Title>Espace de travail</Title>
        <IntervenantColor />
      </Group>

      <SimpleGrid cols={3} breakpoints={GRID_RESPONSIVE}>
        {isLoading
          ? LoadingComponents
          : roomsWithId.map(({ id, name, description, colorFamily }) => (
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
