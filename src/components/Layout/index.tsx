import { AppShell, Box, Group } from "@mantine/core"
import { ReactNode } from "react"
import Navbar, { Props as NavbarProps } from "./components/Navbar"

interface Props extends NavbarProps {
  children: ReactNode
}

const Layout = ({ children, ...navbarProps }: Props) => (
  <AppShell navbar={<Navbar {...navbarProps} />}>
    <Group position="center" grow>
      <Box maw={1300}>{children}</Box>
    </Group>
  </AppShell>
)

export default Layout
