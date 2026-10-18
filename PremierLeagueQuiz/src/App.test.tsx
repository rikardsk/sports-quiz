import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { App } from './App';

describe('App Layout Alignment', () => {
  it('renders information panel column alongside the map grid', () => {
    const html = renderToString(<App />);

    expect(html).toContain('lg:col-span-1 flex flex-col');
    expect(html).toContain('lg:col-span-2 flex flex-col gap-4');
  });

  it('renders all Premier League clubs list and items within the information panel', () => {
    const html = renderToString(<App />);

    expect(html).toContain('All Premier League Clubs');
    expect(html).toContain('team-card');
    expect(html).toContain('Arsenal');
    expect(html).toContain('Manchester City');
  });

  it('renders link to current league tables in top navbar', () => {
    const html = renderToString(<App />);

    expect(html).toContain('href="https://www.premierleague.com/tables"');
    expect(html).toContain('Tables');
  });

  it('renders mode switch buttons for Explore and Quiz', () => {
    const html = renderToString(<App />);
    expect(html).toContain('Explore');
    expect(html).toContain('Quiz Mode');
  });
});
