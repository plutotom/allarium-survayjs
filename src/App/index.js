import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import ProjectRoutes from "./ProjectRoutes";

// Create a client
export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {/* Routes includes main app and all sub-apps. */}
      <ProjectRoutes />
      {/* <NormalizeStyles /> */}
      {/* <BaseStyles /> */}
    </QueryClientProvider>
  );
}

export default App;
