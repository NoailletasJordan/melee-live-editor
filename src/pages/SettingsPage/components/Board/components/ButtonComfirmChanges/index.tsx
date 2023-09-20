import { Button } from "@mantine/core"

import { Affix, rem } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"

interface Props {
  open: boolean
  onClick: () => void
}

export const ButtonComfirmChanges = ({ open, onClick }: Props) => {
  if (!open) return null
  return (
    <Affix position={{ bottom: rem(20), right: rem(20) }}>
      <Button onClick={onClick} leftIcon={<IconCheck size="1rem" />}>
        Enregister les mofifications
      </Button>
    </Affix>
  )
}

export default ButtonComfirmChanges
