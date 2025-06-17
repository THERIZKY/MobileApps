import { Icons } from "@/src/constant/icons";
import { useDevice } from "@/src/hooks/useDevice";
import { useTheme } from "@/src/hooks/useTheme";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import SearchIcon from "../common/SearchIcon";

const SearchBar = () => {
    const { colors } = useTheme();
    const { isTablet, dimensions } = useDevice();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        console.log("Searching for:", searchQuery);
        // Navigate to menu screen with search query
    };

    return (
        <View
            style={{
                paddingHorizontal: isTablet ? 32 : 20,
                marginBottom: isTablet ? 32 : 24,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: colors.surface,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: isTablet ? 14 : 12,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                }}
            >
                <SearchIcon color={colors.textSecondary} />
                <TextInput
                    style={{
                        flex: 1,
                        marginLeft: 12,
                        color: colors.text,
                        fontSize: isTablet ? 16 : 14,
                    }}
                    placeholder="Search delicious food..."
                    placeholderTextColor={colors.textSecondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        onPress={() => setSearchQuery("")}
                        style={{ padding: 4 }}
                    >
                        <Icons.close color={colors.textSecondary} size={16} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default SearchBar;
