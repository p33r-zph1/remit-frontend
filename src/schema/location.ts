import { z } from 'zod';

const coordinatesSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
});

const radiusSchema = z.object({
  value: z.number(),
  unit: z.string(),
});

const locationDetailsSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  areaName: z.string(),
  coordinates: coordinatesSchema,
  radius: radiusSchema,
});

export type LocationDetails = z.infer<typeof locationDetailsSchema>;

export default locationDetailsSchema;
