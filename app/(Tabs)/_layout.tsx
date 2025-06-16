import { Icons } from "@/constant/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const TabsIcons = ({ focused, title, icon }: TabIconType) => {
    if (focused) {
        return (
            <View className="flex flex-row w-full flex-1 min-w-[115px] min-h-16 gap-2 justify-center items-center overflow-hidden bg-black/20">
                {icon}
                <Text
                    style={{
                        color: "#EFE4D2",
                    }}
                >
                    {title}
                </Text>
            </View>
        );
    } else {
        return (
            <View className="w-6 h-6 justify-center items-center">{icon}</View>
        );
    }
};

const TabsLayouts = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 5,
                },

                tabBarStyle: {
                    backgroundColor: "#131D4F",
                    // borderRadius: 50,
                    // marginHorizontal: 10,
                    // marginBottom: 36,
                    height: 58,
                    position: "absolute",
                    overflow: "hidden",
                    // borderWidth: 2,
                    borderColor: "#254D70",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabsIcons
                                icon={<Icons.home color="#EFE4D2" />}
                                title="Home"
                                focused={focused}
                            />
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name="menus"
                options={{
                    headerShown: false,
                    title: "Menus",
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabsIcons
                                icon={<Icons.menus color="#EFE4D2" />}
                                title="Menus"
                                focused={focused}
                            />
                        </>
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    headerShown: false,
                    title: "Cart",
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabsIcons
                                icon={<Icons.cart color="#EFE4D2" />}
                                title="Cart"
                                focused={focused}
                            />
                        </>
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayouts;
