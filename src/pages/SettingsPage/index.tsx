import Title from "@/components/Title"
import { subscribeToRoom, updateRoom } from "@/firebase"
import { IGroup, IIntervenant } from "@/types"
import { getRoomBannerLink } from "@/utils"
import { Box, Button, Divider, Group, Skeleton, Stack } from "@mantine/core"
import { upperFirst, useMediaQuery } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconCheck, IconExternalLink } from "@tabler/icons-react"
import { Unsubscribe } from "firebase/database"
import { cloneDeep, isEqual, set } from "lodash"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import {
  generateNewGroup,
  getNonHiddenIntervenants,
  getRandomSubmitMessage,
} from "./actions"
import BannerSection from "./components/BannerSection"
import Board from "./components/Board/index"
import ButtonComfirmChanges from "./components/ButtonComfirmChanges/index"
import UserForm from "./components/UserForm/index"

const BREAKPOINT_MAX_WIDTH = "54em"
interface IStateValues {
  groups: IGroup[]
  preventLinebreak: boolean
}
const defaultValues = {
  groups: [],
  preventLinebreak: false,
}

const SettingsPage = () => {
  const unsubscriberRef = useRef<Unsubscribe>()
  const { roomId } = useParams()
  const belowBreakpoint = useMediaQuery(`(max-width: ${BREAKPOINT_MAX_WIDTH})`)
  const [preventLinebreak, setPreventLinebreak] = useState(
    defaultValues.preventLinebreak
  )
  const [groups, setGroups] = useState<IGroup[]>(defaultValues.groups)
  const [oldState, setOldState] = useState<IStateValues>(defaultValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [error, setError] = useState<Error>()
  const navigate = useNavigate()

  const configIsEdited = !isEqual({ groups, preventLinebreak }, oldState)

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
            setGroups(roomData.groups || [])
            setPreventLinebreak(roomData.preventNamesLineBreak)
            setOldState({
              groups: roomData.groups || [],
              preventLinebreak: roomData.preventNamesLineBreak,
            })
            setIsSubmitting(false)
            setIsInitialLoading(false)
          },
        })

        unsubscriberRef.current = unsubscriber

        return () => {
          unsubscriberRef.current?.()
        }
      })()
  }, [roomId])

  if (error) throw new Error(error.message)

  const togglePreventLinebreak = () => setPreventLinebreak(!preventLinebreak)

  const addIntervenant = (
    partialIntervenant: Pick<IIntervenant, "name" | "company">
  ) => {
    const newIntervenant = {
      id: uuidv4(),
      ...partialIntervenant,
    }

    // Create intervenants if dont exist
    const groupsIsEmpty = !groups.length
    if (groupsIsEmpty) {
      const newGroup = generateNewGroup()
      newGroup.intervenants = [newIntervenant]
      setGroups([newGroup])
      return
    }

    const newFirstGroupIntervenants = [
      newIntervenant,
      ...groups[0].intervenants,
    ]
    const newGroups = set(
      cloneDeep(groups),
      "[0].intervenants",
      newFirstGroupIntervenants
    )
    setGroups(newGroups)
  }

  const nonHiddenIntervenants = getNonHiddenIntervenants(groups)

  const handleSubmitChange = async () => {
    if (!roomId) return
    const newFields = {
      groups,
      preventNamesLineBreak: preventLinebreak,
    }
    setIsSubmitting(true)
    await updateRoom({ roomId, newFields })
    notifications.show({
      icon: <IconCheck size="1.2rem" />,
      title: getRandomSubmitMessage(),
      message: "Mise a jour prise en compte",
    })
  }

  const revertChanges = () => {
    setGroups(oldState.groups)
    setPreventLinebreak(oldState.preventLinebreak)
  }

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: !belowBreakpoint ? "max-content auto" : "1fr",
    gap: "1rem",
  }

  return (
    <>
      <Stack>
        {!roomId ? (
          <Skeleton height={8} h={"2rem"} maw={"16rem"} />
        ) : (
          <Group>
            <Title>{`Paramètres de la page ${upperFirst(roomId || "")}`}</Title>
            <Button
              onClick={() => navigate(getRoomBannerLink(roomId))}
              variant="light"
              rightIcon={<IconExternalLink size={14} />}
            >
              Bannière
            </Button>
          </Group>
        )}

        <Stack>
          <Box style={gridStyle}>
            <Group>
              <UserForm
                isLoading={isInitialLoading}
                addIntervenant={addIntervenant}
              />
              {!belowBreakpoint && <Divider orientation="vertical" />}
            </Group>
            <BannerSection
              isLoading={isInitialLoading}
              intervenants={nonHiddenIntervenants}
              preventLinebreak={preventLinebreak}
              togglePreventLinebreak={togglePreventLinebreak}
            />
          </Box>
        </Stack>

        <Divider label="Organisation des intervenants" labelPosition="center" />
        <Board
          isLoading={isInitialLoading}
          groups={groups}
          setGroups={setGroups}
        />
      </Stack>
      <ButtonComfirmChanges
        isSubmitting={isSubmitting}
        onClickSubmit={handleSubmitChange}
        onClickRevert={revertChanges}
        open={configIsEdited}
        disabled={isInitialLoading}
      />
    </>
  )
}

export default SettingsPage
