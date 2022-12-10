import { Box } from "native-base";
import { Platform } from "react-native";
import AppBar from "../../components/AppBar";
import PhotoGrid from "../../components/PhotoGrid";
import SearchBar from "../../components/SearchBar";

const Home = () => {
  return (
    <Box padding={Platform?.OS === "web" ? 6 : 2} paddingTop={0}>
      <AppBar />
      <SearchBar />
      <PhotoGrid />
    </Box>
  );
};

export default Home;
