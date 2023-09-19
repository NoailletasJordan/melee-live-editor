import { IIntervenant } from "@/types"
import { TextInput } from "@mantine/core"
import { Draggable } from "react-beautiful-dnd"
import DraggableCard from "../BasicCardDrag"

interface Props {
  intervenant: IIntervenant
  index: number
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
}: Props) => (
  <Draggable draggableId={intervenant.id} index={index} key={intervenant.id}>
    {(providedDraggable) => (
      <DraggableCard
        innerRef={providedDraggable.innerRef}
        {...providedDraggable.draggableProps}
        {...providedDraggable.dragHandleProps}
        mb={"sm"}
      >
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
      </DraggableCard>
    )}
  </Draggable>
)

export default DraggableIntervenant
