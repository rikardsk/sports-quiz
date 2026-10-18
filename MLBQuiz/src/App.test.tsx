import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { App } from './App';

describe('App Layout Alignment', () => {
  it('renders information panel column alongside the map grid', () => {
    const html = renderToString(<App />);

    expect(html).toContain('lg:col-span-1 flex flex-col');
    expect(html).toContain('lg:col-span-2 flex flex-col gap-4');
  });

  it('renders all MLB franchises list and items within the information panel', () => {
    const html = renderToString(<App />);

    expect(html).toContain('All MLB Franchises');
    expect(html).toContain('team-card');
    expect(html).toContain('New York Yankees');
    expect(html).toContain('Los Angeles Dodgers');
  });

  it('renders buttons linking to current league standings', () => {
    const html = renderToString(<App />);

    expect(html).toContain('href="https://www.mlb.com/standings"');
    expect(html).toContain('Standings');
    expect(html).toContain('League Standings');
  });
});
