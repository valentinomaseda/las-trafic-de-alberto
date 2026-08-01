'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, type Show } from '@/lib/supabase';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Plus, Pencil, Trash2, X, Upload, Loader2,
  Calendar, MapPin, AlertCircle, CheckCircle2,
  ChevronDown, Check,
} from 'lucide-react';

// ─── Tipos auxiliares ────────────────────────────────────────────────────────

const STATUS_LABELS: Record<Show['status'], string> = {
  available: 'Disponible',
  few_seats: 'Últimos lugares',
  sold_out: 'Agotado',
};

const STATUS_COLORS: Record<Show['status'], string> = {
  available: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  few_seats: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  sold_out:  'bg-red-500/15 text-red-400 border-red-500/30',
};

const STATUS_DOT: Record<Show['status'], string> = {
  available: 'bg-emerald-400',
  few_seats: 'bg-amber-400',
  sold_out:  'bg-red-400',
};

type Toast = { type: 'success' | 'error'; message: string };

const EMPTY_FORM = {
  title:           '',
  venue:           '',
  event_date_date: '',       // YYYY-MM-DD
  event_date_time: '20:00',  // HH:mm (horario típico de show)
  image_url:       '',
  status:          'available' as Show['status'],
};

// ─── Custom Select ───────────────────────────────────────────────────────────

type SelectOption<T extends string = string> = { value: T; label: string };

