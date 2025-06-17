import React from "react";
import { Text, TextProps, useColorScheme } from "react-native";

const ThemedText = (props: TextProps) => {
    const colorScheme = useColorScheme();

    return (
        <Text
            {...props}
            className={`${props.className ?? ""} ${
                colorScheme === "dark" ? "text-white" : "text-gray-900"
            }`}
        />
    );
};

export default ThemedText;
