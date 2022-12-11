import React from "react";
import {
  StyleSheet,
  Platform,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import {
  View,
  Image,
  Spinner,
  Text,
  FlatList,
  HStack,
  Icon,
  useBreakpointValue,
} from "native-base";
import { useStore } from "../../query";
import Paginator from "../Paginator";
import MaterialIcons from "@expo/vector-icons/MaterialCommunityIcons";

const PhotoGrid: React.FC<{
  title?: string;
  hidePaginator?: boolean;
}> = ({ hidePaginator = false, title }) => {
  const { setSelectedCard, setShowModal, displayedPhotos, searchQuery } =
    useStore();

  const columns = useBreakpointValue({
    xl: 4,
    lg: 4,
    md: 3,
    sm: 2,
    base: 2,
  });

  return (
    <>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        paddingX={1}
        marginTop={8}
        marginBottom={4}
      >
        {title && (
          <Text fontWeight="semibold" fontSize={18}>
            My Favorite Photos
          </Text>
        )}

        {!title && (
          <Text testID="grid-title" fontWeight="semibold" fontSize={18}>
            {searchQuery.length === 0
              ? "Trending Today"
              : `Showing photos for "${searchQuery}"`}
          </Text>
        )}

        {!hidePaginator && <Paginator />}
      </HStack>

      {displayedPhotos?.length === 0 && (
        <View style={styles.spinner}>
          <Spinner color="danger.400" size="lg" marginBottom={4} />
          <Text>No Photos Available.</Text>
          <Text>Favorite some photos to see them here later!</Text>
        </View>
      )}

      {displayedPhotos?.length > 0 && (
        <View>
          <FlatList
            key={columns}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
            data={displayedPhotos}
            numColumns={Platform?.OS === "web" ? columns : 1}
            contentContainerStyle={{
              paddingBottom: Platform?.OS === "web" ? 0 : 750,
            }}
            renderItem={({ item, index }) => (
              <TouchableHighlight
                testID="displayed-image-button"
                style={styles.item}
                onPress={() => {
                  setSelectedCard(index);
                  setShowModal(true);
                }}
              >
                <>
                  <Image
                    width={"100%"}
                    height={"100%"}
                    resizeMode={"cover"}
                    source={{
                      uri: item?.urls?.regular,
                    }}
                    alt="Alternate Text"
                    borderRadius={8}
                  />

                  {item?.likes > 1 && (
                    <HStack
                      style={{
                        position: "absolute",
                        bottom: 4,
                        left: 4,
                      }}
                      alignItems="center"
                    >
                      <Icon
                        m="2"
                        ml="3"
                        size="6"
                        color="white"
                        as={<MaterialIcons name="cards-heart-outline" />}
                      />
                      <Text color="white">{item?.likes} likes</Text>
                    </HStack>
                  )}

                  <HStack
                    style={{
                      position: "absolute",
                      bottom: 4,
                      right: 12,
                    }}
                    alignItems="center"
                  >
                    <Icon
                      m="2"
                      ml="3"
                      size="6"
                      color="white"
                      as={<MaterialIcons name="calendar" />}
                    />
                    <Text color="white">
                      {new Date(item?.created_at).toLocaleDateString()}
                    </Text>
                  </HStack>
                </>
              </TouchableHighlight>
            )}
          />
        </View>
      )}
    </>
  );
};

export default PhotoGrid;

const styles = StyleSheet.create({
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 400,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 4,
    borderRadius: 8,
    height: Platform?.OS === "web" ? Dimensions.get("window").width / 4 : 350,
    maxWidth: "100%",
  },
});
