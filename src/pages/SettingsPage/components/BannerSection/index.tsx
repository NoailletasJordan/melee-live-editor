import Banner from "@/components/Banner"
import BasicCard from "@/components/Layout/components/BasicCard"
import SubTitle from "@/components/SubTitle/index"
import TooltipWrapper from "@/components/TooltipWrapper"
import { IIntervenant } from "@/types"
import { Group, Skeleton, Stack, Switch } from "@mantine/core"

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
}: Props) => (
  <BasicCard>
    <Stack>
      <Group position="apart">
        <TooltipWrapper label="Le bandeau sera ajouté sur la page Bannière">
          <SubTitle>Prévisualisation*</SubTitle>
        </TooltipWrapper>
        <Switch
          disabled={isLoading}
          labelPosition="left"
          size="sm"
          label={
            <TooltipWrapper label="Si activé, force les noms à être affichés sur une seule ligne">
              Ligne unique*
            </TooltipWrapper>
          }
          checked={preventLinebreak}
          onChange={togglePreventLinebreak}
        />
      </Group>
      {isLoading ? (
        <Loader />
      ) : (
        <Banner
          intervenants={intervenants}
          preventLinebreak={preventLinebreak}
          noHeadband
        />
      )}
    </Stack>
  </BasicCard>
)

export default BannerSection

const Loader = () => <Skeleton height={100} mt={6} />
