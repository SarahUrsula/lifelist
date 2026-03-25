import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { CATEGORIES, CategoryKey } from "@/lib/types";

export default function AddItemScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState<CategoryKey>("other");
  const [loading, setLoading] = useState(false);

  async function save() {
    if (!title.trim()) {
      Alert.alert("Give it a name first.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("items").insert({
      user_id: user!.id,
      title: title.trim(),
      category,
      notes: notes.trim() || null,
      url: url.trim() || null,
      status: "want_to_try",
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      router.back();
    }
    setLoading(false);
  }

  return (
    <View className="flex-1 bg-warm-50">
      {/* Header */}
      <View className="px-5 pt-14 pb-4 bg-white border-b border-gray-100 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-gray-500 text-base">Cancel</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Add to LifeList</Text>
        <TouchableOpacity onPress={save} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#6366f1" />
          ) : (
            <Text className="text-primary-600 font-semibold text-base">Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, gap: 20 }}>
        {/* Title */}
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1.5">
            What do you want to do? *
          </Text>
          <TextInput
            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 text-base"
            placeholder="e.g. Try that new ramen place, Watch Dune 2..."
            value={title}
            onChangeText={setTitle}
            autoFocus
            returnKeyType="done"
          />
        </View>

        {/* Category */}
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-2">Category</Text>
          <View className="flex-row flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.key}
                onPress={() => setCategory(cat.key)}
                className={`flex-row items-center px-3 py-2 rounded-xl border ${
                  category === cat.key
                    ? "bg-primary-500 border-primary-500"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text className="mr-1">{cat.emoji}</Text>
                <Text
                  className={`text-sm font-medium ${
                    category === cat.key ? "text-white" : "text-gray-600"
                  }`}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* URL */}
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1.5">
            Link <Text className="text-gray-400 font-normal">(optional)</Text>
          </Text>
          <TextInput
            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900"
            placeholder="Paste a link..."
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
            keyboardType="url"
          />
        </View>

        {/* Notes */}
        <View>
          <Text className="text-sm font-medium text-gray-700 mb-1.5">
            Notes <Text className="text-gray-400 font-normal">(optional)</Text>
          </Text>
          <TextInput
            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900"
            placeholder="Any details to remember..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            style={{ minHeight: 80 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