function CustomSelect<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: SelectOption<T>[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-700/60 border border-white/10 rounded-xl text-white text-sm hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-[#da0200]/50 transition-all"
      >
        <span className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[value as Show['status']] ?? 'bg-slate-400'}`} />
          {selected?.label ?? 'Seleccionar...'}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1.5 w-full bg-slate-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                  value === opt.value
                    ? 'bg-[#da0200]/15 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[opt.value as Show['status']] ?? 'bg-slate-400'}`} />
                  {opt.label}
                </span>
                {value === opt.value && <Check className="w-3.5 h-3.5 text-[#da0200]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function ShowsManager() {
  const [shows, setShows]                       = useState<Show[]>([]);
  const [loading, setLoading]                   = useState(true);
  const [modalOpen, setModalOpen]               = useState(false);
  const [editing, setEditing]                   = useState<Show | null>(null);
  const [form, setForm]                         = useState(EMPTY_FORM);
  const [saving, setSaving]                     = useState(false);
  const [deletingId, setDeletingId]             = useState<string | null>(null);
  const [uploadingImage, setUploadingImage]     = useState(false);
  const [toast, setToast]                       = useState<Toast | null>(null);
  const [confirmDeleteId, setConfirmDeleteId]   = useState<string | null>(null);

  const showToast = (type: Toast['type'], message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchShows = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('shows')
      .select('*')
      .order('event_date', { ascending: true });
    if (!error && data) setShows(data as Show[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchShows(); }, [fetchShows]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (show: Show) => {
    setEditing(show);
    const dt = new Date(show.event_date);
    // Convertir a hora local para los inputs
    const local = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000);
    const dateStr = local.toISOString().slice(0, 10);
    const timeStr = local.toISOString().slice(11, 16);
    setForm({
      title:           show.title,
      venue:           show.venue,
      event_date_date: dateStr,
      event_date_time: timeStr,
      image_url:       show.image_url,
      status:          show.status,
    });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const ext  = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error } = await supabase.storage.from('show-posters').upload(path, file, { upsert: false });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('show-posters').getPublicUrl(data.path);
      setForm((f) => ({ ...f, image_url: publicUrl }));
      showToast('success', 'Imagen subida correctamente');
    } catch {
      showToast('error', 'Error al subir la imagen. Probá con una URL.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const event_date = new Date(`${form.event_date_date}T${form.event_date_time}:00`).toISOString();
      const payload = { title: form.title, venue: form.venue, event_date, image_url: form.image_url, status: form.status };

      let error;
      if (editing) {
        ({ error } = await supabase.from('shows').update(payload).eq('id', editing.id));
      } else {
        ({ error } = await supabase.from('shows').insert([payload]));
      }
      if (error) throw error;

      showToast('success', editing ? 'Show actualizado correctamente' : 'Show creado correctamente');
      closeModal();
      fetchShows();
    } catch {
      showToast('error', 'Ocurrió un error. Revisá los datos e intentá de nuevo.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const { error } = await supabase.from('shows').delete().eq('id', id);
    if (!error) {
      showToast('success', 'Show eliminado');
      setShows((prev) => prev.filter((s) => s.id !== id));
    } else {
      showToast('error', 'Error al eliminar el show');
    }
    setDeletingId(null);
    setConfirmDeleteId(null);
  };

  return (
    <div className="relative">
      {/* ── Toast ─────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
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
          <h2 className="text-xl font-bold text-white">Shows & Recitales</h2>
          <p className="text-slate-400 text-sm mt-0.5">{shows.length} shows cargados</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#da0200] hover:bg-[#b80200] text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-[#da0200]/25"
        >
          <Plus className="w-4 h-4" />
          Nuevo show
        </button>
      </div>

      {/* ── Tabla ─────────────────────────────────── */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#da0200] animate-spin" />
        </div>
      ) : shows.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <div className="text-5xl mb-3">🎸</div>
          <p className="font-medium">No hay shows cargados todavía</p>
          <p className="text-sm mt-1">Hacé clic en &ldquo;Nuevo show&rdquo; para agregar el primero</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/80 text-slate-400 text-left">
                <th className="px-4 py-3.5 font-semibold rounded-tl-2xl">Show</th>
                <th className="px-4 py-3.5 font-semibold">Lugar / Estadio</th>
                <th className="px-4 py-3.5 font-semibold">Fecha</th>
                <th className="px-4 py-3.5 font-semibold">Estado</th>
                <th className="px-4 py-3.5 font-semibold rounded-tr-2xl text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {shows.map((show) => (
                <tr key={show.id} className="bg-slate-800/30 hover:bg-slate-800/60 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      {/* Thumbnail */}
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-700">
                        {show.image_url && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={show.image_url} alt={show.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <span className="font-medium text-white">{show.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {show.venue}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {new Date(show.event_date).toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_COLORS[show.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[show.status]}`} />
                      {STATUS_LABELS[show.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(show)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </button>
                      {confirmDeleteId === show.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(show.id)}
                            disabled={deletingId === show.id}
                            className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                          >
                            {deletingId === show.id ? '...' : 'Confirmar'}
                          </button>
                          <button onClick={() => setConfirmDeleteId(null)} className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold rounded-lg transition-colors">
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmDeleteId(show.id)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Eliminar">
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
            key="modal-overlay"
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
              key="modal-card"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg bg-slate-800 border border-white/10 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="p-6">
                {/* Modal header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">{editing ? 'Editar show' : 'Nuevo show'}</h3>
                  <button onClick={closeModal} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSave} className="space-y-4">
                  {/* Título */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Nombre del show *</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      placeholder="Ej: Rolling Stones en River"
                      required
                      className="w-full px-4 py-3 bg-slate-700/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#da0200]/50 focus:border-[#da0200]/40 transition-all text-sm"
                    />
                  </div>

                  {/* Venue */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Lugar / Estadio *</label>
                    <input
                      type="text"
                      value={form.venue}
                      onChange={(e) => setForm((f) => ({ ...f, venue: e.target.value }))}
                      placeholder="Ej: Estadio River Plate"
                      required
                      className="w-full px-4 py-3 bg-slate-700/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#da0200]/50 focus:border-[#da0200]/40 transition-all text-sm"
                    />
                  </div>

                  {/* Fecha + Hora (2 inputs separados) */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                        <Calendar className="inline w-3.5 h-3.5 mr-1 opacity-60" />
                        Fecha *
                      </label>
                      <input
                        type="date"
                        value={form.event_date_date}
                        onChange={(e) => setForm((f) => ({ ...f, event_date_date: e.target.value }))}
                        required
                        className="w-full px-4 py-3 bg-slate-700/60 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#da0200]/50 focus:border-[#da0200]/40 transition-all text-sm [color-scheme:dark] cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                        Hora *
                      </label>
                      <input
                        type="time"
                        value={form.event_date_time}
                        onChange={(e) => setForm((f) => ({ ...f, event_date_time: e.target.value }))}
                        required
                        className="w-full px-4 py-3 bg-slate-700/60 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#da0200]/50 focus:border-[#da0200]/40 transition-all text-sm [color-scheme:dark] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Estado — custom select */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Estado</label>
                    <CustomSelect<Show['status']>
                      value={form.status}
                      onChange={(v) => setForm((f) => ({ ...f, status: v }))}
                      options={[
                        { value: 'available', label: 'Disponible' },
                        { value: 'few_seats', label: 'Últimos lugares' },
                        { value: 'sold_out',  label: 'Agotado' },
                      ]}
                    />
                  </div>

                  {/* Imagen */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-1.5">Imagen del show *</label>
                    <div className="space-y-2">
                      <input
                        type="url"
                        value={form.image_url}
                        onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                        placeholder="https://... (URL de la imagen)"
                        className="w-full px-4 py-3 bg-slate-700/60 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#da0200]/50 focus:border-[#da0200]/40 transition-all text-sm"
                      />
                      <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs text-slate-500">o subir desde PC</span>
                        <div className="h-px flex-1 bg-white/10" />
                      </div>
                      <label className={`flex items-center justify-center gap-2 w-full py-3 border border-dashed border-white/20 hover:border-[#da0200]/50 rounded-xl text-slate-400 hover:text-slate-300 text-sm cursor-pointer transition-colors ${uploadingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                        {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        {uploadingImage ? 'Subiendo...' : 'Seleccionar imagen'}
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
                      {saving ? 'Guardando...' : (editing ? 'Guardar cambios' : 'Crear show')}
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
