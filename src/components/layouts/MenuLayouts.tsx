import { MenuItem } from "@/interface/interface";
import TopItemCard from "@/src/components/common/TopItemIcons";
import { useCart } from "@/src/hooks/useCart";
import { useDevice } from "@/src/hooks/useDevice";
import { useTheme } from "@/src/hooks/useTheme";
import { fetchMenus } from "@/src/services/api";
import useFetch from "@/src/services/useFetch";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MenuLayoutsScreen({ category }: { category?: string }) {
    const { colors } = useTheme();
    const { isTablet } = useDevice();
    const { addItem, updateQuantity } = useCart();
    const [cardData, setCardData] = React.useState<MenuItem[]>([]);

    const handleItemPress = (item: MenuItem, quantity: number) => {
        // Tambahkan item ke cart
        addItem(item);

        // update quantity sesuai pilihan user
        updateQuantity(item.id, quantity);
    };

    const {
        data: topItems,
        loading: itemsLoading,
        error: itemsError,
    } = useFetch(() => fetchMenus({ query: "?pageSize=50" }));

    console.log("Category:", topItems);

    useEffect(() => {
        // Jika category tidak ada, set ke "all"
        if (!category) {
            category = "all";
        }

        // Filter topItems berdasarkan category
        if (topItems && category !== "all") {
            setCardData(
                topItems.filter(
                    (item: MenuItem) => item.category.toLowerCase() === category
                )
            );
        } else {
            setCardData(topItems || []);
        }
    }, [category]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
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
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: isTablet ? 40 : 20,
                    }}
                >
                    <FlatList
                        data={cardData}
                        numColumns={isTablet ? 3 : 2}
                        keyExtractor={(item) => item.id.toString()}
                        style={{ flex: 1, width: "100%" }}
                        contentContainerStyle={{
                            alignItems: "center",
                            paddingBottom: isTablet ? 40 : 20,
                            gap: isTablet ? 30 : 25,
                        }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TopItemCard
                                item={item}
                                onPress={handleItemPress}
                            />
                        )}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}
