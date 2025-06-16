interface TabIconType {
    focused: boolean;
    title: string;
    icon: React.ReactNode;
}

interface ProductsCardProps {
    id: string;
    name: string;
    image_url: string;
    description: string;
    price: number;
    category: string;
    is_available: boolean;
    created_at: string;
}
