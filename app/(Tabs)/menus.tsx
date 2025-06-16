import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useMemo } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

const MenusScreen = () => {
    const { width } = useWindowDimensions();
    const numColumns = useMemo(() => (width >= 768 ? 4 : 2), [width]);

    const {
        data: items,
        loading: moviesLoading,
        error: moviesError,
    } = useFetch(() => fetchMovies({ query: "?pageSize=50" }));

    // Render item memoized for performance
    const renderItem = useMemo(
        () =>
            ({ item }: { item: ProductsCardProps }) =>
                <MovieCard {...item} />,
        []
    );

    // Header component memoized
    const ListHeader = useMemo(
        () => (
            <View className="mb-4">
                <Text className="text-2xl text-white font-bold text-center">
                    All Menus
                </Text>
            </View>
        ),
        []
    );

    if (moviesLoading) {
        return (
            <View className="flex-1 bg-gray-900 justify-center">
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    if (moviesError) {
        return (
            <View className="flex-1 bg-gray-900 justify-center items-center">
                <Text className="text-red-500 text-lg">{moviesError}</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-900 pt-5">
            <FlatList
                data={items}
                key={`list-${numColumns}`} // Reset on column change
                numColumns={numColumns}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={ListHeader}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 80 }}
                columnWrapperStyle={
                    numColumns > 1
                        ? {
                              justifyContent: "space-between",
                              paddingHorizontal: 16,
                              gap: 8,
                              marginBottom: 24,
                          }
                        : undefined
                }
                initialNumToRender={8}
                maxToRenderPerBatch={6}
                windowSize={11}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default MenusScreen;
