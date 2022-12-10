import {
  Modal,
  Image,
  VStack,
  Center,
  Avatar,
  Text,
  View,
  IconButton,
} from "native-base";
import { StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useStore } from "../../query";

const PhotoModal = () => {
  const {
    showModal,
    setShowModal,
    displayedPhotos,
    selectedCard,
    updateFavoritesPhotos,
    favoritePhotos,
  } = useStore();

  const photo = displayedPhotos[selectedCard];

  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <IconButton
            onPress={() => {
              updateFavoritesPhotos(photo);
            }}
            size="md"
            _icon={{
              as: MaterialIcons,
              name: favoritePhotos?.find((item) => item.id === photo?.id)
                ? "heart"
                : "cards-heart-outline",
              color: "pink.500",
            }}
            _hover={{
              bg: "pink.100",
            }}
            style={styles.favoriteBtn}
          />
          <Modal.CloseButton />
          <Modal.Header backgroundColor="gray.100">
            <VStack>
              <Center>
                <Avatar
                  size="sm"
                  source={{ uri: photo?.user?.profile_image?.medium }}
                ></Avatar>
                <Text color="light.600" fontWeight="semibold">
                  {photo?.user?.first_name} {photo?.user?.last_name}
                </Text>
              </Center>
            </VStack>
          </Modal.Header>
          <Modal.Body margin={0} padding={0}>
            <View style={styles.item}>
              <Image
                width={400}
                height={300}
                resizeMode={"cover"}
                source={{
                  uri: photo?.urls?.regular,
                }}
                alt="Alternate Text"
              />
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default PhotoModal;

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  favoriteBtn: { position: "absolute", left: 10, zIndex: 100, top: 10 },
});
