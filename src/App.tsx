import HomePage from "@/pages/HomePage"
import { MantineProvider, MantineThemeOverride } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ContextWrapper from "./components/ContextWrapper/index.tsx"
import Layout from "./components/Layout/index.tsx"
import { getRooms } from "./firebase.ts"
import BannerPage from "./pages/BannerPage/index.tsx"
import SettingsPage from "./pages/SettingsPage/index.tsx"
import { IDatabase } from "./types.ts"

const App = () => {
  const [rooms, setRooms] = useState<IDatabase["rooms"]>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const res = await getRooms()
      setIsLoading(false)
      setRooms(res)
    })()
  }, [])

  const roomsDataWithId = Object.entries(rooms || {}).map(
    ([roomId, roomData]) => ({
      id: roomId,
      ...roomData,
    })
  )

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Notifications />
      <ContextWrapper>
        <BrowserRouter>
          <Layout navbarConfig={roomsDataWithId} isLoading={isLoading}>
            <Routes>
              <Route
                index
                element={
                  <HomePage
                    isLoading={isLoading}
                    roomsWithId={roomsDataWithId}
                  />
                }
              />
              <Route path="/:roomId/settings" element={<SettingsPage />} />
              <Route path="/:roomId/banner" element={<BannerPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ContextWrapper>
    </MantineProvider>
  )
}

export default App

const theme: MantineThemeOverride = {
  components: {
    Navbar: {
      styles: {
        root: {
          backgroundColor: "#F0F0F0",
        },
      },
    },
  },
}
