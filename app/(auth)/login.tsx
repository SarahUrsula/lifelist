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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signIn() {
    if (!email || !password) {
      Alert.alert("Please enter your email and password.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert("Sign in failed", error.message);
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-warm-50"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-1 justify-center px-6">
        {/* Logo / Title */}
        <View className="items-center mb-12">
          <Text className="text-5xl mb-2">✨</Text>
          <Text className="text-4xl font-bold text-primary-600">LifeList</Text>
          <Text className="text-gray-500 mt-1">Your life, your experiences</Text>
        </View>

        {/* Form */}
        <View className="gap-4">
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
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          <TouchableOpacity
            className="w-full py-4 rounded-xl bg-primary-500 items-center mt-2"
            onPress={signIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold text-base">Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-500">Don't have an account? </Text>
          <Link href="/(auth)/signup">
            <Text className="text-primary-600 font-medium">Sign up</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
