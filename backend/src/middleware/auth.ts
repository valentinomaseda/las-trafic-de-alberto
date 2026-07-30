import { Request, Response, NextFunction } from 'express';
import { supabase } from '../supabase';

export interface AuthRequest extends Request {
  user?: { id: string; email?: string };
}

/**
 * Middleware que verifica el JWT de Supabase enviado en el header Authorization.
 * El frontend obtiene este token al hacer login con supabase.auth.signInWithPassword().
 */
export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No autorizado: token faltante' });
    return;
  }

  const token = authHeader.split(' ')[1];

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    res.status(401).json({ error: 'No autorizado: token inválido o expirado' });
    return;
  }

  req.user = { id: user.id, email: user.email };
  next();
}
