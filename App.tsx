import { QueryClient, QueryClientProvider } from "react-query";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favorites from "./screens/Favorites";
import Home from "./screens/Home";
import PhotoModal from "./components/PhotoModal";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 10 * 60 * 1000, // 10 min before cache goes stale.
      cacheTime: 5 * 60 * 1000, // 5 min (default)
      refetchOnWindowFocus: false,
    },
  },
});

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
    dark: false,
  },
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <NativeBaseProvider>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Favorites" component={Favorites} />
          </Stack.Navigator>

          <PhotoModal />
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
