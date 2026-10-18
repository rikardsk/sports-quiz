import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ResourcesModal } from './ResourcesModal';
import { ALLSVENSKAN_RESOURCES } from '../data/allsvenskanResourcesData';

describe('ResourcesModal', () => {
  it('renders modal with title, search, categories, and resources when open', () => {
    const html = renderToString(<ResourcesModal isOpen={true} onClose={() => {}} />);

    expect(html).toContain('Allsvenskan Resurser &amp; Länkar');
    expect(html).toContain('Allsvenskan.se');
    expect(html).toContain('Fotbollskanalen');
    expect(html).toContain('Svenska Fotbollförbundet (SvFF)');
    expect(html).toContain('Officiell');
    expect(html).toContain('Statistik');
  });

  it('does not render when isOpen is false', () => {
    const html = renderToString(<ResourcesModal isOpen={false} onClose={() => {}} />);
    expect(html).toBe('');
  });

  it('contains valid outbound links for all resources', () => {
    for (const res of ALLSVENSKAN_RESOURCES) {
      expect(res.url.startsWith('https://')).toBe(true);
      expect(res.name.length).toBeGreaterThan(0);
      expect(res.description.length).toBeGreaterThan(0);
    }
  });
});
