import { ActionIcon, Menu } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"

interface Props {
  handleDelete: () => void
}

const DeleteButton = (props: Props) => (
  <Menu shadow="md" width={200}>
    <Menu.Target>
      <ActionIcon size={"md"}>
        <IconTrash width="70%" height="70%" cursor="pointer" />
      </ActionIcon>
    </Menu.Target>

    <Menu.Dropdown>
      <Menu.Label>Sans regret hein ?</Menu.Label>

      <Menu.Item
        color="red"
        closeMenuOnClick
        onClick={props.handleDelete}
        icon={<IconTrash size={"1rem"} />}
      >
        Supprimer le groupe
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
)

export default DeleteButton
