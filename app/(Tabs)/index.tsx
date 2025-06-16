import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    FlatList,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

export default function Index() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    // Misal breakpoint sederhana:
    const numColumns = width >= 768 ? 4 : 2; // 768px dianggap tablet

    const {
        data: items,
        loading: moviesLoading,
        error: moviesError,
    } = useFetch(() =>
        fetchMovies({
            query: "",
        })
    );

    return (
        <View className="flex-1  bg-gray-900">
            {moviesLoading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator
                        size={"large"}
                        color={"#ffffff"}
                        className="mt-10 self-center"
                    />
                </View>
            ) : moviesError ? (
                <View className="flex-1 justify-center items-center">
                    <Text className="text-red-500">{moviesError}</Text>
                </View>
            ) : (
                <View className="flex-1 mt-5">
                    <>
                        <FlatList
                            data={items}
                            contentContainerStyle={{
                                width: "100%",
                            }}
                            columnWrapperStyle={{
                                justifyContent: "center",
                                gap: 40,
                                paddingTop: 10,
                                paddingRight: 5,
                                paddingBottom: 10,
                            }}
                            className="mt-2 pb-32"
                            numColumns={numColumns}
                            keyExtractor={(item) => item.id.toString()}
                            ListHeaderComponent={() => (
                                <View className="flex-row items-center justify-center mb-2">
                                    <Text className="text-2xl text-white font-bold">
                                        Top Items
                                    </Text>
                                </View>
                            )}
                            renderItem={({
                                item,
                            }: {
                                item: ProductsCardProps;
                            }) => <MovieCard {...item} />}
                        />
                    </>
                </View>
            )}
        </View>
    );
}
