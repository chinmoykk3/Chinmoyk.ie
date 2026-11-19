import { z } from 'zod';
import { contentFieldSchema, ContentField, draft, placeholder } from './schema';

export const soundTrackSchema = z.object({
  id: z.string(),
  chapterKey: z.string(),
  title: contentFieldSchema,
  mood: contentFieldSchema,
  frequencyHz: z.number().optional(),
  license: z.string(),
  composer: contentFieldSchema,
  url: z.string().optional(),
});
export type SoundTrack = z.infer<typeof soundTrackSchema>;

const rawSoundManifest: SoundTrack[] = [
  {
    id: 'track-prologue',
    chapterKey: 'prologue',
    title: draft('The Spark (Ambient Drone in A Minor)'),
    mood: draft('Curious, quiet, introspective'),
    frequencyHz: 55, // A1
    license: 'Creative Commons 0',
    composer: placeholder('[TODO: Chinmoy to supply dedicated audio master if desired]'),
  },
  {
    id: 'track-ch01',
    chapterKey: 'ch01',
    title: draft('First Circuits'),
    mood: draft('Rhythmic, delicate clockwork pulses'),
    frequencyHz: 65.4, // C2
    license: 'Creative Commons 0',
    composer: placeholder('[TODO: Chinmoy to supply custom audio file]'),
  },
  {
    id: 'track-ch02',
    chapterKey: 'ch02',
    title: draft('Harmonic Convergence'),
    mood: draft('Warm multi-tone chord evolving in fifths'),
    frequencyHz: 73.4, // D2
    license: 'Creative Commons 0',
    composer: placeholder('[TODO: Chinmoy to supply custom audio file]'),
  },
  {
    id: 'track-ch03',
    chapterKey: 'ch03',
    title: draft('Blueprint Architecture'),
    mood: draft('Structured, low mechanical resonance'),
    frequencyHz: 82.4, // E2
    license: 'Creative Commons 0',
    composer: placeholder('[TODO: Chinmoy to supply custom audio file]'),
  },
  {
    id: 'track-ch04',
    chapterKey: 'ch04',
    title: draft('The Texture of Ink'),
    mood: draft('Soft textured breath, tactile resonance'),
    frequencyHz: 87.3, // F2
    license: 'Creative Commons 0',
    composer: placeholder('[TODO: Chinmoy to supply custom audio file]'),
  },
  {
    id: 'track-ch05',
    chapterKey: 'ch05',
    title: draft('Latent Space Dreams'),
    mood: draft('Glissando vector shimmer, subtle neural swell'),
    frequencyHz: 98.0, // G2
    license: 'Creative Commons 0',
    composer: placeholder('[TODO: Chinmoy to supply custom audio file]'),
  },
  {
    id: 'track-ch06',
    chapterKey: 'ch06',
    title: draft('The Crucible'),
    mood: draft('Heavy analog warmth, subtle vintage flutter'),
    frequencyHz: 110.0, // A2
    license: 'Creative Commons 0',
    composer: placeholder('[TODO: Chinmoy to supply custom audio file]'),
  },
  {
    id: 'track-ch07',
    chapterKey: 'ch07',
    title: draft('Horizons'),
    mood: draft('Expansive, ascending shimmer'),
    frequencyHz: 123.5, // B2
    license: 'Creative Commons 0',
    composer: placeholder('[TODO: Chinmoy to supply custom audio file]'),
  },
  {
    id: 'track-epilogue',
    chapterKey: 'epilogue',
    title: draft('The Unwritten Dawn'),
    mood: draft('Warm morning light chord resolving in C major'),
    frequencyHz: 130.8, // C3
    license: 'Creative Commons 0',
    composer: placeholder('[TODO: Chinmoy to supply custom audio file]'),
  },
];

export const soundManifest: SoundTrack[] = z.array(soundTrackSchema).parse(rawSoundManifest);
