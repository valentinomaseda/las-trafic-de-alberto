import { Router, Response } from 'express';
import { supabase } from '../supabase';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/packages — público, solo paquetes activos
router.get('/', async (_req, res: Response) => {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json(data);
});

// GET /api/packages/all — admin, todos los paquetes (activos e inactivos)
router.get('/all', requireAuth, async (_req: AuthRequest, res: Response) => {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json(data);
});

// POST /api/packages — crear paquete (requiere auth)
router.post('/', requireAuth, async (req: AuthRequest, res: Response) => {
  const {
    title, subtitle, duration_days, duration_nights,
    hotel_name, excursions_included, image_url,
    price_estimation, tags, is_active,
  } = req.body;

  if (!title || !subtitle || !image_url) {
    res.status(400).json({ error: 'Campos requeridos: title, subtitle, image_url' });
    return;
  }

  const { data, error } = await supabase
    .from('packages')
    .insert([{
      title, subtitle, duration_days, duration_nights,
      hotel_name, excursions_included, image_url,
      price_estimation, tags, is_active: is_active ?? true,
    }])
    .select()
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(201).json(data);
});

// PUT /api/packages/:id — editar paquete (requiere auth)
router.put('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const {
    title, subtitle, duration_days, duration_nights,
    hotel_name, excursions_included, image_url,
    price_estimation, tags, is_active,
  } = req.body;

  const { data, error } = await supabase
    .from('packages')
    .update({
      title, subtitle, duration_days, duration_nights,
      hotel_name, excursions_included, image_url,
      price_estimation, tags, is_active,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json(data);
});

// DELETE /api/packages/:id — eliminar paquete (requiere auth)
router.delete('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('packages')
    .delete()
    .eq('id', id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(204).send();
});

export default router;
