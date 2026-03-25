import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "@/context/AuthContext";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  function confirmSignOut() {
    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign out", style: "destructive", onPress: signOut },
    ]);
  }

  return (
    <View className="flex-1 bg-warm-50">
      <View className="px-5 pt-14 pb-4 bg-white border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">Profile</Text>
      </View>

      <View className="p-5 gap-4">
        {/* User card */}
        <View className="bg-white rounded-2xl p-5 border border-gray-100">
          <View className="items-center">
            <View className="w-20 h-20 rounded-full bg-primary-100 items-center justify-center mb-3">
              <Text className="text-4xl">
                {user?.user_metadata?.display_name?.[0]?.toUpperCase() ?? "👤"}
              </Text>
            </View>
            <Text className="text-lg font-semibold text-gray-900">
              {user?.user_metadata?.display_name ?? "Explorer"}
            </Text>
            <Text className="text-gray-500 text-sm mt-0.5">{user?.email}</Text>
          </View>
        </View>

        {/* Sign out */}
        <TouchableOpacity
          className="bg-white rounded-2xl p-4 border border-gray-100 flex-row items-center"
          onPress={confirmSignOut}
        >
          <Text className="text-red-500 font-medium flex-1">Sign Out</Text>
          <Text className="text-gray-400">→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
