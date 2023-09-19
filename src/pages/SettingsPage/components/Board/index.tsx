import { IIntervenant } from "@/types"
import { Flex } from "@mantine/core"
import {
  cloneDeep,
  find as lodashFind,
  findIndex as lodashFindIndex,
  set,
} from "lodash"
import { useState } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import DraggableGroup from "./components/DraggableGroups"
import DraggableIntervenant from "./components/DraggableIntervenant"
import DroppableWrapper from "./components/DroppableWrapper"
import { data } from "./temp"

const insertAtIndex = (arr: any[], index: number, newItem: any) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
]

const removeAtIndex = (array: any[], indexToRemove: number) =>
  array.filter((_, index) => indexToRemove !== index)

interface IReorderGroups {
  initialGroups: typeof data
  dropResult: DropResult
}
const reorderGroups = ({
  initialGroups,
  dropResult: { source, destination },
}: IReorderGroups): typeof data => {
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
  groups: typeof data
  id: string
}
const removeIntervenantFromGroupsById = ({
  groups,
  id,
}: IRemoveIntervenantFromGroupsById): typeof data =>
  groups.map((group) => ({
    ...group,
    intervenants: group.intervenants.filter(
      ({ id: comparedId }) => comparedId !== id
    ),
  }))

interface IInsertIntervenantInGroup {
  groups: typeof data
  intervenant: any
  groupIndex: number
  intervenantIndex: number
}
const insertIntervenantInGroup = ({
  groups,
  intervenant,
  groupIndex,
  intervenantIndex,
}: IInsertIntervenantInGroup): typeof data =>
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
  initialGroups: typeof data
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

const Board = () => {
  const [groups, setGroups] = useState(data)
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
    ({ key, value }: { key: keyof (typeof data)[any]; value: any }) => {
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DroppableWrapper
        droppableId="all-collumns"
        direction="horizontal"
        type="group"
      >
        <Flex align="flex-start">
          {groups.map((group, index2) => (
            <DraggableGroup
              key={group.id}
              group={group}
              handleGroupUpdate={handleGroupUpdate(index2)}
              index={index2}
            >
              {group.intervenants.map((intervenant, index) => (
                <DraggableIntervenant
                  key={intervenant.id}
                  intervenant={intervenant}
                  index={index}
                  handleIntervenantUpdate={handleIntervenantUpdate({
                    groupIndex: index2,
                    intervenantIndex: index,
                  })}
                />
              ))}
            </DraggableGroup>
          ))}
        </Flex>
      </DroppableWrapper>
    </DragDropContext>
  )
}

export default Board
