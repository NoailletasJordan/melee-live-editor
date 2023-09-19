import { ICON_SIZE_DEFAULT } from "@/utils"
import { Avatar, Button, Group, Stack, TextInput } from "@mantine/core"
import { ReactNode } from "react"
import { Draggable } from "react-beautiful-dnd"
import { EyeCheck, EyeOff } from "tabler-icons-react"
import { data } from "../../temp"
import DraggableCard from "../BasicCardDrag"
import DroppableWrapper from "../DroppableWrapper"

interface Props {
  children: ReactNode
  group: (typeof data)[any]
  handleGroupUpdate: ({
    key,
    value,
  }: {
    key: keyof (typeof data)[any]
    value: any
  }) => void
  index: number
}

const DraggableGroup = (props: Props) => {
  const { children, handleGroupUpdate, group, index } = props
  return (
    <Draggable key={group.id} draggableId={group.id} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }) => (
        <DraggableCard
          {...dragHandleProps}
          {...draggableProps}
          bg={group.hidden ? "#EBEBE4" : undefined}
          innerRef={innerRef}
          ml={"sm"}
        >
          <Stack spacing={"xs"}>
            <Avatar src="avatar.png" alt="it's me" />

            <Group position="right">
              <TextInput
                placeholder="Titre du groupe"
                value={group.title}
                onChange={(event) =>
                  handleGroupUpdate({
                    key: "title",
                    value: event.target.value,
                  })
                }
              />
              <Button
                onClick={() =>
                  handleGroupUpdate({ key: "hidden", value: !group.hidden })
                }
              >
                {group.hidden ? (
                  <EyeOff size={ICON_SIZE_DEFAULT} />
                ) : (
                  <EyeCheck size={ICON_SIZE_DEFAULT} />
                )}
              </Button>
            </Group>

            <DroppableWrapper droppableId={group.id} type="intervenant">
              {children}
            </DroppableWrapper>
          </Stack>
        </DraggableCard>
      )}
    </Draggable>
  )
}

export default DraggableGroup
