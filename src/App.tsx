import { BrowserRouter as RouterProvider } from "react-router-dom"
import Routing from "./routes/routes"

function App() {
  return (
    <>
      <RouterProvider>
        <Routing/>
      </RouterProvider>
    </>
  )
}

export default App
