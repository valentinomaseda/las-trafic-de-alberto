import { Router, Response } from 'express';
import { supabase } from '../supabase';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/shows — público, todos los shows ordenados por fecha
router.get('/', async (_req, res: Response) => {
  const { data, error } = await supabase
    .from('shows')
    .select('*')
    .order('event_date', { ascending: true });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json(data);
});

// POST /api/shows — crear show (requiere auth)
router.post('/', requireAuth, async (req: AuthRequest, res: Response) => {
  const { title, venue, event_date, image_url, status } = req.body;

  if (!title || !venue || !event_date || !image_url) {
    res.status(400).json({ error: 'Campos requeridos: title, venue, event_date, image_url' });
    return;
  }

  const { data, error } = await supabase
    .from('shows')
    .insert([{ title, venue, event_date, image_url, status: status || 'available' }])
    .select()
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(201).json(data);
});

// PUT /api/shows/:id — editar show (requiere auth)
router.put('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, venue, event_date, image_url, status } = req.body;

  const { data, error } = await supabase
    .from('shows')
    .update({ title, venue, event_date, image_url, status })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json(data);
});

// DELETE /api/shows/:id — eliminar show (requiere auth)
router.delete('/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('shows')
    .delete()
    .eq('id', id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(204).send();
});

export default router;
