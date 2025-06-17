import { useDevice } from "@/src/hooks/useDevice";
import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { Text, View } from "react-native";

const EmptyCart = () => {
    const { colors } = useTheme();
    const { isTablet } = useDevice();

    return (
        <View
            style={{
                padding: isTablet ? 40 : 20,
            }}
            className="flex-1 justify-center items-center"
        >
            <Text
                style={{
                    fontSize: isTablet ? 48 : 36,
                    marginBottom: 16,
                }}
            >
                🛒
            </Text>

            <Text
                style={{
                    color: colors.text,
                    fontSize: isTablet ? 24 : 20,
                    fontWeight: "bold",
                    marginBottom: 8,
                }}
            >
                Your cart is empty
            </Text>

            <Text
                style={{
                    color: colors.textSecondary,
                    fontSize: isTablet ? 16 : 14,
                    textAlign: "center",
                }}
            >
                Add some delicious items from our menu!
            </Text>
        </View>
    );
};

export default EmptyCart;
