import { MenuItem } from "@/interface/interface";
import { useDevice } from "@/src/hooks/useDevice";
import { useTheme } from "@/src/hooks/useTheme";
import { Image, Text, TouchableOpacity } from "react-native";

const TopItemCard = ({
    item,
    onPress,
}: {
    item: MenuItem;
    onPress: (item: MenuItem) => void;
}) => {
    const { colors } = useTheme();
    const { isTablet } = useDevice();

    const cardWidth = isTablet ? 200 : 150;
    const imageHeight = isTablet ? 120 : 90;

    return (
        <TouchableOpacity
            onPress={() => onPress(item)}
            style={{
                width: cardWidth,
                marginRight: 16,
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
            }}
            activeOpacity={0.8}
        >
            <Image
                source={{ uri: item.image_url }}
                style={{
                    width: "100%",
                    height: imageHeight,
                    borderRadius: 8,
                    marginBottom: 8,
                }}
                resizeMode="cover"
            />
            <Text
                style={{
                    color: colors.text,
                    fontSize: isTablet ? 16 : 14,
                    fontWeight: "bold",
                    marginBottom: 4,
                }}
                numberOfLines={1}
            >
                {item.name}
            </Text>
            <Text
                style={{
                    color: colors.textSecondary,
                    fontSize: isTablet ? 12 : 10,
                    marginBottom: 6,
                }}
                numberOfLines={2}
            >
                {item.description}
            </Text>
            <Text
                style={{
                    color: colors.primary,
                    fontSize: isTablet ? 16 : 14,
                    fontWeight: "bold",
                }}
            >
                ${item.price.toFixed(2)}
            </Text>
        </TouchableOpacity>
    );
};

export default TopItemCard;
