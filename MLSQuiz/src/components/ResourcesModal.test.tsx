import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ResourcesModal } from './ResourcesModal';
import { MLS_RESOURCES } from '../data/mlsResourcesData';

describe('ResourcesModal', () => {
  it('renders modal with title, search, categories, and resources when open', () => {
    const html = renderToString(<ResourcesModal isOpen={true} onClose={() => {}} />);

    expect(html).toContain('Vital MLS Resources &amp; Links');
    expect(html).toContain('FBref MLS Statistics');
    expect(html).toContain('MLSPA Salary Guide');
    expect(html).toContain('MLS SuperDraft Hub');
    expect(html).toContain('Search resources by name, topic, or keyword...');
    expect(html).toContain('Stats &amp; Analytics');
    expect(html).toContain('Cap &amp; Rosters');
  });

  it('does not render when isOpen is false', () => {
    const html = renderToString(<ResourcesModal isOpen={false} onClose={() => {}} />);
    expect(html).toBe('');
  });

  it('contains valid outbound links for all resources', () => {
    for (const res of MLS_RESOURCES) {
      expect(res.url.startsWith('https://')).toBe(true);
      expect(res.name.length).toBeGreaterThan(0);
      expect(res.description.length).toBeGreaterThan(0);
    }
  });
});
