import DragHandle from "@/components/Layout/components/DragHandle/index"
import { IIntervenant } from "@/types"
import { ActionIcon, Group, Stack, TextInput } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"
import { Draggable } from "react-beautiful-dnd"
import DraggableCard from "../BasicCardDrag"

interface Props {
  intervenant: IIntervenant
  index: number
  handleDeleteIntervenant: () => void
  handleIntervenantUpdate: ({
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
  handleIntervenantUpdate,
  handleDeleteIntervenant,
}: Props) => (
  <Draggable draggableId={intervenant.id} index={index} key={intervenant.id}>
    {(providedDraggable) => (
      <DraggableCard
        innerRef={providedDraggable.innerRef}
        {...providedDraggable.draggableProps}
        mb={"sm"}
      >
        <Stack>
          <Group position="right" spacing={"xs"}>
            <ActionIcon size={"md"} onClick={handleDeleteIntervenant}>
              <IconTrash width="70%" height="70%" cursor="pointer" />
            </ActionIcon>

            <DragHandle dragHandleProps={providedDraggable.dragHandleProps} />
          </Group>
          <TextInput
            placeholder="Nom de l'intervenant"
            value={intervenant.name}
            onChange={(event) =>
              handleIntervenantUpdate({
                key: "name",
                value: event.target.value,
              })
            }
          />

          <TextInput
            placeholder="Entreprise"
            value={intervenant.company}
            onChange={(event) =>
              handleIntervenantUpdate({
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

export default DraggableIntervenant
