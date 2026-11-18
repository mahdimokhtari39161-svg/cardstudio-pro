import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, FabricText, Rect } from 'fabric';
import { useTranslation } from 'react-i18next';
import './i18n';

type Lang = 'fa' | 'ar' | 'en' | 'tr' | 'ru' | 'fr' | 'de';
const languages: { code: Lang; label: string }[] = [
  { code: 'fa', label: 'فارسی' }, { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'English' }, { code: 'tr', label: 'Türkçe' },
  { code: 'ru', label: 'Русский' }, { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' }
];

export default function App() {
  const { t, i18n } = useTranslation();
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<Canvas | null>(null);
  const [title, setTitle] = useState('یک روز به‌یادماندنی');
  const [subtitle, setSubtitle] = useState('با عشق دعوتید');
  const [bg, setBg] = useState('#f4e7d5');
  const [lang, setLang] = useState<Lang>((localStorage.getItem('cs-lang') as Lang) || 'fa');
  const [saved, setSaved] = useState(false);
  const rtl = lang === 'fa' || lang === 'ar';

  const direction = useMemo(() => rtl ? 'rtl' : 'ltr', [rtl]);

  useEffect(() => {
    const c = new Canvas(canvasEl.current!, { width: 620, height: 440, backgroundColor: bg, preserveObjectStacking: true });
    c.add(new Rect({ left: 28, top: 28, width: 564, height: 384, fill: 'transparent', stroke: '#b58b58', strokeWidth: 2, rx: 18, ry: 18 }));
    c.add(new FabricText(title, { left: 310, top: 160, originX: 'center', fontSize: 38, fontFamily: 'Arial', fill: '#382b25', textAlign: 'center', fontWeight: 'bold' }));
    c.add(new FabricText(subtitle, { left: 310, top: 225, originX: 'center', fontSize: 25, fontFamily: 'Arial', fill: '#765b48', textAlign: 'center' }));
    c.add(new FabricText('✦  CARDSTUDIO  ✦', { left: 310, top: 350, originX: 'center', fontSize: 14, charSpacing: 180, fill: '#a27a4e' }));
    canvasRef.current = c;
    return () => { c.dispose(); canvasRef.current = null; };
  }, []);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.backgroundColor = bg;
    const objects = c.getObjects();
    if (objects[1] instanceof FabricText) objects[1].set('text', title);
    if (objects[2] instanceof FabricText) objects[2].set('text', subtitle);
    c.requestRenderAll();
  }, [title, subtitle, bg]);

  useEffect(() => {
    void i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = direction;
    localStorage.setItem('cs-lang', lang);
  }, [lang, direction, i18n]);

  const exportPng = () => {
    const c = canvasRef.current;
    if (!c) return;
    const link = document.createElement('a');
    link.download = 'cardstudio-design.png';
    link.href = c.toDataURL({ format: 'png', multiplier: 2 });
    link.click();
  };

  const saveDraft = () => {
    const c = canvasRef.current;
    if (!c) return;
    localStorage.setItem('cardstudio-draft', JSON.stringify({ title, subtitle, bg, canvas: c.toJSON() }));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  const addText = () => {
    const c = canvasRef.current;
    if (!c) return;
    const text = new FabricText(t('newText'), { left: 80, top: 80, fontSize: 26, fill: '#273449', fontFamily: 'Arial' });
    c.add(text);
    c.setActiveObject(text);
    c.requestRenderAll();
  };

  return <main className="app-shell">
    <header className="topbar">
      <div className="brand"><div className="brand-mark">✦</div><div><strong>CardStudio</strong><small>{t('tagline')}</small></div></div>
      <div className="top-actions">
        <select aria-label="Language" value={lang} onChange={e => setLang(e.target.value as Lang)}>{languages.map(x => <option key={x.code} value={x.code}>{x.label}</option>)}</select>
        <button className="button button-quiet" onClick={saveDraft}>{saved ? t('saved') : t('save')}</button>
        <button className="button button-primary" onClick={exportPng}>{t('exportPng')}</button>
      </div>
    </header>
    <section className="hero">
      <div><span className="eyebrow">{t('workspace')}</span><h1>{t('headline')}</h1><p>{t('intro')}</p></div>
      <div className="offline-pill"><span /> {t('offlineReady')}</div>
    </section>
    <section className="workspace-grid">
      <aside className="panel controls">
        <div className="panel-heading"><h2>{t('editDesign')}</h2><span className="step">01</span></div>
        <label>{t('mainText')}<input value={title} onChange={e => setTitle(e.target.value)} maxLength={70} /></label>
        <label>{t('supportText')}<input value={subtitle} onChange={e => setSubtitle(e.target.value)} maxLength={90} /></label>
        <label>{t('background')}<div className="color-row"><input type="color" value={bg} onChange={e => setBg(e.target.value)} /><span>{bg.toUpperCase()}</span></div></label>
        <button className="button button-outline full" onClick={addText}>＋ {t('addText')}</button>
        <div className="hint">{t('canvasHint')}</div>
      </aside>
      <section className="panel canvas-panel">
        <div className="canvas-toolbar"><div><span className="live-dot" />{t('livePreview')}</div><span>620 × 440 px</span></div>
        <div className="canvas-wrap"><canvas ref={canvasEl} /></div>
        <div className="canvas-footer"><span>{t('canvasFooter')}</span><span>CardStudio Studio</span></div>
      </section>
    </section>
    <footer><span>© 2026 CardStudio</span><span>{t('footer')}</span></footer>
  </main>;
}