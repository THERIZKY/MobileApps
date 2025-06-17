import { CartProvider } from "@/src/contexts/CartContext";
import { ThemeProvider } from "@/src/contexts/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "../src/hooks/useTheme";
import "./global.css";

const AppContent = () => {
    const { isDark } = useTheme();

    return (
        <>
            <StatusBar
                style={isDark ? "light" : "dark"}
                backgroundColor="transparent"
                translucent
            />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </>
    );
};

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <CartProvider>
                    <AppContent />
                </CartProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
