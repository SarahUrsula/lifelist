import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { Item, CATEGORIES, CategoryKey } from "@/lib/types";
import ItemCard from "@/components/ItemCard";

const FILTERS: { key: CategoryKey | "all"; label: string; emoji: string }[] = [
  { key: "all", label: "All", emoji: "✨" },
  { key: "food", label: "Food", emoji: "🍽️" },
  { key: "movies", label: "Movies", emoji: "🎬" },
  { key: "travel", label: "Travel", emoji: "✈️" },
  { key: "activities", label: "Activities", emoji: "🎯" },
  { key: "music", label: "Music", emoji: "🎵" },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<CategoryKey | "all">("all");

  async function fetchItems() {
    if (!user) return;
    let query = supabase
      .from("items")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (activeFilter !== "all") {
      query = query.eq("category", activeFilter);
    }

    const { data, error } = await query;
    if (!error && data) setItems(data as Item[]);
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchItems();
  }, [user, activeFilter]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchItems();
  };

  const pendingItems = items.filter((i) => i.status !== "done");
  const doneItems = items.filter((i) => i.status === "done");

  return (
    <View className="flex-1 bg-warm-50">
      {/* Header */}
      <View className="px-5 pt-14 pb-4 bg-white border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">My LifeList</Text>
        <Text className="text-gray-500 text-sm mt-0.5">
          {pendingItems.length} to do · {doneItems.length} done
        </Text>
      </View>

      {/* Category filter */}
      <View className="bg-white border-b border-gray-100">
        <FlatList
          horizontal
          data={FILTERS}
          keyExtractor={(i) => i.key}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, gap: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setActiveFilter(item.key)}
              className={`flex-row items-center px-3 py-1.5 rounded-full border ${
                activeFilter === item.key
                  ? "bg-primary-500 border-primary-500"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text className="text-sm mr-1">{item.emoji}</Text>
              <Text
                className={`text-sm font-medium ${
                  activeFilter === item.key ? "text-white" : "text-gray-600"
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* List */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#6366f1" />
        </View>
      ) : items.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-5xl mb-4">🌟</Text>
          <Text className="text-xl font-semibold text-gray-800 text-center">
            Nothing here yet
          </Text>
          <Text className="text-gray-500 text-center mt-2">
            Tap the + button to add your first experience
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ padding: 16, gap: 12 }}
          renderItem={({ item }) => (
            <ItemCard
              item={item}
              onPress={() => router.push(`/item/${item.id}`)}
            />
          )}
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        className="absolute bottom-8 right-6 w-14 h-14 rounded-full bg-primary-500 items-center justify-center shadow-lg"
        onPress={() => router.push("/add-item")}
        style={{
          shadowColor: "#6366f1",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Text className="text-white text-3xl leading-none">+</Text>
      </TouchableOpacity>
    </View>
  );
}
