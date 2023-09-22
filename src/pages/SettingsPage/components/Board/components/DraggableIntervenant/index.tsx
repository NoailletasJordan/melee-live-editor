import DragHandle from "@/components/DragHandle/index"
import { IIntervenant } from "@/types"
import { ActionIcon, Group, Stack, TextInput, ThemeIcon } from "@mantine/core"
import { IconExclamationMark, IconTrash } from "@tabler/icons-react"
import { Draggable } from "react-beautiful-dnd"
import DraggableCard from "../BasicCardDrag"

interface Props {
  intervenant: IIntervenant
  index: number
  handleDelete: () => void
  handleUpdate: ({
    key,
    value,
  }: {
    key: keyof IIntervenant
    value: any
  }) => void
}

const DraggableIntervenant = ({
  intervenant,
  index,
  handleUpdate,
  handleDelete,
}: Props) => {
  const showWarning =
    !intervenant.name.trim().length || !intervenant.company.trim().length

  const warning = (
    <ThemeIcon mr={"auto"} radius="xl" color="yellow" variant="filled">
      <IconExclamationMark style={{ width: "70%", height: "70%" }} />
    </ThemeIcon>
  )

  return (
    <Draggable draggableId={intervenant.id} index={index} key={intervenant.id}>
      {(providedDraggable) => (
        <DraggableCard
          innerRef={providedDraggable.innerRef}
          {...providedDraggable.draggableProps}
          mb={"sm"}
        >
          <Stack>
            <Group position="right" spacing={"xs"}>
              {showWarning && warning}

              <ActionIcon size={"md"} onClick={handleDelete}>
                <IconTrash width="70%" height="70%" cursor="pointer" />
              </ActionIcon>

              <DragHandle dragHandleProps={providedDraggable.dragHandleProps} />
            </Group>
            <TextInput
              placeholder="Nom de l'intervenant"
              value={intervenant.name}
              onChange={(event) =>
                handleUpdate({
                  key: "name",
                  value: event.target.value,
                })
              }
            />

            <TextInput
              placeholder="Entreprise"
              value={intervenant.company}
              onChange={(event) =>
                handleUpdate({
                  key: "company",
                  value: event.target.value,
                })
              }
            />
          </Stack>
        </DraggableCard>
      )}
    </Draggable>
  )
}

export default DraggableIntervenant
