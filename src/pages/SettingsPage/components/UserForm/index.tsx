import SubTitle from "@/components/Layout/components/SubTitle/index"
import { IIntervenant } from "@/types"
import { ICON_SIZE_DEFAULT } from "@/utils"
import {
  Box,
  Button,
  ButtonProps,
  Card,
  Group,
  Stack,
  TextInput,
} from "@mantine/core"
import { isNotEmpty, useForm } from "@mantine/form"
import { useTimeout } from "@mantine/hooks"
import { useRef, useState } from "react"
import { CircleCheck, UserPlus } from "tabler-icons-react"
import { v4 as uuidv4 } from "uuid"

interface Props {
  addIntervenant: (intervenant: IIntervenant) => void
}

const DURATION_INTERVENANT_JUST_ADDED_MS = 2500

const UserForm = ({ addIntervenant }: Props) => {
  const ref = useRef<HTMLInputElement>(null)
  const form = useForm({
    initialValues: { name: "", company: "" },
    validate: {
      name: isNotEmpty("Entrer un nom"),
      company: isNotEmpty("Entrer une entreprise"),
    },
  })
  const { start: willStopJustAdded } = useTimeout(
    () => setIntervenantJustBeenAdded(false),
    DURATION_INTERVENANT_JUST_ADDED_MS
  )
  const [intervenantJustBeenAdded, setIntervenantJustBeenAdded] =
    useState(false)

  const handleSubmit = (
    partialIntervenant: Pick<IIntervenant, "name" | "company">
  ) => {
    const additionnalKeys = {
      id: uuidv4(),
      hide: true,
    }
    addIntervenant({ ...partialIntervenant, ...additionnalKeys })
    form.reset()
    ref.current?.focus()
    setIntervenantJustBeenAdded(true)
    willStopJustAdded()
  }

  const buttonCommonProps: ButtonProps = {
    mt: "xs",
    type: "submit",
    variant: "filled",
  }
  const justAddedButton = (
    <Button
      {...buttonCommonProps}
      rightIcon={<CircleCheck size={ICON_SIZE_DEFAULT} />}
      color="green"
    >
      Ajouté
    </Button>
  )

  const defaultButton = (
    <Button
      {...buttonCommonProps}
      rightIcon={<UserPlus size={ICON_SIZE_DEFAULT} />}
    >
      Ajouter
    </Button>
  )

  return (
    <Card withBorder shadow="sm" radius="md" mih={228}>
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing={"xs"}>
          <SubTitle>Nouvel intervenant</SubTitle>
          <TextInput
            ref={ref}
            placeholder="Prenom Nom"
            {...form.getInputProps("name")}
          />
          <TextInput
            placeholder="Entreprise"
            {...form.getInputProps("company")}
          />
          <Group position="center">
            {intervenantJustBeenAdded ? justAddedButton : defaultButton}
          </Group>
        </Stack>
      </Box>
    </Card>
  )
}

export default UserForm
