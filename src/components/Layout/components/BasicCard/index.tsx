import { Card, CardProps } from "@mantine/core"

const BasicCard = ({ children, ...cardProps }: CardProps) => (
  <Card shadow="sm" padding="lg" radius="md" withBorder {...cardProps}>
    {children}
  </Card>
)

export default BasicCard
