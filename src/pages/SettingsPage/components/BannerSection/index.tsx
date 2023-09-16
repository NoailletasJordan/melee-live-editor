import SubTitle from "@/components/Layout/components/SubTitle/index"
import TooltipWrapper from "@/components/Layout/components/TooltipWrapper"
import {
  Box,
  Card,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Switch,
  Text,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { startCase } from "lodash"

const BannerSection = () => {
  const [preventLinebreak, { toggle: togglePreventLinebreak }] =
    useDisclosure(true)

  const dummy = [
    { name: "georges Musket", company: "Tesla" },
    { name: "geo b ", company: "Tesla" },
    { name: "georges Musket ", company: "Tesla" },
    { name: "Pascal Azema", company: "Tesla" },
    { name: "georges Musket", company: "Tesla" },
    { name: "georges Musket", company: "Tesla" },
  ]

  return (
    <Card withBorder shadow="sm" radius="md">
      <Stack>
        <Group position="apart">
          <SubTitle>Vue Bannière</SubTitle>
          <Switch
            labelPosition="left"
            size="sm"
            label={
              <TooltipWrapper label="Si activé, force les noms à être affichés sur une seule ligne">
                Ligne unique
              </TooltipWrapper>
            }
            checked={!preventLinebreak}
            onChange={togglePreventLinebreak}
          />
        </Group>
        <Box>
          <Divider size="xl" miw={"2rem"} />
          <ScrollArea type="auto" offsetScrollbars>
            <Group noWrap>
              {dummy.map(({ name, company }, index) => (
                <>
                  {!!index && (
                    <Divider orientation="vertical" mt={"lg"} mah={"5rem"} />
                  )}
                  <Box p={"0.5rem"} maw={400}>
                    <Text
                      fz={"1.6rem"}
                      style={{
                        whiteSpace: !preventLinebreak ? "nowrap" : "normal",
                      }}
                    >
                      {startCase(name)}
                    </Text>
                    <Text align="center" fs={"italic"}>
                      {company}
                    </Text>
                  </Box>
                </>
              ))}
            </Group>
          </ScrollArea>
        </Box>
      </Stack>
    </Card>
  )
}

export default BannerSection
