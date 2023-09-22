import BasicCard from "@/components/Layout/components/BasicCard"
import SubTitle from "@/components/Layout/components/SubTitle/index"
import TooltipWrapper from "@/components/Layout/components/TooltipWrapper"
import { IIntervenant } from "@/types"
import {
  Box,
  Center,
  Divider,
  Group,
  ScrollArea,
  Skeleton,
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
  isLoading: boolean
}

const BannerSection = ({
  intervenants,
  togglePreventLinebreak,
  preventLinebreak,
  isLoading,
}: Props) => {
  return (
    <BasicCard>
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
            checked={preventLinebreak}
            onChange={togglePreventLinebreak}
          />
        </Group>
        {isLoading ? (
          <Loader />
        ) : (
          <Center>
            <Box style={{ overflow: "hidden" }}>
              <Divider size="xl" miw={"2rem"} />
              <ScrollArea type="auto" offsetScrollbars>
                <Group noWrap>
                  {intervenants.map(({ name, company, id }, index) => (
                    <Fragment key={id}>
                      {!!index && (
                        <Divider
                          orientation="vertical"
                          mt={"lg"}
                          mah={"5rem"}
                        />
                      )}
                      <Box p={"0.5rem"} maw={400}>
                        <Text
                          fz={"1.6rem"}
                          style={{
                            whiteSpace: preventLinebreak ? "nowrap" : "normal",
                          }}
                        >
                          {startCase(name)}
                        </Text>
                        <Text
                          align="center"
                          fs={"italic"}
                          style={{
                            whiteSpace: preventLinebreak ? "nowrap" : "normal",
                          }}
                        >
                          {company}
                        </Text>
                      </Box>
                    </Fragment>
                  ))}
                </Group>
              </ScrollArea>
            </Box>
          </Center>
        )}
      </Stack>
    </BasicCard>
  )
}

export default BannerSection

const Loader = () => <Skeleton height={100} mt={6} />
