interface TabIconType {
    focused: boolean;
    title: string;
    icon: React.ReactNode;
}

export interface MenuItem {
    id: string;
    name: string;
    description?: string;
    price: number;
    image_url: string;
    category: string;
    is_available: boolean;
    created_at: string;
}

export interface CartItem extends MenuItem {
    quantity: number;
}

export interface ThemeColors {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
}

export interface Theme {
    dark: ThemeColors;
    light: ThemeColors;
}

export type DeviceType = "mobile" | "tablet";
