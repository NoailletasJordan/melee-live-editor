import { Text } from "@mantine/core"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const SubTitle = ({ children }: Props) => (
  <Text fz="md" fw={500}>
    {children}
  </Text>
)

export default SubTitle
