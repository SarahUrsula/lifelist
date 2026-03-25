import { View, Text } from "react-native";

export default function MapScreen() {
  return (
    <View className="flex-1 bg-warm-50 items-center justify-center">
      <Text className="text-5xl mb-4">🗺️</Text>
      <Text className="text-xl font-semibold text-gray-800">Map View</Text>
      <Text className="text-gray-500 text-center mt-2 px-8">
        Your saved places will appear here
      </Text>
      <Text className="text-gray-400 text-sm mt-1">Coming soon</Text>
    </View>
  );
}
