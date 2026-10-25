/**
 * Site-wide on/off switches. The blog came back with the Cube.dev handbook;
 * chat stays off until the owner asks for it.
 */
export const FEATURES = {
  /** /blog pages, the Blog nav link and the "writing" link on the home page. */
  blog: true,
  /** The "Ask Koi AI" chat widget and its /api/chat endpoint. */
  chat: false,
} as const;
