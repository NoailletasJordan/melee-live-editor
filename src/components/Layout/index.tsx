import {
  Alert,
  AppShell,
  Box,
  Center,
  Code,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons-react"
import { ReactNode } from "react"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { useLocation } from "react-router-dom"
import Navbar, { Props as NavbarProps } from "./components/Navbar"
import SubTitle from "./components/SubTitle"
import Title from "./components/Title"

interface Props extends NavbarProps {
  children: ReactNode
}

const Layout = ({ children, ...navbarProps }: Props) => {
  const location = useLocation()

  return (
    <AppShell navbar={<Navbar {...navbarProps} />}>
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

const FallbackError = (props: FallbackProps) => {
  return (
    <Stack maw={800} m="auto">
      <Center>
        <Box
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            objectFit: "fill",
            maxWidth: 700,
          }}
        >
          <img height={"100%"} width={"100%"} src={"/bug.svg"} alt="Your SVG" />
        </Box>
      </Center>

      <Alert
        icon={
          <Box mt={12}>
            <IconAlertCircle size="1.4rem" />{" "}
          </Box>
        }
        title={<Title>Une erreur est survenue :c</Title>}
        color="red"
      >
        <SubTitle>Et ce n'est pas de votre faute</SubTitle>
        <Text>
          Veuillez contacter le responsable web pour comprendre ce qu'il c'est
          passé
        </Text>
        <Text>Désolé pour le dérangement </Text>

        {props.error.message && (
          <>
            <Divider my={16} />
            <Box fz="md">
              Message d'erreur: <Code>{props.error.message}</Code>
            </Box>
          </>
        )}
      </Alert>
    </Stack>
  )
}
