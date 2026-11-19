import { z } from 'zod';

export const contentStatusSchema = z.enum(['confirmed', 'draft', 'placeholder']);
export type ContentStatus = z.infer<typeof contentStatusSchema>;

export const contentFieldSchema = z.object({
  text: z.string(),
  status: contentStatusSchema,
  note: z.string().optional(),
});
export type ContentField = z.infer<typeof contentFieldSchema>;

/**
 * Convenience constructors for typed ContentFields
 */
export function confirmed(text: string, note?: string): ContentField {
  return { text, status: 'confirmed', note };
}

export function draft(text: string, note?: string): ContentField {
  return { text, status: 'draft', note };
}

export function placeholder(text: string, note?: string): ContentField {
  return { text, status: 'placeholder', note };
}

/**
 * Returns true if the field should be visible.
 * In production: only 'confirmed' and 'draft' are visible.
 * In dev: 'placeholder' is only visible if NEXT_PUBLIC_DEBUG_CONTENT=1.
 */
export function isContentRenderable(field?: ContentField | null): boolean {
  if (!field) return false;
  if (field.status === 'confirmed' || field.status === 'draft') {
    return field.text.trim().length > 0;
  }
  return (
    process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_DEBUG_CONTENT === '1'
  );
}

/**
 * Returns the text of a content field if renderable, or null.
 */
export function getContentText(field?: ContentField | null): string | null {
  if (!field) return null;
  if (field.status === 'confirmed' || field.status === 'draft') {
    return field.text;
  }
  return null;
}
