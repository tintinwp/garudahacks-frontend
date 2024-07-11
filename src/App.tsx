import { BrowserRouter as RouterProvider } from "react-router-dom"
import Routing from "./routes/routes"
import AllLayout from "./layouts/all-layout"
import { QueryClient, QueryClientProvider } from "react-query";
import { LoadingProvider } from "./context/loading-context";
import { ApiProvider } from "./context/api-context";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LoadingProvider>
          <ApiProvider>
            <RouterProvider>
              <AllLayout>
                <Routing/>
              </AllLayout>
            </RouterProvider>
          </ApiProvider>
        </LoadingProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
