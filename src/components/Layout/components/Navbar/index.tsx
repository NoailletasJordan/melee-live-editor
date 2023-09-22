import { ColorFamily } from "@/types"
import { getRoomSettingsLink } from "@/utils"
import {
  Divider,
  Navbar as MantineNavbar,
  MediaQuery,
  NavLink,
  Skeleton,
  Stack,
} from "@mantine/core"
import { upperFirst } from "@mantine/hooks"
import { IconDoorExit, IconHome2 } from "@tabler/icons-react"
import { useLocation, useNavigate } from "react-router-dom"

export interface Props {
  navbarConfig: INavbarConfig[]
  isLoading: boolean
}

interface INavbarConfig {
  name: string
  id: string
  colorFamily: ColorFamily
}

const NAVBAR_SKELETONS_NUMBER = 6

const Navbar = ({ navbarConfig, isLoading }: Props) => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
      <MantineNavbar p="sm" width={{ xs: 200, lg: 300 }}>
        <MantineNavbar.Section>
          <NavLink
            label="Vue d'ensemble"
            active={location.pathname === "/"}
            onClick={() => navigate("/")}
            variant="filled"
            icon={<IconHome2 size="1rem" />}
          />
        </MantineNavbar.Section>
        <Divider my="sm" opacity={0.5} />
        <MantineNavbar.Section>
          {isLoading ? (
            <LoaderNavbar rowsNumber={NAVBAR_SKELETONS_NUMBER} />
          ) : (
            navbarConfig.map(({ name, id, colorFamily }) => {
              const navbarPath = getRoomSettingsLink(id)
              return (
                <NavLink
                  onClick={() => navigate(navbarPath)}
                  key={name}
                  active={location.pathname === navbarPath}
                  label={upperFirst(name)}
                  color={colorFamily}
                  variant="filled"
                  icon={<IconDoorExit size="1rem" />}
                />
              )
            })
          )}
        </MantineNavbar.Section>
      </MantineNavbar>
    </MediaQuery>
  )
}

export default Navbar

const LoaderNavbar = ({ rowsNumber }: { rowsNumber: number }) => (
  <Stack spacing="xs">
    {[...Array(rowsNumber)].map((_, index) => (
      <Skeleton key={index} height={30} radius={0} />
    ))}
  </Stack>
)
