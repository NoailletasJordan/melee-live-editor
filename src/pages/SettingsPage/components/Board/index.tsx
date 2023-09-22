import BasicCard from "@/components/Layout/components/BasicCard"
import SubTitle from "@/components/Layout/components/SubTitle"
import { IGroup, IIntervenant } from "@/types"
import {
  ActionIcon,
  Box,
  Flex,
  ScrollArea,
  Skeleton,
  Stack,
} from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import {
  cloneDeep,
  find as lodashFind,
  findIndex as lodashFindIndex,
  set,
} from "lodash"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { generateNewGroup } from "../../actions"
import DraggableGroup from "./components/DraggableGroup"
import DraggableIntervenant from "./components/DraggableIntervenant"
import StrictModeDroppable from "./components/StrictModeDroppable"

const insertAtIndex = (arr: any[], index: number, newItem: any) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
]

const removeAtIndex = (array: any[], indexToRemove: number) =>
  array.filter((_, index) => indexToRemove !== index)

interface IReorderGroups {
  initialGroups: IGroup[]
  dropResult: DropResult
}
const reorderGroups = ({
  initialGroups,
  dropResult: { source, destination },
}: IReorderGroups): IGroup[] => {
  if (!destination) return initialGroups

  const clonedGroups = cloneDeep(initialGroups)
  const targetedGroup = clonedGroups[source.index]
  const groupsFiltered = removeAtIndex(clonedGroups, source.index)
  const reorderedGroups = insertAtIndex(
    groupsFiltered,
    destination.index,
    targetedGroup
  )

  return reorderedGroups
}

interface IRemoveIntervenantFromGroupsById {
  groups: IGroup[]
  id: string
}
const removeIntervenantFromGroupsById = ({
  groups,
  id,
}: IRemoveIntervenantFromGroupsById): IGroup[] =>
  groups.map((group) => ({
    ...group,
    intervenants: group.intervenants.filter(
      ({ id: comparedId }) => comparedId !== id
    ),
  }))

interface IInsertIntervenantInGroup {
  groups: IGroup[]
  intervenant: any
  groupIndex: number
  intervenantIndex: number
}
const insertIntervenantInGroup = ({
  groups,
  intervenant,
  groupIndex,
  intervenantIndex,
}: IInsertIntervenantInGroup): IGroup[] =>
  set(
    cloneDeep(groups),
    `[${groupIndex}].intervenants`,
    insertAtIndex(
      groups[groupIndex].intervenants,
      intervenantIndex,
      intervenant
    )
  )

const reorderIntervernants = ({
  initialGroups,
  dropResult: { destination, draggableId },
}: {
  initialGroups: IGroup[]
  dropResult: DropResult
}) => {
  if (!destination) return initialGroups

  const destinationGroupIndex = lodashFindIndex(initialGroups, [
    "id",
    destination.droppableId,
  ])
  const targetedElement = initialGroups
    .flatMap((group) => lodashFind(group.intervenants, ["id", draggableId]))
    .filter((value) => !!value)[0]

  const filteredGroups = removeIntervenantFromGroupsById({
    groups: initialGroups,
    id: draggableId,
  })

  const reorderedGroups = insertIntervenantInGroup({
    groupIndex: destinationGroupIndex,
    groups: filteredGroups,
    intervenantIndex: destination.index,
    intervenant: targetedElement,
  })

  return reorderedGroups
}
interface Props {
  groups: IGroup[]
  setGroups: (groups: IGroup[]) => void
  isLoading: boolean
}

const Board = ({ groups, setGroups, isLoading }: Props) => {
  const onDragEnd = (dropResult: DropResult) => {
    const functionsParameters = { dropResult, initialGroups: groups }
    const reorderFunctions = {
      group: reorderGroups,
      intervenant: reorderIntervernants,
    }

    const reordered =
      reorderFunctions[dropResult.type as keyof typeof reorderFunctions](
        functionsParameters
      )
    setGroups(reordered)
  }

  const handleGroupUpdate =
    (groupIndex: number) =>
    ({ key, value }: { key: keyof IGroup; value: any }) => {
      const newGroups = set(cloneDeep(groups), `[${groupIndex}].${key}`, value)
      setGroups(newGroups)
    }

  const handleIntervenantUpdate =
    ({
      groupIndex,
      intervenantIndex,
    }: {
      groupIndex: number
      intervenantIndex: number
    }) =>
    ({ key, value }: { key: keyof IIntervenant; value: any }) => {
      const updatedGroups = set(
        cloneDeep(groups),
        `[${groupIndex}].intervenants[${intervenantIndex}].${key}`,
        value
      )
      setGroups(updatedGroups)
    }

  const handleDeleteGroup = (index: number) => () => {
    setGroups(groups.filter((_, currentIndex) => currentIndex !== index))
  }

  // Grid used for the scrollArea
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "100%",
    gap: "1rem",
  }

  const handleDeleteIntervenant =
    ({
      groupIndex,
      intervenantIndex,
    }: {
      groupIndex: number
      intervenantIndex: number
    }) =>
    () => {
      const newIntervenant = groups[groupIndex].intervenants.filter(
        (_, index) => index !== intervenantIndex
      )
      const newGroups = set(
        cloneDeep(groups),
        `[${groupIndex}].intervenants`,
        newIntervenant
      )
      setGroups(newGroups)
    }

  const addGroup = () => {
    const newGroup = generateNewGroup()
    setGroups([...groups, newGroup])
  }

  return (
    <BasicCard>
      <Stack>
        <SubTitle>Groupes d'intervenants</SubTitle>
        {isLoading ? (
          <Skeleton h={200} />
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable
              droppableId="all-collumns"
              type="group"
              direction="horizontal"
            >
              {(providedDroppable) => (
                <div
                  ref={providedDroppable.innerRef}
                  {...providedDroppable.droppableProps}
                >
                  <Box style={gridStyle}>
                    <ScrollArea type="auto" offsetScrollbars>
                      <Flex
                        wrap={"nowrap"}
                        justify="flex-start"
                        align="flex-start"
                      >
                        {groups.map((group, groupIndex) => (
                          <DraggableGroup
                            hideDeleteButton={groups.length === 1}
                            key={group.id}
                            handleDelete={handleDeleteGroup(groupIndex)}
                            group={group}
                            handleGroupUpdate={handleGroupUpdate(groupIndex)}
                            index={groupIndex}
                          >
                            {group.intervenants.map(
                              (intervenant, intervenantIndex) => (
                                <DraggableIntervenant
                                  handleDeleteIntervenant={handleDeleteIntervenant(
                                    {
                                      groupIndex,
                                      intervenantIndex,
                                    }
                                  )}
                                  key={intervenant.id}
                                  intervenant={intervenant}
                                  index={intervenantIndex}
                                  handleIntervenantUpdate={handleIntervenantUpdate(
                                    {
                                      groupIndex: groupIndex,
                                      intervenantIndex: intervenantIndex,
                                    }
                                  )}
                                />
                              )
                            )}
                          </DraggableGroup>
                        ))}
                        {providedDroppable.placeholder}
                        <ActionIcon
                          color="primary"
                          variant="filled"
                          size="lg"
                          radius="xl"
                          aria-label="Add group"
                          onClick={addGroup}
                        >
                          <IconPlus
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      </Flex>
                    </ScrollArea>
                  </Box>
                </div>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        )}
      </Stack>
    </BasicCard>
  )
}

export default Board
