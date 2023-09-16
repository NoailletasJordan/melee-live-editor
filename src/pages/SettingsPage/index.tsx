import Title from "@/components/Layout/components/Title"
import { subscribeToRoom } from "@/firebase"
import { Box, Divider, Group, Skeleton, Stack } from "@mantine/core"
import { upperFirst, useMediaQuery } from "@mantine/hooks"
import { Unsubscribe } from "firebase/database"
import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import BannerSection from "./components/BannerSection"
import UserForm from "./components/UserForm/index"

const BREAKPOINT_MAX_WIDTH = "54em"

const SettingsPage = () => {
  const unsubscriberRef = useRef<Unsubscribe>()
  const { roomId } = useParams()
  const belowBreakpoint = useMediaQuery(`(max-width: ${BREAKPOINT_MAX_WIDTH})`)

  useEffect(() => {
    roomId &&
      (async () => {
        const unsubscriber = await subscribeToRoom({
          roomId,
          onValueUpdate: (data) => {
            console.log(data)
          },
        })

        unsubscriberRef.current = unsubscriber

        return () => {
          unsubscriberRef.current?.()
        }
      })()
  }, [roomId])

  return (
    <Stack>
      {!roomId ? (
        <Skeleton height={8} h={"2rem"} maw={"16rem"} />
      ) : (
        <Title>{`Paramètres de la page ${upperFirst(roomId || "")}`}</Title>
      )}

      <Stack>
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: !belowBreakpoint ? "max-content auto" : "1fr",
            gap: "1rem",
          }}
        >
          <Group>
            <UserForm />
            {!belowBreakpoint && <Divider orientation="vertical" />}
          </Group>
          <BannerSection />
        </Box>
      </Stack>
    </Stack>
  )
}

export default SettingsPage
