import { Text } from "@mantine/core"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const Title = ({ children }: Props) => (
  <Text fz="xl" fw={500}>
    {children}
  </Text>
)

export default Title
