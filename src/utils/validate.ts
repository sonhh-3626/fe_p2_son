import { ZodSchema } from 'zod';

export function validateBody<T>(schema: ZodSchema<T>, data: any): T {
  return schema.parse(data);
}
