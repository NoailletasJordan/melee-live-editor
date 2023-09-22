import DragHandle from "@/components/DragHandle/index"
import { IGroup } from "@/types"
import {
  ActionIcon,
  Badge,
  Box,
  Divider,
  Group,
  Stack,
  TextInput,
} from "@mantine/core"
import { ReactNode } from "react"
import { Draggable } from "react-beautiful-dnd"
import { EyeCheck, EyeOff } from "tabler-icons-react"
import DraggableCard from "../BasicCardDrag"
import StrictModeDroppable from "../StrictModeDroppable"
import DeleteButton from "./components/DeleteButton"

interface Props {
  children: ReactNode
  group: IGroup
  handleUpdate: ({ key, value }: { key: keyof IGroup; value: any }) => void
  handleDelete: () => void
  index: number
  hideDeleteButton: boolean
}

const BACKGROUND_COLOR = "rgba(204, 204, 204, 0.7)"

const DraggableGroup = (props: Props) => {
  const { children, handleUpdate, group, index } = props
  const themeIconStyle = {
    width: "70%",
    height: "70%",
    cursor: "pointer",
  }

  const isHiddenBadge = (
    <Badge variant="dot" color="yellow">
      Masqué
    </Badge>
  )

  const IsShownBadge = (
    <Badge variant="filled" color="teal">
      Affiché
    </Badge>
  )

  return (
    <Draggable key={group.id} draggableId={group.id} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }) => (
        <DraggableCard
          {...draggableProps}
          bg={BACKGROUND_COLOR}
          innerRef={innerRef}
          mr={"sm"}
          miw={271}
        >
          <Stack spacing={"xs"}>
            <Group position="right" spacing={"xs"}>
              <Box mr="auto">{group.hidden ? isHiddenBadge : IsShownBadge}</Box>

              <ActionIcon
                onClick={() =>
                  handleUpdate({ key: "hidden", value: !group.hidden })
                }
                variant={group.hidden ? "light" : ""}
                color={group.hidden ? "blue" : ""}
              >
                {!group.hidden ? (
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
                handleUpdate({
                  key: "title",
                  value: event.target.value,
                })
              }
            />

            <Divider label="Intervenants" labelPosition="center" />

            <StrictModeDroppable droppableId={group.id} type="intervenant">
              {(providedDroppable) => (
                <div
                  ref={providedDroppable.innerRef}
                  {...providedDroppable.droppableProps}
                  // https://stackoverflow.com/a/55445514
                  style={{ minHeight: 1 }}
                >
                  {children}
                  {providedDroppable.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </Stack>
        </DraggableCard>
      )}
    </Draggable>
  )
}

export default DraggableGroup
