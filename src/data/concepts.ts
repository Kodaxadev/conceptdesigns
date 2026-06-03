export type ConceptStatus = 'Blender study' | 'Web prototype' | 'Candidate';

export type Concept = {
  slug: string;
  title: string;
  status: ConceptStatus;
  summary: string;
  intent: string;
  heroImage: string;
  detailImage: string;
  artifactHref: string;
  tags: string[];
};

export const concepts: Concept[] = [
  {
    slug: 'split-flap',
    title: 'Mechanical Evidence Board',
    status: 'Blender study',
    summary:
      'A graphite split-flap board direction for the Kodaxa portfolio hero system.',
    intent:
      'Use Blender to define the physical language, then translate the best parts into a performant web-native interaction.',
    heroImage: '/assets/concepts/split-flap/frame-104.png',
    detailImage: '/assets/concepts/split-flap/tile-detail-v3.png',
    artifactHref: '/assets/concepts/split-flap/tile-v4.glb',
    tags: ['split-flap', 'portfolio hero', 'Blender', 'web animation'],
  },
];
