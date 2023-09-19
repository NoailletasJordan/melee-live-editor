import { Paper, PaperProps } from "@mantine/core"

type Props = PaperProps & {
  innerRef: (element: HTMLElement | null) => void
}

// BasicCard but with Paper
// Has to use Attach ref and providedProps to Paper, dont work with Card
const DraggableCard = ({ children, innerRef, ...cardProps }: Props) => (
  <Paper
    ref={innerRef}
    shadow="sm"
    p="lg"
    radius="md"
    withBorder
    {...cardProps}
  >
    {children}
  </Paper>
)

export default DraggableCard
