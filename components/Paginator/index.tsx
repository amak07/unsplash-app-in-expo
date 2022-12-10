import { HStack, IconButton, Button, Text } from "native-base";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useStore } from "../../query";

const Paginator = () => {
  const { setPage, page } = useStore();

  return (
    <HStack space={2} alignItems="center">
      <IconButton
        size="md"
        _icon={{
          as: MaterialIcons,
          name: "chevron-left",
        }}
        isDisabled={page === 1}
        onPress={() => setPage(page - 1)}
      />

      {page && (
        <Button variant="subtle" size="sm">
          <Text>Page {page}</Text>
        </Button>
      )}

      <IconButton
        size="md"
        _icon={{
          as: MaterialIcons,
          name: "chevron-right",
        }}
        onPress={() => setPage(page + 1)}
        isDisabled={page === 50} // set to 50 since unsplash API will rate limit at 50 queries per hour.
      />
    </HStack>
  );
};

export default Paginator;
