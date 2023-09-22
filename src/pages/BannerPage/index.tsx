import Banner from "@/components/Banner"
import { subscribeToRoom } from "@/firebase"
import { IRoomData } from "@/types"
import { Affix } from "@mantine/core"
import { Unsubscribe } from "firebase/database"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { getNonHiddenIntervenants } from "../SettingsPage/actions"

const BannerPage = () => {
  const { roomId } = useParams()
  const unsubscriberRef = useRef<Unsubscribe>()
  const [room, setRoom] = useState<IRoomData>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    roomId &&
      (async () => {
        const unsubscriber = await subscribeToRoom({
          roomId,
          onValueUpdate: (roomData) => {
            if (!roomData)
              return setError(
                new Error('"Les données de cette pages sont introuvables"')
              )
            setRoom(roomData)
          },
        })

        unsubscriberRef.current = unsubscriber

        return () => {
          unsubscriberRef.current?.()
        }
      })()
  }, [roomId])

  if (error) throw new Error(error.message)
  if (!room) return

  const nonHiddenIntervenants = getNonHiddenIntervenants(room.groups || [])

  return (
    <Affix position={{ bottom: 70, left: 70 }}>
      <Banner
        intervenants={nonHiddenIntervenants}
        preventLinebreak={room.preventNamesLineBreak}
      />
    </Affix>
  )
}

export default BannerPage
