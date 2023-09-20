import Title from "@/components/Layout/components/Title"
import { subscribeToRoomGroups } from "@/firebase"
import { IGroup, IIntervenant } from "@/types"
import { Box, Divider, Group, Skeleton, Stack } from "@mantine/core"
import { upperFirst, useMediaQuery } from "@mantine/hooks"
import { Unsubscribe } from "firebase/database"
import { cloneDeep, set } from "lodash"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import BannerSection from "./components/BannerSection"
import Board from "./components/Board/index"
import UserForm from "./components/UserForm/index"

const BREAKPOINT_MAX_WIDTH = "54em"

const SettingsPage = () => {
  const unsubscriberRef = useRef<Unsubscribe>()
  const { roomId } = useParams()
  const belowBreakpoint = useMediaQuery(`(max-width: ${BREAKPOINT_MAX_WIDTH})`)
  const [preventLinebreak, setPreventLinebreak] = useState(false)
  const [groups, setGroups] = useState<IGroup[]>([])

  useEffect(() => {
    roomId &&
      (async () => {
        const unsubscriber = await subscribeToRoomGroups({
          roomId,
          onValueUpdate: (groupsFromDatabase) => {
            setGroups(groupsFromDatabase || [])
          },
        })

        unsubscriberRef.current = unsubscriber

        return () => {
          unsubscriberRef.current?.()
        }
      })()
    // False positive, do not include "handlers"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const togglePreventLinebreak = () => setPreventLinebreak(!preventLinebreak)

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: !belowBreakpoint ? "max-content auto" : "1fr",
    gap: "1rem",
  }

  const addIntervenant = (
    partialIntervenant: Pick<IIntervenant, "name" | "company">
  ) => {
    const newIntervenant = {
      id: uuidv4(),
      ...partialIntervenant,
    }
    const newFirstGroupIntervenants = [
      newIntervenant,
      ...(groups[0].intervenants || []),
    ]
    // Create intervenants if dont exist
    const newGroups = set(
      cloneDeep(groups),
      "[0].intervenants",
      newFirstGroupIntervenants
    )
    setGroups(newGroups)
  }

  const nonHiddenIntervenants = groups
    .filter(({ hidden }) => !hidden)
    .flatMap(({ intervenants }) => intervenants || [])

  return (
    <Stack>
      {!roomId ? (
        <Skeleton height={8} h={"2rem"} maw={"16rem"} />
      ) : (
        <Title>{`Paramètres de la page ${upperFirst(roomId || "")}`}</Title>
      )}

      <Stack>
        <Box style={gridStyle}>
          <Group>
            <UserForm addIntervenant={addIntervenant} />
            {!belowBreakpoint && <Divider orientation="vertical" />}
          </Group>
          <BannerSection
            intervenants={nonHiddenIntervenants}
            preventLinebreak={preventLinebreak}
            togglePreventLinebreak={togglePreventLinebreak}
          />
        </Box>
      </Stack>

      <Divider label="Organisation des intervenants" labelPosition="center" />
      <Board groups={groups} setGroups={setGroups} />
    </Stack>
  )
}

export default SettingsPage
