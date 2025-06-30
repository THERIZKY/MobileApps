import { useDevice } from "@/src/hooks/useDevice";
import { useTheme } from "@/src/hooks/useTheme";
import { push } from "expo-router/build/global-state/routing";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface Category {
    key: string;
    label: string;
    icon: string;
}

const Categories: Category[] = [
    { key: "all", label: "All", icon: "🍽️" },
    { key: "sandwiches", label: "Sandwiches", icon: "🥪" },
    { key: "non-coffee", label: "Non-Coffee", icon: "🍷" },
    { key: "pastries", label: "Pastries", icon: "🥐" },
    { key: "coffee", label: "Coffee", icon: "☕" },
    { key: "desserts", label: "Desserts", icon: "🍰" },
];

const CategoriesLayouts = () => {
    const { colors } = useTheme();
    const { isTablet } = useDevice();

    return (
        <View
            style={{
                paddingLeft: isTablet ? 32 : 20,
                marginBottom: isTablet ? 32 : 24,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: isTablet ? 32 : 20,
                    marginBottom: isTablet ? 20 : 16,
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        fontSize: isTablet ? 22 : 18,
                        fontWeight: "bold",
                    }}
                >
                    Categories
                </Text>
            </View>
            <FlatList
                data={Categories}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => push(`/menus/${item.key}`)}
                        style={{
                            alignItems: "center",
                            marginRight: 20,
                            backgroundColor: colors.surface,
                            borderRadius: 12,
                            width: isTablet ? 120 : 100,
                            paddingVertical: isTablet ? 18 : 12,
                            paddingHorizontal: isTablet ? 20 : 14,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.08,
                            shadowRadius: 3,
                            elevation: 2,
                        }}
                        activeOpacity={0.8}
                    >
                        <Text
                            style={{
                                fontSize: isTablet ? 32 : 24,
                                marginBottom: 4,
                            }}
                        >
                            {item.icon}
                        </Text>
                        <Text
                            style={{
                                color: colors.text,
                                fontSize: isTablet ? 16 : 13,
                                fontWeight: "600",
                            }}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingRight: isTablet ? 32 : 20,
                }}
            />
        </View>
    );
};

export default CategoriesLayouts;
