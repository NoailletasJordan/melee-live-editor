import BasicCard from "@/components/Layout/components/BasicCard"
import SubTitle from "@/components/SubTitle/index"
import { IIntervenant } from "@/types"
import { ICON_SIZE_DEFAULT } from "@/utils"
import {
  Box,
  Button,
  ButtonProps,
  Group,
  Stack,
  TextInput,
} from "@mantine/core"
import { isNotEmpty, useForm } from "@mantine/form"
import { useTimeout } from "@mantine/hooks"
import { useRef, useState } from "react"
import { CircleCheck, UserPlus } from "tabler-icons-react"

interface Props {
  addIntervenant: (intervenant: Pick<IIntervenant, "name" | "company">) => void
  isLoading: boolean
}

const DURATION_INTERVENANT_JUST_ADDED_MS = 2500

const UserForm = ({ addIntervenant, isLoading }: Props) => {
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

  const handleSubmit = (formValues: Pick<IIntervenant, "name" | "company">) => {
    addIntervenant(formValues)
    form.reset()
    ref.current?.focus()
    setIntervenantJustBeenAdded(true)
    willStopJustAdded()
  }

  const buttonCommonProps: ButtonProps = {
    mt: "xs",
    type: "submit",
    variant: "filled",
    disabled: isLoading,
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
    <BasicCard mih={228}>
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
    </BasicCard>
  )
}

export default UserForm
