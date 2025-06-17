import { CartItem } from "@/interface/interface";
import EmptyCart from "@/src/components/common/EmptyCart";
import { useCart } from "@/src/hooks/useCart";
import { useDevice } from "@/src/hooks/useDevice";
import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CartItemCard = ({
    item,
    onUpdateQuantity,
    onRemove,
}: {
    item: CartItem;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}) => {
    const { colors } = useTheme();
    const { isTablet } = useDevice();

    return (
        <View
            style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: isTablet ? 16 : 12,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
            }}
        >
            <Image
                source={{ uri: item.image_url }}
                style={{
                    width: isTablet ? 80 : 60,
                    height: isTablet ? 80 : 60,
                    borderRadius: 8,
                    marginRight: 12,
                }}
                resizeMode="cover"
            />

            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        color: colors.text,
                        fontSize: isTablet ? 18 : 16,
                        fontWeight: "bold",
                        marginBottom: 4,
                    }}
                >
                    {item.name}
                </Text>

                <Text
                    style={{
                        color: colors.primary,
                        fontSize: isTablet ? 16 : 14,
                        fontWeight: "600",
                        marginBottom: 8,
                    }}
                >
                    ${item.price.toFixed(2)}
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {/* Quantity Controls */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: colors.background,
                            borderRadius: 8,
                            padding: 4,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() =>
                                onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            style={{
                                width: isTablet ? 32 : 28,
                                height: isTablet ? 32 : 28,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: colors.primary,
                                borderRadius: 6,
                            }}
                        >
                            <Text
                                style={{
                                    color: colors.surface,
                                    fontSize: isTablet ? 18 : 16,
                                    fontWeight: "bold",
                                }}
                            >
                                -
                            </Text>
                        </TouchableOpacity>

                        <Text
                            style={{
                                color: colors.text,
                                fontSize: isTablet ? 16 : 14,
                                fontWeight: "bold",
                                marginHorizontal: 16,
                                minWidth: 20,
                                textAlign: "center",
                            }}
                        >
                            {item.quantity}
                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                onUpdateQuantity(item.id, item.quantity + 1)
                            }
                            style={{
                                width: isTablet ? 32 : 28,
                                height: isTablet ? 32 : 28,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: colors.primary,
                                borderRadius: 6,
                            }}
                        >
                            <Text
                                style={{
                                    color: colors.surface,
                                    fontSize: isTablet ? 18 : 16,
                                    fontWeight: "bold",
                                }}
                            >
                                +
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Remove Button */}
                    <TouchableOpacity
                        onPress={() => onRemove(item.id)}
                        style={{
                            padding: 8,
                        }}
                    >
                        <Text
                            style={{
                                color: "#ef4444",
                                fontSize: isTablet ? 16 : 14,
                                fontWeight: "600",
                            }}
                        >
                            Remove
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default function CartScreen() {
    const { colors } = useTheme();
    const { isTablet } = useDevice();
    const { items, total, itemCount, updateQuantity, removeItem, clearCart } =
        useCart();

    const handleCheckout = () => {
        console.log("Checkout pressed");
        // Navigate to checkout/order confirmation
    };

    if (items.length === 0) {
        console.log(colors.background);
        return (
            <SafeAreaView
                style={{ flex: 1, backgroundColor: colors.background }}
            >
                <EmptyCart />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.background,
                paddingBottom: 36,
            }}
        >
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View
                    style={{
                        paddingHorizontal: isTablet ? 32 : 20,
                        paddingVertical: isTablet ? 24 : 16,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: colors.text,
                            fontSize: isTablet ? 28 : 24,
                            fontWeight: "bold",
                        }}
                    >
                        Your Cart ({itemCount})
                    </Text>

                    <TouchableOpacity
                        onPress={clearCart}
                        style={{
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            borderRadius: 6,
                        }}
                    >
                        <Text
                            style={{
                                color: "#ef4444",
                                fontSize: isTablet ? 16 : 14,
                                fontWeight: "600",
                            }}
                        >
                            Clear All
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Cart Items */}
                <FlatList
                    data={items}
                    renderItem={({ item }) => (
                        <CartItemCard
                            item={item}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeItem}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        paddingHorizontal: isTablet ? 32 : 20,
                        paddingBottom: 120,
                    }}
                    showsVerticalScrollIndicator={false}
                />

                {/* Checkout Section */}
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: colors.surface,
                        paddingHorizontal: isTablet ? 32 : 20,
                        paddingVertical: isTablet ? 24 : 16,
                        paddingBottom: isTablet ? 24 : 32,
                        borderTopWidth: 1,
                        borderTopColor: colors.primary + "20",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 16,
                        }}
                    >
                        <Text
                            style={{
                                color: colors.text,
                                fontSize: isTablet ? 20 : 18,
                                fontWeight: "bold",
                            }}
                        >
                            Total:
                        </Text>

                        <Text
                            style={{
                                color: colors.primary,
                                fontSize: isTablet ? 24 : 20,
                                fontWeight: "bold",
                            }}
                        >
                            ${total.toFixed(2)}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={handleCheckout}
                        style={{
                            backgroundColor: colors.primary,
                            paddingVertical: isTablet ? 16 : 14,
                            borderRadius: 12,
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                            elevation: 4,
                        }}
                        activeOpacity={0.8}
                    >
                        <Text
                            style={{
                                color: colors.surface,
                                fontSize: isTablet ? 18 : 16,
                                fontWeight: "bold",
                            }}
                        >
                            Proceed to Checkout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
