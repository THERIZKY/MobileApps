import { ThemeColors } from "@/interface/interface";
import { COLORS } from "@/src/constant/colors";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";

interface ThemeContextType {
    isDark: boolean;
    colors: ThemeColors;
    toggleTheme: () => void;
    setTheme: (theme: "light" | "dark" | "system") => void;
}

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined
);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">(
        "system"
    );

    const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
        // Appearance.getColorScheme()
        "dark"
    );

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setSystemColorScheme(colorScheme);
        });

        return () => {
            if (subscription && typeof subscription.remove === "function") {
                subscription.remove();
            }
        };
    }, []);

    const isDark =
        themeMode === "dark" ||
        (themeMode === "system" && systemColorScheme === "dark");
    const colors = isDark ? COLORS.dark : COLORS.light;

    const toggleTheme = () => {
        setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const setTheme = (theme: "light" | "dark" | "system") => {
        setThemeMode(theme);
    };

    return (
        <ThemeContext.Provider
            value={{ isDark, colors, toggleTheme, setTheme }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
