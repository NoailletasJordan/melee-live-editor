import Title from "@/components/Layout/components/Title"
import { subscribeToRoom } from "@/firebase"
import { IIntervenant } from "@/types"
import { Box, Divider, Group, Skeleton, Stack } from "@mantine/core"
import { upperFirst, useListState, useMediaQuery } from "@mantine/hooks"
import { Unsubscribe } from "firebase/database"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import BannerSection from "./components/BannerSection"
import Board from "./components/Board/index"
import UserForm from "./components/UserForm/index"

const BREAKPOINT_MAX_WIDTH = "54em"

const SettingsPage = () => {
  const unsubscriberRef = useRef<Unsubscribe>()
  const { roomId } = useParams()
  const belowBreakpoint = useMediaQuery(`(max-width: ${BREAKPOINT_MAX_WIDTH})`)
  const [preventLinebreak, setPreventLinebreak] = useState(false)
  const [values, handlers] = useListState<IIntervenant>([])

  useEffect(() => {
    roomId &&
      (async () => {
        const unsubscriber = await subscribeToRoom({
          roomId,
          onValueUpdate: (data) => {
            handlers.setState(data.intervenants)
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
            <UserForm addIntervenant={handlers.prepend} />
            {!belowBreakpoint && <Divider orientation="vertical" />}
          </Group>
          <BannerSection
            intervenants={values}
            preventLinebreak={preventLinebreak}
            togglePreventLinebreak={togglePreventLinebreak}
          />
        </Box>
      </Stack>

      <Divider label="Organisation des intervenants" labelPosition="center" />
      <Board />
    </Stack>
  )
}

export default SettingsPage
