'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase, type Package } from '@/lib/supabase';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Plus, Pencil, Trash2, X, Upload, Loader2,
  AlertCircle, CheckCircle2, ToggleLeft, ToggleRight,
} from 'lucide-react';

// ─── Tipos ────────────────────────────────────────────────────────────────────

const EMPTY_FORM = {
  title:                '',
  subtitle:             '',
  duration_days:        1,
  duration_nights:      0,
  hotel_name:           '',
  excursions_included:  '',
  image_url:            '',
  price_estimation:     '' as number | '',
  tags:                 '',   // CSV string → se convierte a array al guardar
  is_active:            true,
};

type Toast = { type: 'success' | 'error'; message: string };

// ─── Componente principal ─────────────────────────────────────────────────────

export default function PackagesManager() {
  const [packages, setPackages]               = useState<Package[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [modalOpen, setModalOpen]             = useState(false);
  const [editing, setEditing]                 = useState<Package | null>(null);
  const [form, setForm]                       = useState(EMPTY_FORM);
  const [saving, setSaving]                   = useState(false);
  const [deletingId, setDeletingId]           = useState<string | null>(null);
  const [uploadingImage, setUploadingImage]   = useState(false);
  const [toast, setToast]                     = useState<Toast | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const showToast = (type: Toast['type'], message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('created_at', { ascending: true });
    if (!error && data) setPackages(data as Package[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPackages(); }, [fetchPackages]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (pkg: Package) => {
    setEditing(pkg);
    setForm({
      title:               pkg.title,
      subtitle:            pkg.subtitle,
      duration_days:       pkg.duration_days,
      duration_nights:     pkg.duration_nights,
      hotel_name:          pkg.hotel_name || '',
      excursions_included: pkg.excursions_included || '',
      image_url:           pkg.image_url,
      price_estimation:    pkg.price_estimation ?? '',
      tags:                (pkg.tags || []).join(', '),
      is_active:           pkg.is_active,
    });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const ext  = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error } = await supabase.storage.from('package-images').upload(path, file, { upsert: false });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('package-images').getPublicUrl(data.path);
      setForm((f) => ({ ...f, image_url: publicUrl }));
      showToast('success', 'Imagen subida correctamente');
    } catch {
      showToast('error', 'Error al subir la imagen. Probá con una URL.');
    } finally {
      setUploadingImage(false);
    }
  };

  const parseTags = (tagsStr: string): string[] =>
    tagsStr.split(',').map((t) => t.trim()).filter(Boolean);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title:               form.title,
        subtitle:            form.subtitle,
        duration_days:       Number(form.duration_days),
        duration_nights:     Number(form.duration_nights),
        hotel_name:          form.hotel_name || null,
        excursions_included: form.excursions_included || null,
        image_url:           form.image_url,
        price_estimation:    form.price_estimation !== '' ? Number(form.price_estimation) : null,
        tags:                parseTags(form.tags),
        is_active:           form.is_active,
      };
      let error;
      if (editing) {
        ({ error } = await supabase.from('packages').update(payload).eq('id', editing.id));
      } else {
        ({ error } = await supabase.from('packages').insert([payload]));
      }
      if (error) throw error;
      showToast('success', editing ? 'Paquete actualizado' : 'Paquete creado correctamente');
      closeModal();
      fetchPackages();
    } catch {
      showToast('error', 'Ocurrió un error. Revisá los datos e intentá de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const { error } = await supabase.from('packages').delete().eq('id', id);
    if (!error) {
      showToast('success', 'Paquete eliminado');
      setPackages((prev) => prev.filter((p) => p.id !== id));
    } else {
      showToast('error', 'Error al eliminar el paquete');
    }
    setDeletingId(null);
    setConfirmDeleteId(null);
  };

  const toggleActive = async (pkg: Package) => {
    const { error } = await supabase.from('packages').update({ is_active: !pkg.is_active }).eq('id', pkg.id);
    if (!error) {
      setPackages((prev) => prev.map((p) => p.id === pkg.id ? { ...p, is_active: !p.is_active } : p));
      showToast('success', `Paquete ${!pkg.is_active ? 'activado' : 'desactivado'}`);
    }
  };

  return (
    <div className="relative">
      {/* ── Toast ─────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="pkg-toast"
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-medium backdrop-blur-xl ${
              toast.type === 'success'
                ? 'bg-emerald-900/80 border-emerald-500/30 text-emerald-300'
                : 'bg-red-900/80 border-red-500/30 text-red-300'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Paquetes Turísticos</h2>
          <p className="text-slate-400 text-sm mt-0.5">
            {packages.length} paquetes · {packages.filter((p) => p.is_active).length} activos
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#da0200] hover:bg-[#b80200] text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-[#da0200]/25"
        >
          <Plus className="w-4 h-4" />
          Nuevo paquete
        </button>
      </div>

      {/* ── Tabla ─────────────────────────────────── */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#da0200] animate-spin" />
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <div className="text-5xl mb-3">🗺️</div>
          <p className="font-medium">No hay paquetes cargados todavía</p>
          <p className="text-sm mt-1">Hacé clic en &ldquo;Nuevo paquete&rdquo; para agregar el primero</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/80 text-slate-400 text-left">
                <th className="px-4 py-3.5 font-semibold rounded-tl-2xl">Paquete</th>
                <th className="px-4 py-3.5 font-semibold">Duración</th>
                <th className="px-4 py-3.5 font-semibold">Precio est.</th>
                <th className="px-4 py-3.5 font-semibold">Tags</th>
                <th className="px-4 py-3.5 font-semibold">Visible</th>
                <th className="px-4 py-3.5 font-semibold rounded-tr-2xl text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="bg-slate-800/30 hover:bg-slate-800/60 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-700">
                        {pkg.image_url && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={pkg.image_url} alt={pkg.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-white">{pkg.title}</div>
                        <div className="text-slate-500 text-xs">{pkg.subtitle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-300">{pkg.duration_days}d / {pkg.duration_nights}n</td>
                  <td className="px-4 py-3.5 text-slate-300">
                    {pkg.price_estimation ? `$${Number(pkg.price_estimation).toLocaleString('es-AR')}` : '—'}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {(pkg.tags || []).slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded-full text-xs">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => toggleActive(pkg)}
                      className={`transition-colors ${pkg.is_active ? 'text-emerald-400 hover:text-emerald-300' : 'text-slate-600 hover:text-slate-400'}`}
                      title={pkg.is_active ? 'Desactivar' : 'Activar'}
                    >
                      {pkg.is_active ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                    </button>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(pkg)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </button>
                      {confirmDeleteId === pkg.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(pkg.id)}
                            disabled={deletingId === pkg.id}
                            className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                          >
                            {deletingId === pkg.id ? '...' : 'Confirmar'}
                          </button>
                          <button onClick={() => setConfirmDeleteId(null)} className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold rounded-lg transition-colors">
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmDeleteId(pkg.id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Eliminar">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modal ─────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="pkg-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Card */}
            <motion.div
              key="pkg-modal-card"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg bg-slate-800 border border-white/10 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">{editing ? 'Editar paquete' : 'Nuevo paquete'}</h3>
                  <button onClick={closeModal} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                  {/* Título */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Título *</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      placeholder="Ej: Cataratas del Iguazú"
                      required
                      className="w-full px-4 py-3 bg-slate-700/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#da0200]/50 focus:border-[#da0200]/40 transition-all text-sm"
                    />
                  </div>

                  {/* Subtítulo */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Subtítulo *</label>
                    <input
                      type="text"
                      value={form.subtitle}
                      onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
                      placeholder="Ej: Aventura y naturaleza"
                      required
                      className="w-full px-4 py-3 bg-slate-700/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#da0200]/50 focus:border-[#da0200]/40 transition-all text-sm"
                    />
                  </div>

                  {/* Duración */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-1.5">Días</label>
                      <input
                        type="number" min={1}
                        value={form.duration_days}
                        onChange={(e) => setForm((f) => ({ ...f, duration_days: Number(e.target.value) }))}
                        className="w-full px-4 py-3 bg-slate-700/60 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#da0200]/50 focus:border-[#da0200]/40 transition-all text-sm [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-1.5">Noches</label>
                      <input
                        type="number" min={0}
                        value={form.duration_nights}
                        onChange={(e) => setForm((f) => ({ ...f, duration_nights: Number(e.target.value) }))}
                        className="w-full px-4 py-3 bg-slate-700/60 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#da0200]/50 focus:border-[#da0200]/40 transition-all text-sm [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Hotel */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Hotel</label>
                    <input
                      type="text"
                      value={form.hotel_name}
                      onChange={(e) => setForm((f) => ({ ...f, hotel_name: e.target.value }))}
                      placeholder="Ej: Hotel Gran Iguazú 4 Estrellas"
                      className="w-full px-4 py-3 bg-slate-700/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#da0200]/50 focus:border-[#da0200]/40 transition-all text-sm"
                    />
                  </div>

                  {/* Excursiones */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Excursiones incluidas</label>
                    <textarea
                      value={form.excursions_included}
                      onChange={(e) => setForm((f) => ({ ...f, excursions_included: e.target.value }))}
                      placeholder="Ej: Garganta del diablo, Ruinas San Ignacio"
                      rows={2}
                      className="w-full px-4 py-3 bg-slate-700/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#da0200]/50 focus:border-[#da0200]/40 transition-all text-sm resize-none"
                    />
                  </div>

                  {/* Precio */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Precio estimado (ARS)</label>
                    <input
                      type="number" min={0}
                      value={form.price_estimation}
                      onChange={(e) => setForm((f) => ({ ...f, price_estimation: e.target.value === '' ? '' : Number(e.target.value) }))}
                      placeholder="Ej: 150000"
                      className="w-full px-4 py-3 bg-slate-700/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#da0200]/50 focus:border-[#da0200]/40 transition-all text-sm [color-scheme:dark]"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                      Tags <span className="font-normal text-slate-500">(separados por coma)</span>
                    </label>
                    <input
                      type="text"
                      value={form.tags}
                      onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                      placeholder="Ej: Familiar, 7 días, Naturaleza"
                      className="w-full px-4 py-3 bg-slate-700/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#da0200]/50 focus:border-[#da0200]/40 transition-all text-sm"
                    />
                    {/* Preview de tags */}
                    {form.tags && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {parseTags(form.tags).map((tag) => (
                          <span key={tag} className="px-2.5 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Imagen */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Imagen *</label>
                    <div className="space-y-2">
                      <input
                        type="url"
                        value={form.image_url}
                        onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                        placeholder="https://... (URL de la imagen)"
                        className="w-full px-4 py-3 bg-slate-700/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#da0200]/50 focus:border-[#da0200]/40 transition-all text-sm"
                      />
                      <label className={`flex items-center justify-center gap-2 w-full py-3 border border-dashed border-white/20 hover:border-[#da0200]/50 rounded-xl text-slate-400 hover:text-slate-300 text-sm cursor-pointer transition-colors ${uploadingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                        {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        {uploadingImage ? 'Subiendo...' : 'Subir desde PC'}
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleImageUpload(e.target.files[0]); }} />
                      </label>

                      {/* Preview mejorada */}
                      <AnimatePresence>
                        {form.image_url && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="rounded-xl overflow-hidden bg-slate-700 ring-1 ring-white/10">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={form.image_url}
                                alt="Vista previa"
                                className="w-full h-44 object-contain bg-slate-900/50"
                                onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = 'none'; }}
                              />
                              <p className="text-xs text-slate-500 text-center py-1.5">Vista previa</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Toggle visible */}
                  <div className="flex items-center gap-3 py-1">
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, is_active: !f.is_active }))}
                      className={`transition-colors ${form.is_active ? 'text-emerald-400' : 'text-slate-600'}`}
                    >
                      {form.is_active ? <ToggleRight className="w-7 h-7" /> : <ToggleLeft className="w-7 h-7" />}
                    </button>
                    <span className="text-sm font-semibold text-slate-300">
                      {form.is_active ? 'Visible en el sitio' : 'Oculto del sitio'}
                    </span>
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={closeModal} className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-xl transition-colors">
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={saving || uploadingImage}
                      className="flex-1 py-3 bg-[#da0200] hover:bg-[#b80200] text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-[#da0200]/25 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                      {saving ? 'Guardando...' : (editing ? 'Guardar cambios' : 'Crear paquete')}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
