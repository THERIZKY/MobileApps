import { MenuItem } from "@/interface/interface";
import { useCart } from "@/src/hooks/useCart";
import { useDevice } from "@/src/hooks/useDevice";
import { useTheme } from "@/src/hooks/useTheme";
import { push } from "expo-router/build/global-state/routing";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import TopItemCard from "../common/TopItemIcons";

// const mockTopItems: MenuItem[] = [
//     {
//         id: "1",
//         name: "Burger Deluxe",
//         description: "Beef burger with cheese and vegetables",
//         price: 15.99,
//         image_url:
//             "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
//         category: "burgers",
//         available: true,
//     },
//     {
//         id: "2",
//         name: "Chicken Wings",
//         description: "Spicy buffalo chicken wings",
//         price: 12.99,
//         image_url:
//             "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300&h=200&fit=crop",
//         category: "chicken",
//         available: true,
//     },
//     {
//         id: "3",
//         name: "Pizza Margherita",
//         description: "Classic pizza with tomato and mozzarella",
//         price: 18.99,
//         image_url:
//             "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
//         category: "pizza",
//         available: true,
//     },
//     {
//         id: "4",
//         name: "Caesar Salad",
//         description: "Fresh lettuce with caesar dressing",
//         price: 10.99,
//         image_url:
//             "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop",
//         category: "salads",
//         available: true,
//     },
// ];

const TopItemsLayout = ({ menus }: { menus: MenuItem[] }) => {
    const { isTablet, dimensions } = useDevice();
    const { colors } = useTheme();
    const { addItem } = useCart();

    const handleItemPress = (item: MenuItem) => {
        addItem(item);
        // console.log("Added to cart:", item.name);
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
