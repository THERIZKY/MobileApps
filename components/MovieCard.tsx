// import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";

const MovieCard = ({ id, image_url, name }: ProductsCardProps) => {
    return (
        <Link href={".."} asChild>
            <TouchableOpacity className="w-full max-w-[150px]">
                <Image
                    source={{
                        uri: image_url,
                    }}
                    className="w-full h-32 rounded-lg mb-2"
                    resizeMode="cover"
                    alt={`${name} poster`}
                />
                <Text
                    numberOfLines={1}
                    className="text-sm font-bold text-white mt-2"
                >
                    {name}
                </Text>
            </TouchableOpacity>
        </Link>
    );
};

export default MovieCard;
