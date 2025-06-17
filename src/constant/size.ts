import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const SCREEN_DIMENSIONS = {
    width,
    height,
};

export const BREAKPOINTS = {
    mobile: 768,
    tablet: 1024,
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const FONT_SIZES = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
};
