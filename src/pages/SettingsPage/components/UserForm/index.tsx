import SubTitle from "@/components/Layout/components/SubTitle/index"
import { ICON_SIZE_DEFAULT } from "@/utils"
import { Box, Button, Card, Group, Stack, TextInput } from "@mantine/core"
import { isNotEmpty, useForm } from "@mantine/form"
import { UserPlus } from "tabler-icons-react"

const UserForm = () => {
  const form = useForm({
    initialValues: { name: "", company: "" },
    validate: {
      name: isNotEmpty("Entrer un nom"),
      company: isNotEmpty("Entrer une entreprise"),
    },
  })

  return (
    <Card withBorder shadow="sm" radius="md" mih={228}>
      <Box component="form" onSubmit={form.onSubmit(console.log)}>
        <Stack spacing={"xs"}>
          <SubTitle>Nouvel intervenant</SubTitle>
          <TextInput placeholder="Prenom Nom" {...form.getInputProps("name")} />
          <TextInput
            placeholder="Entreprise"
            {...form.getInputProps("company")}
          />
          <Group position="center">
            <Button
              rightIcon={<UserPlus size={ICON_SIZE_DEFAULT} />}
              mt="xs"
              type="submit"
              color="blue"
              variant="filled"
            >
              Ajouter
            </Button>
          </Group>
        </Stack>
      </Box>
    </Card>
  )
}

export default UserForm
