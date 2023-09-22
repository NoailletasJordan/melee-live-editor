import { Button, Group, Transition } from "@mantine/core"

import { Affix, rem } from "@mantine/core"
import { IconArrowBackUp, IconCheck } from "@tabler/icons-react"

interface Props {
  open: boolean
  onClickSubmit: () => void
  onClickRevert: () => void
  isSubmitting: boolean
  disabled: boolean
}

export const ButtonComfirmChanges = ({
  open,
  onClickSubmit,
  onClickRevert,
  isSubmitting,
  disabled,
}: Props) => (
  <Affix position={{ bottom: rem(20), right: rem(20) }}>
    <Transition transition="slide-up" mounted={open}>
      {(transitionStyles) => (
        <Group style={transitionStyles}>
          <Button
            loading={isSubmitting}
            onClick={onClickRevert}
            leftIcon={<IconArrowBackUp size="1rem" />}
            color="gray"
          >
            Annuler
          </Button>
          <Button
            loading={isSubmitting}
            onClick={onClickSubmit}
            leftIcon={<IconCheck size="1rem" />}
            disabled={disabled}
          >
            Enregister
          </Button>
        </Group>
      )}
    </Transition>
  </Affix>
)

export default ButtonComfirmChanges
