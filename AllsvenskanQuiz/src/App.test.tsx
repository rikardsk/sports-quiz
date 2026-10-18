import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { App } from './App';

describe('App Layout Alignment', () => {
  it('renders information panel column alongside the map grid', () => {
    const html = renderToString(<App />);

    expect(html).toContain('lg:col-span-1 flex flex-col');
    expect(html).toContain('lg:col-span-2 flex flex-col gap-4');
  });

  it('renders Allsvenskan clubs list and items within the information panel', () => {
    const html = renderToString(<App />);

    expect(html).toContain('All Allsvenskan Clubs');
    expect(html).toContain('team-card');
    expect(html).toContain('Malmö FF');
    expect(html).toContain('AIK');
  });

  it('renders buttons linking to current league standings', () => {
    const html = renderToString(<App />);

    expect(html).toContain('href="https://allsvenskan.se/tabell"');
    expect(html).toContain('Tabell');
  });

  it('renders top navigation buttons in the exact MLSQuiz order and without Klubbar button', () => {
    const html = renderToString(<App />);

    // Verify top nav doesn't contain a "Klubbar" button (only "Alla 16 Klubbar" in filter area remains)
    const navMatch = html.match(/<nav[\s\S]*?<\/nav>/);
    expect(navMatch).not.toBeNull();
    const navHtml = navMatch ? navMatch[0] : '';

    expect(navHtml).not.toContain('Klubbar');

    // Verify order of buttons in the navigation bar (Tabell -> Resurser -> Utforska -> Quizläge)
    const tabellIdx = navHtml.indexOf('Tabell');
    const resurserIdx = navHtml.indexOf('Resurser');
    const utforskaIdx = navHtml.indexOf('Utforska');
    const quizlageIdx = navHtml.indexOf('Quizläge');

    expect(tabellIdx).toBeGreaterThan(-1);
    expect(resurserIdx).toBeGreaterThan(tabellIdx);
    expect(utforskaIdx).toBeGreaterThan(resurserIdx);
    expect(quizlageIdx).toBeGreaterThan(utforskaIdx);

    // Verify Utforska has active pill class by default
    expect(navHtml).toContain('nav-pill-btn-active');
  });
});
