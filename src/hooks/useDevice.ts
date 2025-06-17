import { DeviceType } from "@/interface/interface";
import { BREAKPOINTS } from "@/src/constant/size";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export const useDevice = () => {
    const [dimensions, setDimensions] = useState(Dimensions.get("window"));

    useEffect(() => {
        // Updated untuk RN 0.79.3
        const subscription = Dimensions.addEventListener(
            "change",
            ({ window }) => {
                setDimensions(window);
            }
        );

        // Return cleanup function langsung
        return () => {
            if (subscription && typeof subscription.remove === "function") {
                subscription.remove();
            }
        };
    }, []);

    const deviceType: DeviceType =
        dimensions.width >= BREAKPOINTS.mobile ? "tablet" : "mobile";

    return {
        deviceType,
        isTablet: deviceType === "tablet",
        isMobile: deviceType === "mobile",
        dimensions,
    };
};
