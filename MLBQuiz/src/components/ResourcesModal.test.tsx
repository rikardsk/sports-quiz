import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { ResourcesModal } from './ResourcesModal';
import { MLB_RESOURCES } from '../data/mlbResourcesData';

describe('ResourcesModal', () => {
  it('renders modal with title, search, categories, and resources when open', () => {
    const html = renderToString(<ResourcesModal isOpen={true} onClose={() => {}} />);

    expect(html).toContain('Vital MLB Resources &amp; Links');
    expect(html).toContain('Baseball-Reference');
    expect(html).toContain('FanGraphs');
    expect(html).toContain('Baseball Savant (Statcast)');
    expect(html).toContain('Spotrac MLB Payrolls');
    expect(html).toContain('Stats &amp; Analytics');
    expect(html).toContain('Contracts &amp; Payroll');
  });

  it('does not render when isOpen is false', () => {
    const html = renderToString(<ResourcesModal isOpen={false} onClose={() => {}} />);
    expect(html).toBe('');
  });

  it('contains valid outbound links for all resources', () => {
    for (const res of MLB_RESOURCES) {
      expect(res.url.startsWith('https://')).toBe(true);
      expect(res.name.length).toBeGreaterThan(0);
      expect(res.description.length).toBeGreaterThan(0);
    }
  });
});
