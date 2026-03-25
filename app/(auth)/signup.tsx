import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUp() {
    if (!email || !password || !name) {
      Alert.alert("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } },
    });
    if (error) {
      Alert.alert("Sign up failed", error.message);
    } else {
      Alert.alert("Check your email", "We sent you a confirmation link.");
    }
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-warm-50"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 justify-center px-6">
        {/* Logo / Title */}
        <View className="items-center mb-10">
          <Text className="text-5xl mb-2">✨</Text>
          <Text className="text-4xl font-bold text-primary-600">LifeList</Text>
          <Text className="text-gray-500 mt-1">Start your journey</Text>
        </View>

        {/* Form */}
        <View className="gap-4">
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">Name</Text>
            <TextInput
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900"
              placeholder="Your name"
              value={name}
              onChangeText={setName}
              autoComplete="name"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">Email</Text>
            <TextInput
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">Password</Text>
            <TextInput
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900"
              placeholder="Min. 6 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
            />
          </View>

          <TouchableOpacity
            className="w-full py-4 rounded-xl bg-primary-500 items-center mt-2"
            onPress={signUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold text-base">Create Account</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-500">Already have an account? </Text>
          <Link href="/(auth)/login">
            <Text className="text-primary-600 font-medium">Sign in</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
