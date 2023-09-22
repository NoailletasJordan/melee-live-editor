import { Group, Text, Tooltip } from "@mantine/core"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
  label: ReactNode
}

const TooltipWrapper = ({ children, label }: Props) => (
  <Tooltip label={label} position="bottom-end">
    <Group spacing={"xs"} style={{ cursor: "help" }}>
      <Text fs={"italic"}>{children}</Text>
    </Group>
  </Tooltip>
)

export default TooltipWrapper
