import { IIntervenant } from "@/types"
import {
  Box,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Text,
  Transition,
} from "@mantine/core"
import { useInterval, useTimeout, useToggle } from "@mantine/hooks"
import { Fragment, useContext, useEffect, useState } from "react"
import { ColorsContext } from "../ContextWrapper/context"
import ImageContainer from "../ImageContainer"

interface Props {
  intervenants: IIntervenant[]
  preventLinebreak: boolean
  noHeadband?: boolean
}

const HEADBAND_WIDTH = 380
const HEADBAND_INTERVAL_TRIGGERED_EVERY_MS = 30000
const HEADBAND_INTERVAL_STAYS_OPEN_MS = 8000

const Banner = ({ intervenants, preventLinebreak, noHeadband }: Props) => {
  const colorsContext = useContext(ColorsContext)

  const CustomDivider = () => (
    <Box miw={HEADBAND_WIDTH} h={5} bg={colorsContext.colors.nameColor} />
  )

  return (
    <Box>
      {!noHeadband && <HeadBand />}
      <Group position="center">
        <Stack
          style={{ overflow: "hidden" }}
          ff="font-family: 'Lato', sans-serif;"
        >
          <CustomDivider />
          <ScrollArea type="auto" offsetScrollbars>
            <Group noWrap position="center">
              {intervenants.map(({ name, company, id }, index) => (
                <Fragment key={id}>
                  {!!index && (
                    <Divider
                      color={colorsContext.colors.nameColor}
                      orientation="vertical"
                      mt={"lg"}
                      mah={"5rem"}
                    />
                  )}
                  <Box p={"0.5rem"} maw={400}>
                    <Text
                      fz={22}
                      fw={600}
                      color={colorsContext.colors.nameColor}
                      style={{
                        whiteSpace: preventLinebreak ? "nowrap" : "normal",
                      }}
                    >
                      {name}
                    </Text>
                    <Text
                      color={colorsContext.colors.companyColor}
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
        </Stack>
      </Group>
    </Box>
  )
}

export default Banner

const HeadBand = () => {
  const { start: delayStopIsOpen } = useTimeout(
    () => setIsOpen(false),
    HEADBAND_INTERVAL_STAYS_OPEN_MS
  )
  const [imageLink, toggle] = useToggle(["/bandeau1.svg", "/bandeau2.svg"])
  const [isOpen, setIsOpen] = useState(false)
  const interval = useInterval(() => {
    toggle()
    setIsOpen(true)
    delayStopIsOpen()
  }, HEADBAND_INTERVAL_TRIGGERED_EVERY_MS)

  useEffect(() => {
    interval.start()
    return interval.stop
  }, [interval])

  return (
    <ImageContainer maxWidth={HEADBAND_WIDTH}>
      <Transition
        mounted={isOpen}
        transition="slide-right"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <img
              height={"100%"}
              width={"100%"}
              src={imageLink}
              alt="Your SVG"
            />
          </div>
        )}
      </Transition>
    </ImageContainer>
  )
}
