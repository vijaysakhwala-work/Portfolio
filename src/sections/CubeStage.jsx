import React, { useEffect, useRef, useState } from 'react';
import { startStage } from '../lib/stage-engine';
import { RAAS } from '../lib/site';

export default function CubeStage() {
  const stage = useRef(null), pin = useRef(null), canvas = useRef(null), goal = useRef(null), impact = useRef(null);
  const m = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const engine = useRef(null);
  const [active, setActive] = useState(-1);
  useEffect(() => {
    engine.current = startStage({ stage: stage.current, pin: pin.current, canvas: canvas.current, tags: { goal: goal.current, m: m.map(r => r.current), impact: impact.current }, onActive: setActive });
    return () => { const e = engine.current; if (e && e.destroy) e.destroy(); };
  }, []);
  return (
    <section className="stage" id="stage" ref={stage} aria-label="Cubusify and how we work">
      <div className="pin" id="pin" ref={pin}>
        <canvas id="cubes" ref={canvas} aria-hidden="true" />
        <span className="tag" ref={goal}>The goal</span>
        {[1, 2, 3, 4].map((n, i) => <span className="tag" key={n} ref={m[i]}>Milestone {n}</span>)}
        <span className="tag" ref={impact}>What changed</span>
        <div className="copy"><div className="copy-grid">
          <div className={'grp' + (active === 0 ? ' is-on' : '')} id="grp-a">
            <h1 id="hero-h"><span className="rev"><span>We build the software your business runs on.</span></span></h1>
            <p className="lede fx">Cubusify brings design, software development and AI automation together, from the first sketch to the system your team uses every day.</p>
            <div className="actions fx late"><a className="btn" href="/contact">Get a quote</a><a className="btn ghost" href="/demo-studio">Try the demos</a></div>
          </div>
          <div className={'grp' + (active > 0 ? ' is-on' : '')} id="grp-b">
            <h2 id="raas-h"><span className="rev"><span>Start with the result. Then build what gets you there.</span></span></h2>
            <p className="lede fx" style={{ marginTop: '1rem' }}>That is how we work, and we call it Results as a Service.</p>
            <ol className="steps fx late">
              {RAAS.map(([t, d], i) => (
                <li key={t} className={'step' + (active === i + 1 ? ' is-on' : '')}>
                  <button type="button" onClick={() => engine.current && engine.current.jump && engine.current.jump(i + 1)}><span className="n">{i + 1}</span><span className="t">{t}</span></button>
                  <div className="d"><p>{d}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div></div>
      </div>
    </section>
  );
}
