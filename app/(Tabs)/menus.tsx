import { MenuItem } from "@/interface/interface";
import TopItemCard from "@/src/components/common/TopItemIcons";
import { useCart } from "@/src/hooks/useCart";
import { useDevice } from "@/src/hooks/useDevice";
import { useTheme } from "@/src/hooks/useTheme";
import { fetchMenus } from "@/src/services/api";
import useFetch from "@/src/services/useFetch";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MenuScreen({ menus }: { menus: MenuItem[] }) {
    const { colors } = useTheme();
    const { isTablet } = useDevice();
    const { addItem } = useCart();

    const handleItemPress = (item: MenuItem) => {
        addItem(item);
        // console.log("Added to cart:", item.name);
    };

    const {
        data: topItems,
        loading: itemsLoading,
        error: itemsError,
    } = useFetch(() => fetchMenus({ query: "?pageSize=50" }));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: isTablet ? 40 : 20,
                }}
            >
                <FlatList
                    data={topItems}
                    numColumns={isTablet ? 3 : 2}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{
                        paddingBottom: isTablet ? 40 : 20,
                        gap: isTablet ? 25 : 20,
                    }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <View style={{ marginBottom: 20 }}>
                            {/* You can add a header component here if needed */}
                            <Text className="text-center text-3xl font-bold text-white">
                                All Menus
                            </Text>
                        </View>
                    )}
                    renderItem={({ item }) => (
                        <TopItemCard item={item} onPress={handleItemPress} />
                    )}
                />
            </View>
        </SafeAreaView>
    );
}
