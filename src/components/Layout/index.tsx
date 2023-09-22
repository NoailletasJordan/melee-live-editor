import { AppShell, Box, Group } from "@mantine/core"
import { ReactNode } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useLocation } from "react-router-dom"
import FallbackError from "./components/FallbackComponent"
import Navbar, { Props as NavbarProps } from "./components/Navbar"

interface Props extends NavbarProps {
  children: ReactNode
}

const Layout = ({ children, ...navbarProps }: Props) => {
  const location = useLocation()
  const noLayout = location.pathname.includes("/banner")

  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : noLayout
              ? ""
              : "#F5F5F5",
        },
      })}
      navbar={!noLayout ? <Navbar {...navbarProps} /> : undefined}
    >
      <Group position="center" grow>
        <Box maw={1300}>
          <ErrorBoundary
            key={location.pathname}
            FallbackComponent={FallbackError}
          >
            {children}
          </ErrorBoundary>
        </Box>
      </Group>
    </AppShell>
  )
}

export default Layout
