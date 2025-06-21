import { MenuItem } from "@/interface/interface";
import { useCart } from "@/src/hooks/useCart";
import { useDevice } from "@/src/hooks/useDevice";
import { useTheme } from "@/src/hooks/useTheme";
import { push } from "expo-router/build/global-state/routing";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import TopItemCard from "../common/TopItemIcons";

const TopItemsLayout = ({ menus }: { menus: MenuItem[] }) => {
    const { isTablet, dimensions } = useDevice();
    const { colors } = useTheme();
    const { addItem, updateQuantity } = useCart();

    const handleItemPress = (item: MenuItem, quantity: number) => {
        // Tambahkan item ke cart
        addItem(item);

        // update quantity sesuai pilihan user
        updateQuantity(item.id, quantity);
    };

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
                    Top Items
                </Text>

                <TouchableOpacity
                    onPress={() => push("/menus")}
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 6,
                    }}
                >
                    <Text
                        style={{
                            color: colors.primary,
                            fontSize: isTablet ? 16 : 14,
                            fontWeight: "600",
                        }}
                    >
                        See All
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={menus}
                renderItem={({ item }) => (
                    <TopItemCard item={item} onPress={handleItemPress} />
                )}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingRight: isTablet ? 32 : 20,
                }}
            />
        </View>
    );
};

export default TopItemsLayout;
