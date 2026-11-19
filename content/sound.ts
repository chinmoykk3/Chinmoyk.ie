export interface SoundTrack {
  id: string;
  chapterKey: string;
  title: string;
  mood: string;
  frequencyHz?: number; // Base harmonic frequency for synthetic procedural ambient bed
  license: string;
  composer: string;
  url?: string;
  isPlaceholder: boolean;
}

export const soundManifest: SoundTrack[] = [
  {
    id: 'track-prologue',
    chapterKey: 'prologue',
    title: 'The Spark (Ambient Drone in A Minor)',
    mood: 'Curious, quiet, introspective',
    frequencyHz: 55, // A1
    license: 'Creative Commons 0 (Procedural Synthetic Stub)',
    composer:
      'Synthesized Web Audio Bed [TODO: Chinmoy to supply dedicated audio master if desired]',
    isPlaceholder: true,
  },
  {
    id: 'track-ch01',
    chapterKey: 'ch01',
    title: 'First Circuits',
    mood: 'Rhythmic, delicate clockwork pulses',
    frequencyHz: 65.4, // C2
    license: 'Creative Commons 0 (Procedural Synthetic Stub)',
    composer: 'Synthesized Web Audio Bed [TODO: Chinmoy to supply custom audio file]',
    isPlaceholder: true,
  },
  {
    id: 'track-ch02',
    chapterKey: 'ch02',
    title: 'Harmonic Convergence',
    mood: 'Warm multi-tone chord evolving in fifths',
    frequencyHz: 73.4, // D2
    license: 'Creative Commons 0 (Procedural Synthetic Stub)',
    composer: 'Synthesized Web Audio Bed [TODO: Chinmoy to supply custom audio file]',
    isPlaceholder: true,
  },
  {
    id: 'track-ch03',
    chapterKey: 'ch03',
    title: 'Blueprint Architecture',
    mood: 'Structured, low mechanical resonance',
    frequencyHz: 82.4, // E2
    license: 'Creative Commons 0 (Procedural Synthetic Stub)',
    composer: 'Synthesized Web Audio Bed [TODO: Chinmoy to supply custom audio file]',
    isPlaceholder: true,
  },
  {
    id: 'track-ch04',
    chapterKey: 'ch04',
    title: 'The Texture of Ink',
    mood: 'Soft textured breath, tactile resonance',
    frequencyHz: 87.3, // F2
    license: 'Creative Commons 0 (Procedural Synthetic Stub)',
    composer: 'Synthesized Web Audio Bed [TODO: Chinmoy to supply custom audio file]',
    isPlaceholder: true,
  },
  {
    id: 'track-ch05',
    chapterKey: 'ch05',
    title: 'Latent Space Dreams',
    mood: 'Glissando vector shimmer, subtle neural swell',
    frequencyHz: 98.0, // G2
    license: 'Creative Commons 0 (Procedural Synthetic Stub)',
    composer: 'Synthesized Web Audio Bed [TODO: Chinmoy to supply custom audio file]',
    isPlaceholder: true,
  },
  {
    id: 'track-ch06',
    chapterKey: 'ch06',
    title: 'The Crucible',
    mood: 'Heavy analog warmth, subtle vintage flutter',
    frequencyHz: 110.0, // A2
    license: 'Creative Commons 0 (Procedural Synthetic Stub)',
    composer: 'Synthesized Web Audio Bed [TODO: Chinmoy to supply custom audio file]',
    isPlaceholder: true,
  },
  {
    id: 'track-ch07',
    chapterKey: 'ch07',
    title: 'Horizons',
    mood: 'Expansive, ascending shimmer',
    frequencyHz: 123.5, // B2
    license: 'Creative Commons 0 (Procedural Synthetic Stub)',
    composer: 'Synthesized Web Audio Bed [TODO: Chinmoy to supply custom audio file]',
    isPlaceholder: true,
  },
  {
    id: 'track-epilogue',
    chapterKey: 'epilogue',
    title: 'The Unwritten Dawn',
    mood: 'Warm morning light chord resolving in C major',
    frequencyHz: 130.8, // C3
    license: 'Creative Commons 0 (Procedural Synthetic Stub)',
    composer: 'Synthesized Web Audio Bed [TODO: Chinmoy to supply custom audio file]',
    isPlaceholder: true,
  },
];
