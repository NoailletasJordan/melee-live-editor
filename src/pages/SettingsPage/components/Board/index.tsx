import { Box, Card, Group } from "@mantine/core"
import { cloneDeep, set } from "lodash"
import { ReactNode, useState } from "react"
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd"
import { StrictModeDroppable } from "./components/StrictModeDroppage"

interface Props {
  reorder: () => void
}

const Board = ({ reorder }: Props) => {
  const [groups, setGroups] = useState(data)
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return

    const newGroups = cloneDeep(groups)
    const sourceGroupIndex = newGroups.findIndex(
      ({ id }) => id === source.droppableId
    )
    const destinationGroupIndex = newGroups.findIndex(
      ({ id }) => id === destination.droppableId
    )

    const sourceIntervenants = newGroups[sourceGroupIndex]?.intervenants
    const destinationIntervenants =
      newGroups[destinationGroupIndex]?.intervenants

    const movedElement = sourceIntervenants[source.index]

    const dataWithoutMovedElement = set(
      cloneDeep(newGroups),
      `[${sourceGroupIndex}].intervenants`,
      sourceIntervenants.filter((_, i) => i !== source.index)
    )

    const newDestinationIntervenants = [
      ...dataWithoutMovedElement[destinationGroupIndex].intervenants.slice(
        0,
        destination.index
      ),
      movedElement,
      ...dataWithoutMovedElement[destinationGroupIndex].intervenants.slice(
        destination.index
      ),
    ]
    const dataWithCorrectMovedElement = set(
      cloneDeep(dataWithoutMovedElement),
      `[${destinationGroupIndex}].intervenants`,
      newDestinationIntervenants
    )

    setGroups(dataWithCorrectMovedElement)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Group align="flex-start">
        {groups.map((group) => (
          <Col key={group.id} name={group.name}>
            <StrictModeDroppable droppableId={group.id}>
              {(providedDroppable) => (
                <div
                  ref={providedDroppable.innerRef}
                  {...providedDroppable.droppableProps}
                >
                  <Box>
                    {group.intervenants.map(({ name, id }, index) => (
                      <Draggable draggableId={id} index={index} key={id}>
                        {(providedDraggable) => (
                          <div
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                          >
                            <Intrv name={name} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {providedDroppable.placeholder}
                  </Box>
                </div>
              )}
            </StrictModeDroppable>
          </Col>
        ))}
      </Group>
    </DragDropContext>
  )
}

const Col = ({ name, children }: { children: ReactNode; name: string }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <p> GROUP : {name}</p>

      {children}
    </Card>
  )
}

const Intrv = ({ name }: { name: string }) => {
  return (
    <Card m="sm" shadow="sm" padding="lg" radius="md" withBorder>
      <p>{name}</p>
    </Card>
  )
}

export default Board
// temp col need unique id
/** Temp */
const data = [
  {
    id: "g1",
    name: "group1",
    intervenants: [
      {
        id: "1",
        name: "John",
        company: "ABC Inc.",
        hidden: false,
      },
      {
        id: "2",
        name: "Alice",
        company: "XYZ Corp.",
        hidden: true,
      },
      {
        id: "3",
        name: "Bob",
        company: "DEF Ltd.",
        hidden: false,
      },
      {
        id: "4",
        name: "Eve",
        company: "GHI Co.",
        hidden: true,
      },
      {
        id: "5",
        name: "Charlie",
        company: "LMN Industries",
        hidden: false,
      },
      {
        id: "6",
        name: "Grace",
        company: "JKL Enterprises",
        hidden: true,
      },
    ],
  },
  {
    id: "g2",
    name: "group2",
    intervenants: [
      {
        id: "7",
        name: "Oliver",
        company: "MNO Group",
        hidden: false,
      },
      {
        id: "8",
        name: "Sophia",
        company: "PQR Solutions",
        hidden: true,
      },
      {
        id: "9",
        name: "Liam",
        company: "STU Services",
        hidden: false,
      },
    ],
  },
]
