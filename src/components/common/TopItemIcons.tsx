import { MenuItem } from "@/interface/interface";
import { useDevice } from "@/src/hooks/useDevice";
import { useTheme } from "@/src/hooks/useTheme";
import { useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const TopItemCard = ({
    item,
    onPress,
}: {
    item: MenuItem;
    onPress: (item: MenuItem, quantity: number) => void;
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const { colors } = useTheme();
    const { isTablet } = useDevice();

    const cardWidth = isTablet ? 200 : 150;
    const imageHeight = isTablet ? 120 : 90;

    return (
        <>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
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

            {/* MODAL */}
            <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.4)",
                        padding: 20,
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            maxWidth: 400,
                            backgroundColor: colors.surface,
                            borderRadius: 16,
                            padding: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                marginBottom: 12,
                                color: colors.text,
                            }}
                        >
                            {item.name}
                        </Text>

                        <Image
                            source={{ uri: item.image_url }}
                            style={{
                                width: "100%",
                                height: 200,
                                borderRadius: 8,
                            }}
                            resizeMode="cover"
                        />

                        <Text
                            style={{
                                fontSize: 14,
                                marginTop: 12,
                                color: colors.textSecondary,
                            }}
                        >
                            {item.description}
                        </Text>

                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                marginTop: 12,
                                color: colors.primary,
                            }}
                        >
                            ${item.price.toFixed(2)}
                        </Text>

                        {/* Quantity Selector */}
                        <View
                            style={{
                                width: "100%",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 12,
                                backgroundColor: colors.surface,
                                justifyContent: "space-between",
                                // padding: 6,
                                marginTop: 16,
                                marginBottom: 6,
                                borderRadius: 8,
                            }}
                        >
                            <Pressable
                                onPress={() => {
                                    if (quantity > 1) {
                                        setQuantity(quantity - 1);
                                    }
                                }}
                                style={{
                                    backgroundColor: colors.primary,
                                    borderRadius: 6,
                                    paddingHorizontal: 12,
                                    paddingVertical: 4,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontWeight: "bold",
                                    }}
                                >
                                    –
                                </Text>
                            </Pressable>

                            <Text
                                style={{
                                    marginHorizontal: 12,
                                    color: colors.text,
                                    fontSize: 16,
                                }}
                            >
                                {quantity}
                            </Text>

                            <Pressable
                                onPress={() => setQuantity(quantity + 1)}
                                style={{
                                    backgroundColor: colors.primary,
                                    borderRadius: 6,
                                    paddingHorizontal: 12,
                                    paddingVertical: 4,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontWeight: "bold",
                                    }}
                                >
                                    +
                                </Text>
                            </Pressable>
                        </View>

                        {/* ACTION BUTTONS */}
                        <Pressable
                            onPress={() => {
                                onPress(item, quantity);
                                setModalVisible(false);
                                setQuantity(1);
                            }}
                            style={{
                                marginTop: 12,
                                backgroundColor: colors.primary,
                                borderRadius: 8,
                                paddingVertical: 12,
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                Add To Cart
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => {
                                setModalVisible(false);
                                setQuantity(1);
                            }}
                            style={{
                                marginTop: 8,
                                backgroundColor: "#cccccc",
                                borderRadius: 8,
                                paddingVertical: 12,
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "#333", fontWeight: "bold" }}>
                                Tutup
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default TopItemCard;
