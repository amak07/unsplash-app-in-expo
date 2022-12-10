import { Box } from "native-base";
import { Platform } from "react-native";
import AppBar from "../../components/AppBar";
import PhotoGrid from "../../components/PhotoGrid";

const Favorites = () => {
  return (
    <Box padding={Platform?.OS === "web" ? 6 : 2} paddingTop={0}>
      <AppBar showBackButton />
      <PhotoGrid title="My Favorite Photos" hidePaginator />
    </Box>
  );
};

export default Favorites;
