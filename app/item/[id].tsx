import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Item, CATEGORIES, STATUS_LABELS, STATUS_COLORS, ItemStatus } from "@/lib/types";

const STATUS_ORDER: ItemStatus[] = ["want_to_try", "planned", "booked", "done"];

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchItem() {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) setItem(data as Item);
      setLoading(false);
    }
    fetchItem();
  }, [id]);

  async function updateStatus(status: ItemStatus) {
    if (!item) return;
    setUpdating(true);
    const updates: Partial<Item> = { status };
    if (status === "done") updates.completed_at = new Date().toISOString();
    const { error } = await supabase.from("items").update(updates).eq("id", item.id);
    if (!error) setItem({ ...item, ...updates });
    setUpdating(false);
  }

  async function deleteItem() {
    Alert.alert("Delete item", "Are you sure? This can't be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await supabase.from("items").delete().eq("id", id);
          router.back();
        },
      },
    ]);
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-warm-50">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!item) {
    return (
      <View className="flex-1 items-center justify-center bg-warm-50">
        <Text className="text-gray-500">Item not found.</Text>
      </View>
    );
  }

  const cat = CATEGORIES.find((c) => c.key === item.category);

  return (
    <ScrollView className="flex-1 bg-warm-50" contentContainerStyle={{ padding: 20, gap: 16 }}>
      {/* Title card */}
      <View className="bg-white rounded-2xl p-5 border border-gray-100">
        <View className="flex-row items-center gap-2 mb-3">
          <Text className="text-2xl">{cat?.emoji ?? "💡"}</Text>
          <View className={`px-2 py-0.5 rounded-full ${STATUS_COLORS[item.status].split(" ")[0]}`}>
            <Text className={`text-xs font-medium ${STATUS_COLORS[item.status].split(" ")[1]}`}>
              {STATUS_LABELS[item.status]}
            </Text>
          </View>
        </View>
        <Text className="text-2xl font-bold text-gray-900">{item.title}</Text>
        {item.notes && (
          <Text className="text-gray-500 mt-2 leading-relaxed">{item.notes}</Text>
        )}
        {item.url && (
          <TouchableOpacity
            className="mt-3 flex-row items-center gap-1"
            onPress={() => Linking.openURL(item.url!)}
          >
            <Text className="text-primary-600 text-sm">🔗 Open link</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Status progression */}
      <View className="bg-white rounded-2xl p-5 border border-gray-100">
        <Text className="text-sm font-semibold text-gray-700 mb-3">Update status</Text>
        <View className="gap-2">
          {STATUS_ORDER.map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => updateStatus(s)}
              disabled={updating || item.status === s}
              className={`flex-row items-center px-4 py-3 rounded-xl border ${
                item.status === s
                  ? "bg-primary-50 border-primary-300"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text className="mr-2">
                {item.status === s ? "●" : "○"}
              </Text>
              <Text
                className={`font-medium ${
                  item.status === s ? "text-primary-700" : "text-gray-600"
                }`}
              >
                {STATUS_LABELS[s]}
              </Text>
              {s === "done" && item.status !== "done" && (
                <Text className="ml-auto text-lg">🎉</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Memory layer — shown when done */}
      {item.status === "done" && (
        <View className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
          <Text className="text-amber-800 font-semibold mb-1">✨ You did it!</Text>
          {item.completed_at && (
            <Text className="text-amber-700 text-sm">
              Completed {new Date(item.completed_at).toLocaleDateString()}
            </Text>
          )}
          {item.memory_note && (
            <Text className="text-amber-700 mt-2">{item.memory_note}</Text>
          )}
        </View>
      )}

      {/* Delete */}
      <TouchableOpacity
        className="items-center py-3"
        onPress={deleteItem}
      >
        <Text className="text-red-400 text-sm">Delete this item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
