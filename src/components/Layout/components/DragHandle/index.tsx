import { ThemeIcon } from "@mantine/core"
import { IconDotsVertical } from "@tabler/icons-react"
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd"

interface Props {
  dragHandleProps?: DraggableProvidedDragHandleProps | null
  styles?: object
}

const DragHandle = ({ styles = {}, dragHandleProps }: Props) => {
  const themeIconStyle = {
    color: "black",
    width: "70%",
    height: "70%",
    cursor: "grab",
  }

  return (
    <ThemeIcon {...dragHandleProps} color="white" radius={"xl"}>
      <IconDotsVertical style={{ ...themeIconStyle, ...styles }} />
    </ThemeIcon>
  )
}

export default DragHandle
