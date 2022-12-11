import {
  Box,
  Center,
  Divider,
  Icon,
  Input,
  VStack,
  FormControl,
  IconButton,
  HStack,
  Button,
} from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Platform } from "react-native";
import { useEffect, useState } from "react";
import { useSearchForPhotos, useStore } from "../../query";
import SortBy from "../SortBy";
import { useNavigation } from "@react-navigation/native";

function SearchBar() {
  const [userSearchInput, setUserSearchInput] = useState<string>("");
  const {
    // setters
    updateSearchedPhotos,
    setPage,
    setSearchQuery,
    setDisplayedPhotos,

    // state variables
    page,
    searchQuery,
    favoritePhotos,
    sortPreference,
  } = useStore();

  const { data: searchResults } = useSearchForPhotos(
    searchQuery?.length === 0 ? "trending today" : searchQuery,
    page
  );

  // updates displayed photos on any and all user interactions (per app requirements).
  useEffect(() => {
    if (searchResults) {
      updateSearchedPhotos(searchResults);
      setDisplayedPhotos(searchResults);
    }
  }, [searchResults, sortPreference]);

  // Form Management
  const onSearchSumbit = () => {
    if (userSearchInput?.length === 0) {
      onSearchClear();
      return;
    }

    setSearchQuery(userSearchInput);
    setPage(1);
  };

  const onSearchClear = () => {
    setUserSearchInput("");
    setSearchQuery("");
    setPage(1);
  };

  const navigation = useNavigation();

  return (
    <Center>
      <VStack
        my="4"
        w="100%"
        maxW={Platform?.OS === "web" ? "450px" : "100%"}
        divider={
          <Box px="2">
            <Divider />
          </Box>
        }
      >
        <VStack w="100%" alignSelf="center" justifyContent="center">
          <FormControl>
            <Input
              testID="unsplash-search"
              value={userSearchInput}
              onSubmitEditing={() => onSearchSumbit()}
              onChangeText={(value) => setUserSearchInput(value)}
              placeholder="Search free high-res photos"
              borderRadius="4"
              py="3"
              px="1"
              fontSize="14"
              InputLeftElement={
                <Icon
                  m="2"
                  ml="3"
                  size="6"
                  color="gray.400"
                  as={<MaterialIcons name="search" />}
                />
              }
              InputRightElement={
                userSearchInput?.length > 0 && (
                  <IconButton
                    size="md"
                    _icon={{
                      as: MaterialIcons,
                      name: "close",
                    }}
                    onPress={() => onSearchClear()}
                  />
                )
              }
            />
          </FormControl>
        </VStack>

        <HStack justifyContent="space-between">
          <Button
            marginTop={2}
            variant="outline"
            onPress={() => {
              setDisplayedPhotos(favoritePhotos);
              navigation.navigate("Favorites");
            }}
          >
            See Favorites
          </Button>
          <SortBy />
        </HStack>
      </VStack>
    </Center>
  );
}

export default SearchBar;
