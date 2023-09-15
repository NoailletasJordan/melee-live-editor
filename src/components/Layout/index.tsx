import { AppShell, Box, Group, Header, Text } from "@mantine/core"
import { ReactNode } from "react"
import Navbar, { Props as NavbarProps } from "./components/Navbar"

interface Props extends NavbarProps {
  children: ReactNode
}

const Layout = ({ children, ...navbarProps }: Props) => (
  <AppShell
    navbar={<Navbar {...navbarProps} />}
    header={
      <Header height={{ base: 50, md: 70 }} p="md">
        <Text>Salut à toi, jeune régisseur!</Text>
      </Header>
    }
  >
    <Group position="center" grow>
      <Box maw={1300}>{children}</Box>
    </Group>
  </AppShell>
)

export default Layout
