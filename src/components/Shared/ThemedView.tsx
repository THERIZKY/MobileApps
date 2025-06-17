import React from "react";
import { View, ViewProps, useColorScheme } from "react-native";

const ThemedView = (props: ViewProps) => {
    const colorScheme = useColorScheme();

    return (
        <View
            {...props}
            className={`${props.className ?? ""} ${
                colorScheme === "dark" ? "bg-gray-900" : "bg-gray-100"
            }`}
        />
    );
};

export default ThemedView;
