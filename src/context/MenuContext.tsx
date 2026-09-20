"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MENU_ITEMS as STATIC_ITEMS, MENU_CATEGORIES as STATIC_CATEGORIES, MenuItem, MenuCategory } from "@/data/menuData";

interface MenuContextProps {
  items: MenuItem[];
  categories: MenuCategory[];
  isLoading: boolean;
  refreshMenu: () => Promise<void>;
}

const MenuContext = createContext<MenuContextProps>({
  items: STATIC_ITEMS,
  categories: STATIC_CATEGORIES,
  isLoading: false,
  refreshMenu: async () => {},
});

export const useMenuData = () => useContext(MenuContext);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>(STATIC_ITEMS);
  const [categories, setCategories] = useState<MenuCategory[]>(STATIC_CATEGORIES);
  const [isLoading, setIsLoading] = useState(false);

  const refreshMenu = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/menu?t=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.items && Array.isArray(data.items)) {
          // Map DB items to frontend MenuItem interface
          const mappedItems: MenuItem[] = data.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description || undefined,
            category: item.category_id,
            subcategory: item.subcategory || undefined,
            price: item.price,
            prices: item.prices || undefined,
            isVeg: item.is_veg,
            isSpicy: item.is_spicy,
            isBestSeller: item.is_best_seller,
            isGrilled: item.is_grilled,
            tag: item.tag || undefined,
            options: item.options || undefined,
            image: item.image_url || undefined,
            isAvailable: item.is_available,
          }));
          setItems(mappedItems);
        }
        if (data.categories && Array.isArray(data.categories)) {
          const mappedCategories: MenuCategory[] = data.categories.map((cat: any) => ({
            id: cat.id,
            name: cat.name,
            icon: cat.icon,
            badge: cat.badge || undefined,
          }));
          setCategories(mappedCategories);
        }
      }
    } catch (error) {
      console.error("Failed to fetch live menu data:", error);
      // Fail silently and keep static items
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch live prices on mount
  useEffect(() => {
    refreshMenu();
  }, []);

  return (
    <MenuContext.Provider value={{ items, categories, isLoading, refreshMenu }}>
      {children}
    </MenuContext.Provider>
  );
}
