"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus, Search, Edit3, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useMenuData } from "@/context/MenuContext";
import { MenuItem } from "@/data/menuData";

export default function AdminDashboard() {
  const router = useRouter();
  const { items, categories, isLoading, refreshMenu } = useMenuData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; username: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Checking auth on mount
  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then(data => {
        setUser(data.user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`/api/admin/menu/${id}`, { method: "DELETE" });
      if (res.ok) {
        refreshMenu();
      } else {
        alert("Failed to delete item.");
      }
    } catch (e) {
      alert("Error deleting item.");
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const isNew = !items.find(i => i.id === editingItem?.id);
      const url = isNew ? "/api/admin/menu" : `/api/admin/menu/${editingItem?.id}`;
      const method = isNew ? "POST" : "PUT";
      
      const payload = {
        ...editingItem,
        id: editingItem?.id || `item_${Date.now()}`,
        category_id: editingItem?.category,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        refreshMenu();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save item.");
      }
    } catch (e) {
      alert("Error saving item.");
    } finally {
      setIsSaving(false);
    }
  };

  const openAddModal = () => {
    setEditingItem({ category: categories[0]?.id, price: 0 });
    setIsModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0c0e] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#fdb813] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const filteredItems = items.filter(item => {
    if (activeCategory !== "all" && item.category !== activeCategory) return false;
    if (searchTerm) {
      return item.name?.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-white">
      {/* Top Navbar */}
      <header className="bg-[#111111] border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/nyc_logo_latest.png" alt="NYC" width={40} height={40} className="object-contain" />
            <h1 className="font-bold text-lg hidden sm:block">NYC Chicken Manager</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-sm text-gray-400 hover:text-[#fdb813]">View Live Site ↗</a>
            <div className="w-px h-6 bg-white/10" />
            <span className="text-sm text-gray-400">Hey, {user?.name || user?.username}</span>
            <button onClick={handleLogout} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-red-400">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#111111] border border-white/5 p-4 rounded-2xl">
            <p className="text-gray-500 text-sm mb-1">Total Items</p>
            <p className="text-3xl font-bold">{items.length}</p>
          </div>
          <div className="bg-[#111111] border border-white/5 p-4 rounded-2xl">
            <p className="text-gray-500 text-sm mb-1">Categories</p>
            <p className="text-3xl font-bold text-[#fdb813]">{categories.length}</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
          <div className="flex gap-2 bg-[#111111] p-1 rounded-xl border border-white/5 overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${activeCategory === "all" ? "bg-[#fdb813] text-black font-bold" : "text-gray-400 hover:text-white"}`}
            >
              All Items
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${activeCategory === cat.id ? "bg-[#fdb813] text-black font-bold" : "text-gray-400 hover:text-white"}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-[#111111] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#fdb813]/50"
              />
            </div>
            <button onClick={openAddModal} className="bg-[#fdb813] text-black px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#e5a00d] transition-colors whitespace-nowrap">
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>
        </div>

        {/* Table / List */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-gray-500">
                  <th className="p-4 font-medium">Item Name</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium w-32">Price (₹)</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4">
                      <div className="font-medium text-white">{item.name}</div>
                      {item.description && <div className="text-xs text-gray-500 mt-1 line-clamp-1">{item.description}</div>}
                    </td>
                    <td className="p-4 text-sm text-gray-400">
                      {categories.find(c => c.id === item.category)?.name || item.category}
                    </td>
                    <td className="p-4 text-white font-medium">
                      ₹{item.price}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEditModal(item)} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white" title="Edit Item">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-500" title="Delete Item">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      No items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#111111] border border-white/10 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#111111]/80 backdrop-blur-md z-10">
              <h2 className="text-xl font-bold">{editingItem?.name ? "Edit Item" : "Add New Item"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveItem} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Item Name</label>
                <input 
                  required
                  type="text" 
                  value={editingItem?.name || ""} 
                  onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#fdb813]"
                  placeholder="e.g. Classic Chicken Burger"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                  <select 
                    required
                    value={editingItem?.category || ""} 
                    onChange={e => setEditingItem({...editingItem, category: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#fdb813]"
                  >
                    <option value="" disabled>Select category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Price (₹)</label>
                  <input 
                    required
                    type="number" 
                    min="0"
                    step="0.01"
                    value={editingItem?.price ?? ""} 
                    onChange={e => setEditingItem({...editingItem, price: e.target.value === "" ? ("" as unknown as number) : parseFloat(e.target.value)})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#fdb813]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description (Optional)</label>
                <textarea 
                  value={editingItem?.description || ""} 
                  onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#fdb813] min-h-[80px]"
                  placeholder="Enter item description..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="bg-[#fdb813] text-black px-6 py-2 rounded-xl text-sm font-bold hover:bg-[#e5a00d] transition-colors disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
