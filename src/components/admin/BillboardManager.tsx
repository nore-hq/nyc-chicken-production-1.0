"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, Eye, EyeOff, Sparkles, ExternalLink, Image as ImageIcon, X } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";
import { Billboard } from "@/data/menuData";

interface BillboardManagerProps {
  onPreviewPopup?: (billboard: Billboard) => void;
}

export default function BillboardManager({ onPreviewPopup }: BillboardManagerProps) {
  const [billboards, setBillboards] = useState<Billboard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBillboard, setEditingBillboard] = useState<Partial<Billboard> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchBillboards = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/billboards?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setBillboards(data.billboards || []);
      }
    } catch (err) {
      console.error("Failed to load billboards:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBillboards();
  }, []);

  const openAddModal = () => {
    setEditingBillboard({
      title: "",
      subtitle: "",
      image_url: "",
      link_url: "#menu",
      cta_text: "Claim Offer",
      is_active: true,
      display_order: billboards.length,
    });
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (bb: Billboard) => {
    setEditingBillboard({ ...bb });
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleToggleActive = async (bb: Billboard) => {
    try {
      const nextActive = !bb.is_active;
      // Optimistic update
      setBillboards(prev =>
        prev.map(item => (item.id === bb.id ? { ...item, is_active: nextActive } : item))
      );

      const res = await fetch(`/api/admin/billboards/${bb.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: nextActive }),
      });

      if (!res.ok) {
        fetchBillboards(); // revert on failure
      }
    } catch (err) {
      fetchBillboards();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this billboard banner?")) return;
    try {
      const res = await fetch(`/api/admin/billboards/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBillboards(prev => prev.filter(b => b.id !== id));
      } else {
        alert("Failed to delete billboard.");
      }
    } catch (err) {
      alert("Error deleting billboard.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBillboard?.image_url) {
      setErrorMessage("Please upload an offer banner image first.");
      return;
    }
    if (!editingBillboard?.title?.trim()) {
      setErrorMessage("Please provide a title for the billboard.");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      const isNew = !billboards.some(b => b.id === editingBillboard.id);
      const url = isNew ? "/api/admin/billboards" : `/api/admin/billboards/${editingBillboard.id}`;
      const method = isNew ? "POST" : "PUT";

      const payload = {
        ...editingBillboard,
        id: editingBillboard.id || `bb_${Date.now()}`,
        display_order: Number(editingBillboard.display_order) || 0,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchBillboards();
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Failed to save billboard.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save billboard.");
    } finally {
      setIsSaving(false);
    }
  };

  const activeCount = billboards.filter(b => b.is_active).length;

  return (
    <div className="space-y-6">
      {/* Top Banner Info & Add button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141519] border border-white/5 p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">Billboard & Offer Popups</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#fdb813]/20 text-[#fdb813] font-semibold border border-[#fdb813]/30">
              {activeCount} Active
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Showcase promotional offers, discount banners, and seasonal deals to visitors immediately when they open the website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-[#fdb813] hover:bg-[#e5a00d] text-black font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all shadow-lg shadow-[#fdb813]/20 flex-shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New Billboard
        </button>
      </div>

      {/* Grid of Billboard Cards */}
      {isLoading ? (
        <div className="p-12 text-center text-gray-400">
          <div className="w-8 h-8 border-3 border-[#fdb813] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm">Loading billboard offers...</p>
        </div>
      ) : billboards.length === 0 ? (
        <div className="p-12 text-center bg-[#111111] border border-dashed border-white/10 rounded-2xl">
          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-3 text-[#fdb813]">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No Billboard Banners Yet</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto mb-5">
            Create your first billboard banner to promote special combo offers, weekend discounts, or new menu launches to customers!
          </p>
          <button
            onClick={openAddModal}
            className="bg-[#fdb813] hover:bg-[#e5a00d] text-black font-bold px-5 py-2.5 rounded-xl text-sm inline-flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" /> Create First Billboard
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {billboards.map(bb => (
            <div
              key={bb.id}
              className={`bg-[#111111] rounded-2xl border transition-all overflow-hidden flex flex-col group ${
                bb.is_active ? "border-white/10 hover:border-[#fdb813]/40" : "border-white/5 opacity-60 hover:opacity-100"
              }`}
            >
              {/* Image Preview Area */}
              <div className="relative aspect-video w-full bg-black/60 overflow-hidden flex items-center justify-center">
                {bb.image_url ? (
                  <img
                    src={bb.image_url}
                    alt={bb.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500 gap-2">
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-xs">No image uploaded</span>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-bold backdrop-blur-md border ${
                      bb.is_active
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    }`}
                  >
                    {bb.is_active ? "Active (Live)" : "Inactive (Hidden)"}
                  </span>
                </div>

                {/* Display Order Badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-0.5 rounded-md border border-white/10 font-mono">
                  Order #{bb.display_order ?? 0}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-white line-clamp-1">{bb.title}</h3>
                  {bb.subtitle && (
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{bb.subtitle}</p>
                  )}
                  {bb.cta_text && (
                    <div className="mt-2 text-xs text-[#fdb813] font-semibold flex items-center gap-1">
                      <span>Button: {bb.cta_text}</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  )}
                </div>

                {/* Action Controls */}
                <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleActive(bb)}
                    className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors ${
                      bb.is_active
                        ? "bg-white/5 text-gray-300 hover:bg-white/10"
                        : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    }`}
                  >
                    {bb.is_active ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" /> Deactivate
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" /> Activate
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    {onPreviewPopup && (
                      <button
                        onClick={() => onPreviewPopup(bb)}
                        className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-[#fdb813] transition-colors"
                        title="Preview Ad Popup"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => openEditModal(bb)}
                      className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                      title="Edit Billboard"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(bb.id)}
                      className="p-1.5 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                      title="Delete Billboard"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Billboard Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#111111] border border-white/10 rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-white/5 sticky top-0 bg-[#111111]/90 backdrop-blur-md z-10">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {editingBillboard?.id ? "Edit Billboard Offer" : "Add New Billboard Offer"}
                </h2>
                <p className="text-xs text-gray-400">
                  Upload an attractive banner graphic to show visitors.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {/* Banner Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">
                  Offer Banner Image <span className="text-[#fdb813]">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Upload a high-resolution offer banner (recommended 16:9 or 4:3 graphic or poster).
                </p>
                <div className="flex items-start gap-4">
                  <ImageUploader
                    imageUrl={editingBillboard?.image_url || ""}
                    onImageChange={url =>
                      setEditingBillboard(prev => ({ ...prev, image_url: url }))
                    }
                  />
                  <div className="text-xs text-gray-400 space-y-1.5 pt-1">
                    <p className="font-medium text-gray-300">💡 Image Tips:</p>
                    <p>• Clean graphics with offer details or delicious food shots</p>
                    <p>• Max 10MB JPG, PNG, or WebP</p>
                    <p>• Cloudinary direct upload</p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">
                  Offer Title <span className="text-[#fdb813]">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={editingBillboard?.title || ""}
                  onChange={e =>
                    setEditingBillboard(prev => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g. FLAT 20% OFF ON ORDERS ABOVE ₹499"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#fdb813]"
                />
              </div>

              {/* Subtitle / Promo Code */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">
                  Subtitle / Promo Code / Description
                </label>
                <input
                  type="text"
                  value={editingBillboard?.subtitle || ""}
                  onChange={e =>
                    setEditingBillboard(prev => ({ ...prev, subtitle: e.target.value }))
                  }
                  placeholder="e.g. Valid on all Chicken Buckets & Burgers. Use code NYCWINGS"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#fdb813]"
                />
              </div>

              {/* Action Link & CTA Button Text */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={editingBillboard?.cta_text || ""}
                    onChange={e =>
                      setEditingBillboard(prev => ({ ...prev, cta_text: e.target.value }))
                    }
                    placeholder="Claim Offer / Order Now"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#fdb813]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1">
                    Target Action / Link
                  </label>
                  <input
                    type="text"
                    value={editingBillboard?.link_url || ""}
                    onChange={e =>
                      setEditingBillboard(prev => ({ ...prev, link_url: e.target.value }))
                    }
                    placeholder="#menu"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#fdb813]"
                  />
                </div>
              </div>

              {/* Active Status & Display Order */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <input
                    id="is_active_toggle"
                    type="checkbox"
                    checked={editingBillboard?.is_active ?? true}
                    onChange={e =>
                      setEditingBillboard(prev => ({ ...prev, is_active: e.target.checked }))
                    }
                    className="w-5 h-5 accent-[#fdb813] rounded cursor-pointer"
                  />
                  <label htmlFor="is_active_toggle" className="text-sm font-medium text-white cursor-pointer select-none">
                    Show on Website (Active)
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingBillboard?.display_order ?? 0}
                    onChange={e =>
                      setEditingBillboard(prev => ({
                        ...prev,
                        display_order: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#fdb813]"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400">
                  {errorMessage}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-[#fdb813] hover:bg-[#e5a00d] text-black px-6 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Billboard"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
