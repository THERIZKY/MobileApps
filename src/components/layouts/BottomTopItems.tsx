import { useDevice } from "@/src/hooks/useDevice";
import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { Text, View } from "react-native";

const BottomTopItems = () => {
    const { colors } = useTheme();
    const { isTablet } = useDevice();

    return (
        <View
            style={{
                paddingHorizontal: isTablet ? 32 : 20,
                marginBottom: 20,
            }}
        >
            <Text
                style={{
                    color: colors.textSecondary,
                    fontSize: isTablet ? 16 : 14,
                    textAlign: "center",
                    fontStyle: "italic",
                }}
            >
                Swipe through our top picks and tap to add to cart!
            </Text>
        </View>
    );
};

export default BottomTopItems;
