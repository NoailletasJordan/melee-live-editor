import SubTitle from "@/components/Layout/components/SubTitle/index"
import TooltipWrapper from "@/components/Layout/components/TooltipWrapper"
import { IIntervenant } from "@/types"
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
import { startCase } from "lodash"
import { Fragment } from "react"

interface Props {
  togglePreventLinebreak: () => void
  preventLinebreak: boolean
  intervenants: IIntervenant[]
}

const BannerSection = ({
  intervenants,
  togglePreventLinebreak,
  preventLinebreak,
}: Props) => {
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
              {intervenants.map(({ name, company, id }, index) => (
                <Fragment key={id}>
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
                </Fragment>
              ))}
            </Group>
          </ScrollArea>
        </Box>
      </Stack>
    </Card>
  )
}

export default BannerSection