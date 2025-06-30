import { useEffect, useState } from "react";

import LogoHeader from "@/src/components/layouts/LogoHeader";
import MenuLayoutsScreen from "@/src/components/layouts/MenuLayouts";
import { useDevice } from "@/src/hooks/useDevice";
import { useTheme } from "@/src/hooks/useTheme";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

const MenuScreen = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { colors } = useTheme();
    const { isTablet } = useDevice();
    const [category, setCategory] = useState<string>("all");

    // Set category berdasarkan URL params
    useEffect(() => {
        const categoryFromParams = Array.isArray(id) ? id[0] : id;
        const newCategory = categoryFromParams || "all";
        setCategory(newCategory);
    }, [id]);

    // Function untuk handle category change
    const handleCategoryChange = (selectedCategory: string) => {
        setCategory(selectedCategory);

        // Update URL tanpa infinite loop
        router.replace({
            pathname: "/menus/[id]",
            params: { id: selectedCategory },
        });
    };

    const renderCategoryItem = ({ item }: { item: Category }) => {
        const isSelected = category === item.key;

        return (
            <TouchableOpacity
                style={{
                    alignItems: "center",
                    marginRight: 20,
                    backgroundColor: isSelected
                        ? colors.primary
                        : colors.surface,
                    borderRadius: 12,
                    width: isTablet ? 140 : 120,
                    paddingVertical: isTablet ? 18 : 12,
                    paddingHorizontal: isTablet ? 20 : 14,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 3,
                    elevation: 2,
                    borderWidth: isSelected ? 2 : 0,
                    borderColor: isSelected ? colors.primary : "transparent",
                }}
                activeOpacity={0.8}
                onPress={() => handleCategoryChange(item.key)}
            >
                <Text
                    style={{
                        fontSize: isTablet ? 24 : 16,
                        marginBottom: 4,
                        color: isSelected ? colors.background : colors.text,
                    }}
                >
                    {item.label}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.background,
                marginBottom: 35,
            }}
        >
            {/* Header dengan Logo */}
            <LogoHeader />

            {/* Categories Horizontal List */}
            <View
                style={{
                    height: isTablet ? 100 : 80,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                }}
            >
                <FlatList
                    data={Categories}
                    keyExtractor={(item) => item.key}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingRight: isTablet ? 32 : 20,
                        alignItems: "center",
                    }}
                    renderItem={renderCategoryItem}
                    extraData={category} // Re-render when category changes
                />
            </View>

            {/* Content Area - Menu Items */}
            <MenuLayoutsScreen category={category} />
        </SafeAreaView>
    );
};

export default MenuScreen;
