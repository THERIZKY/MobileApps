import { Icons } from "@/src/constant/icons";
import React from "react";
import { View } from "react-native";

const SearchIcon = ({ color }: { color: string }) => (
    <View
        style={{
            width: 20,
            height: 20,
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <Icons.search color={color} size={16} />
    </View>
);

export default SearchIcon;
