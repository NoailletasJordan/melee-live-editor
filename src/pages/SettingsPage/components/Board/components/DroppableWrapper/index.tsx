import { ReactNode } from "react"
import { DroppableProps } from "react-beautiful-dnd"

type Props = Omit<DroppableProps, "children"> & {
  children?: ReactNode
}

const DroppableWrapper = ({
  droppableId,
  type,
  children,
  ...otherProps
}: Props) => (
  <StrictModeDroppable droppableId={droppableId} type={type} {...otherProps}>
    {(providedDroppable) => (
      <div
        ref={providedDroppable.innerRef}
        {...providedDroppable.droppableProps}
        // https://stackoverflow.com/a/55445514
        style={{ minHeight: 50 }}
      >
        {children}
        {providedDroppable.placeholder}
      </div>
    )}
  </StrictModeDroppable>
)

export default DroppableWrapper

// StrictModeDroppable.tsx
// Credits to https://github.com/GiovanniACamacho and https://github.com/Meligy for the TypeScript version
// Original post: https://github.com/atlassian/react-beautiful-dnd/issues/2399#issuecomment-1175638194
import { useEffect, useState } from "react"
import { Droppable } from "react-beautiful-dnd"
const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))
    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])
  if (!enabled) {
    return null
  }
  return <Droppable {...props}>{children}</Droppable>
}
