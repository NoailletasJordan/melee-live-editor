import ImageContainer from "@/components/ImageContainer"
import SubTitle from "@/components/SubTitle"
import Title from "@/components/Title"
import { Alert, Box, Center, Code, Divider, Stack, Text } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons-react"
import { FallbackProps } from "react-error-boundary"

const FallbackError = (props: FallbackProps) => (
  <Stack maw={800} m="auto">
    <Center>
      <ImageContainer maxWidth={700}>
        <img height={"100%"} width={"100%"} src={"/bug.svg"} alt="Your SVG" />
      </ImageContainer>
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

export default FallbackError
