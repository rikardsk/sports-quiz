import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { App } from './App';

describe('App Layout Alignment', () => {
  it('renders information panel column alongside the map grid', () => {
    const html = renderToString(<App />);

    expect(html).toContain('lg:col-span-1 flex flex-col');
    expect(html).toContain('lg:col-span-2 flex flex-col gap-4');
  });

  it('renders all NFL franchises list and items within the information panel', () => {
    const html = renderToString(<App />);

    expect(html).toContain('All NFL Franchises');
    expect(html).toContain('team-card');
    expect(html).toContain('Kansas City Chiefs');
    expect(html).toContain('Philadelphia Eagles');
  });

  it('renders link to current league standings in top navbar', () => {
    const html = renderToString(<App />);

    expect(html).toContain('href="https://www.nfl.com/standings"');
    expect(html).toContain('Standings');
  });
});
