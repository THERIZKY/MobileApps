import BottomTopItems from "@/src/components/layouts/BottomTopItems";
import CategoriesLayouts from "@/src/components/layouts/CategoriesLayouts";
import LogoHeader from "@/src/components/layouts/LogoHeader";
import SearchBar from "@/src/components/layouts/SearchBar";
import TopItemLayouts from "@/src/components/layouts/TopItemsLayout";
import { useDevice } from "@/src/hooks/useDevice";
import { useTheme } from "@/src/hooks/useTheme";
import { fetchMenus } from "@/src/services/api";
import useFetch from "@/src/services/useFetch";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const { isTablet } = useDevice();
    const { colors } = useTheme();

    // Uncomment ini nanti kalau API sudah ready
    const {
        data: topItems,
        loading: itemsLoading,
        error: itemsError,
    } = useFetch(() => fetchMenus({ query: "" }));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Header dengan Logo */}
                <LogoHeader />
                {/* Search Bar */}
                <SearchBar />

                {/* Top Items Section */}
                {itemsLoading ? (
                    <View
                        style={{
                            paddingLeft: isTablet ? 32 : 20,
                            marginBottom: isTablet ? 32 : 24,
                        }}
                    >
                        <ActivityIndicator
                            size="large"
                            color={colors.primary}
                            style={{ marginTop: 20 }}
                        />
                    </View>
                ) : itemsError ? (
                    <Text>{itemsError.toString()}</Text>
                ) : (
                    <TopItemLayouts menus={topItems} />
                )}

                {/* Categories Section */}
                <CategoriesLayouts />
                {/* Bottom */}
                <BottomTopItems />
            </ScrollView>
        </SafeAreaView>
    );
}
