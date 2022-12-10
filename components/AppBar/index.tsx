import {
  StatusBar,
  Box,
  HStack,
  IconButton,
  Text,
  Icon,
  Avatar,
  VStack,
  Center,
} from "native-base";
import Icons from "@expo/vector-icons/FontAwesome5";
import abel from "../../assets/abel.jpeg";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../../query";

const AppBar: React.FC<{ showBackButton?: boolean }> = ({
  showBackButton = false,
}) => {
  const navigation = useNavigation();
  const { searchedPhotos, setDisplayedPhotos } = useStore();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Box safeAreaTop bg="white" />
      <HStack
        px="2"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        {showBackButton && (
          <HStack alignItems="center">
            <IconButton
              onPress={() => {
                setDisplayedPhotos(searchedPhotos);
                navigation.goBack();
              }}
              icon={
                <Icon
                  size="sm"
                  as={Icons}
                  name={"chevron-left"}
                  color="light.600"
                />
              }
            />
            <Text color="light.600" fontWeight="semibold">
              BACK
            </Text>
          </HStack>
        )}

        {!showBackButton && (
          <VStack alignItems="center">
            <Center>
              <IconButton
                icon={
                  <Icon
                    size="sm"
                    as={Icons}
                    name={"map-marker-alt"}
                    color="light.600"
                  />
                }
              />
              <Text color="light.600" fontWeight="semibold">
                {"NYC"}
              </Text>
            </Center>
          </VStack>
        )}

        <Center>
          <Text fontWeight="bold" fontSize={24}>
            Unsplash API
          </Text>
        </Center>

        <VStack>
          <Center>
            <Avatar source={abel}>AJ</Avatar>
            <Text color="light.600" fontWeight="semibold">
              Abel Mak
            </Text>
          </Center>
        </VStack>
      </HStack>
    </>
  );
};

export default AppBar;
