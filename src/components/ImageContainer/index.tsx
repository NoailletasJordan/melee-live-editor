import { Box } from "@mantine/core"
import { ReactNode } from "react"

interface Props {
  maxWidth: string | number
  children: ReactNode
}

const ImageContainer = ({ maxWidth, children }: Props) => (
  <Box
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      objectFit: "fill",
      maxWidth,
    }}
  >
    {children}
  </Box>
)

export default ImageContainer
