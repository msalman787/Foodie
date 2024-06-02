import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "./src/navigation";
import { QueryClient, QueryClientProvider } from "react-query";
function App() {
  const queryClient = new QueryClient();
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <StackNavigation />
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
