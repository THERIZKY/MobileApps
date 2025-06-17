import { useDevice } from "@/src/hooks/useDevice";
import { useTheme } from "@/src/hooks/useTheme";
import React from "react";
import { Text, View } from "react-native";

const LogoHeader = () => {
    const { isTablet, dimensions } = useDevice();
    const { colors } = useTheme();

    return (
        <View
            style={{
                paddingHorizontal: isTablet ? 32 : 20,
                paddingVertical: isTablet ? 24 : 16,
                alignItems: "center",
            }}
        >
            <View
                style={{
                    backgroundColor: colors.primary,
                    width: isTablet ? 80 : 60,
                    height: isTablet ? 80 : 60,
                    borderRadius: isTablet ? 40 : 30,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 12,
                }}
            >
                <Text
                    style={{
                        color: colors.surface,
                        fontSize: isTablet ? 32 : 24,
                        fontWeight: "bold",
                    }}
                >
                    🍽️
                </Text>
            </View>

            <Text
                style={{
                    color: colors.text,
                    fontSize: isTablet ? 28 : 24,
                    fontWeight: "bold",
                    marginBottom: 4,
                }}
            >
                Food Paradise
            </Text>

            <Text
                style={{
                    color: colors.textSecondary,
                    fontSize: isTablet ? 16 : 14,
                    textAlign: "center",
                }}
            >
                Delicious meals just a tap away
            </Text>
        </View>
    );
};

export default LogoHeader;
