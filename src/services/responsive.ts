import { BREAKPOINTS } from "@/src/constant/size";

export const getResponsiveValue = <T>(
    mobileValue: T,
    tabletValue: T,
    screenWidth: number
): T => {
    return screenWidth >= BREAKPOINTS.mobile ? tabletValue : mobileValue;
};

export const isTablet = (width: number): boolean => {
    return width >= BREAKPOINTS.mobile;
};

export const getGridColumns = (screenWidth: number): number => {
    if (screenWidth >= BREAKPOINTS.tablet) return 4;
    if (screenWidth >= BREAKPOINTS.mobile) return 3;
    return 2;
};
