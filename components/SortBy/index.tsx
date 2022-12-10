import { Select, CheckIcon, Text, HStack, Box } from "native-base";
import { Platform } from "react-native";
import { useStore } from "../../query";

const SortBy = () => {
  const { sortPreference, setSortPreference } = useStore();

  return (
    <HStack alignItems="center">
      <Text marginRight={2}>Sort By</Text>
      <Box>
        <Select
          maxW={Platform?.OS === "web" ? "150px" : "100%"}
          minWidth="150"
          placeholder="Choose one"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          selectedValue={sortPreference}
          onValueChange={(itemValue) => setSortPreference(itemValue)}
        >
          <Select.Item label="Latest" value="Newest" />
          <Select.Item label="Popularity" value="Popularity" />
        </Select>
      </Box>
    </HStack>
  );
};

export default SortBy;
