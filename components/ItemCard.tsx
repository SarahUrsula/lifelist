import { View, Text, TouchableOpacity } from "react-native";
import { Item, CATEGORIES, STATUS_LABELS, STATUS_COLORS } from "@/lib/types";

interface Props {
  item: Item;
  onPress: () => void;
}

export default function ItemCard({ item, onPress }: Props) {
  const cat = CATEGORIES.find((c) => c.key === item.category);
  const statusColor = STATUS_COLORS[item.status];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-4 border border-gray-100 active:opacity-80"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View className="flex-row items-start gap-3">
        {/* Emoji */}
        <View className="w-10 h-10 rounded-xl bg-warm-100 items-center justify-center">
          <Text className="text-xl">{cat?.emoji ?? "💡"}</Text>
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text
            className={`font-semibold text-base ${
              item.status === "done" ? "text-gray-400 line-through" : "text-gray-900"
            }`}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          {item.notes && (
            <Text className="text-gray-400 text-sm mt-0.5" numberOfLines={1}>
              {item.notes}
            </Text>
          )}
        </View>

        {/* Status badge */}
        <View className={`px-2 py-1 rounded-full ${statusColor.split(" ")[0]}`}>
          <Text className={`text-xs font-medium ${statusColor.split(" ")[1]}`}>
            {STATUS_LABELS[item.status]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
