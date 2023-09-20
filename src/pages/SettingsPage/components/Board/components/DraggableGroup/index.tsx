import {
  ActionIcon,
  Divider,
  Group,
  Menu,
  Stack,
  TextInput,
} from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"
import { ReactNode } from "react"
import { Draggable } from "react-beautiful-dnd"
import { EyeCheck, EyeOff } from "tabler-icons-react"
import DragHandle from "../../../../../../components/Layout/components/DragHandle/index"
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
  handleDelete: () => void
  index: number
  hideDeleteButton: boolean
}

const DraggableGroup = (props: Props) => {
  const { children, handleGroupUpdate, group, index } = props
  const themeIconStyle = {
    width: "70%",
    height: "70%",
    cursor: "pointer",
  }

  return (
    <Draggable key={group.id} draggableId={group.id} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }) => (
        <DraggableCard
          {...draggableProps}
          bg={group.hidden ? "#EBEBE4" : undefined}
          innerRef={innerRef}
          ml={"sm"}
          miw={250}
        >
          <Stack spacing={"xs"}>
            <Group position="right" spacing={"xs"}>
              <ActionIcon
                onClick={() =>
                  handleGroupUpdate({ key: "hidden", value: !group.hidden })
                }
              >
                {group.hidden ? (
                  <EyeOff style={themeIconStyle} />
                ) : (
                  <EyeCheck style={themeIconStyle} />
                )}
              </ActionIcon>

              {!props.hideDeleteButton && (
                <DeleteButton handleDelete={props.handleDelete} />
              )}

              <DragHandle dragHandleProps={dragHandleProps} />
            </Group>

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

            <Divider label="Intervenants" labelPosition="center" />

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

interface Props {}

const DeleteButton = (props: Pick<Props, "handleDelete">) => (
  <Menu shadow="md" width={200}>
    <Menu.Target>
      <ActionIcon size={"md"}>
        <IconTrash width="70%" height="70%" cursor="pointer" />
      </ActionIcon>
    </Menu.Target>

    <Menu.Dropdown>
      <Menu.Label>Sans regret hein ?</Menu.Label>

      <Menu.Item
        color="red"
        closeMenuOnClick
        onClick={props.handleDelete}
        icon={<IconTrash size={"1rem"} />}
      >
        Supprimer le groupe
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
)
