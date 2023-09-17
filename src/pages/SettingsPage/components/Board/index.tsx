import { Box, Card, Group } from "@mantine/core"
import { ReactNode } from "react"
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd"
import { StrictModeDroppable } from "./components/StrictModeDroppage"

const Board = () => {
  const onDragEnd = (test: DropResult) => {
    /** Temp */
    console.log({ test })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Group align="flex-start">
        {dummy.groups.map((group) => (
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
const dummy = {
  groups: [
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
  ],
}
