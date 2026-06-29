'use client';
import { useMemo, useState } from 'react';
import { Activity, ShieldAlert } from 'lucide-react';
import TradingViewWidget from '@/components/TradingViewWidget';

type Signal = 'BUY' | 'SELL' | 'WAIT';
const data = [
  { name: 'NIFTY 50', tv: 'NSE:NIFTY', price: 25280, signal: 'BUY' as Signal, confidence: 82 },
  { name: 'BANKNIFTY', tv: 'NSE:BANKNIFTY', price: 56840, signal: 'WAIT' as Signal, confidence: 58 },
  { name: 'SENSEX', tv: 'BSE:SENSEX', price: 82620, signal: 'SELL' as Signal, confidence: 74 },
  { name: 'FINNIFTY', tv: 'NSE:CNXFINANCE', price: 26790, signal: 'BUY' as Signal, confidence: 78 },
  { name: 'MIDCPNIFTY', tv: 'NSE:MIDCPNIFTY', price: 13240, signal: 'WAIT' as Signal, confidence: 61 }
];

function badgeClass(signal: Signal) {
  if (signal === 'BUY') return 'signal buy';
  if (signal === 'SELL') return 'signal sell';
  return 'signal wait';
}

export default function Home() {
  const [selected, setSelected] = useState(data[0]);
  const levels = useMemo(() => {
    const p = selected.price;
    const buy = selected.signal === 'BUY';
    const sell = selected.signal === 'SELL';
    if (!buy && !sell) return { entry: 'Wait', sl: 'Wait', t1: 'Wait', t2: 'Wait', t3: 'Wait' };
    const dir = buy ? 1 : -1;
    return {
      entry: Math.round(p).toString(),
      sl: Math.round(p - dir * 35).toString(),
      t1: Math.round(p + dir * 45).toString(),
      t2: Math.round(p + dir * 80).toString(),
      t3: Math.round(p + dir * 130).toString()
    };
  }, [selected]);

  return (
    <main className="dashboard">
      <div className="header">
        <div className="brand">
          <h1>MPK Market Insights</h1>
          <p>Hybrid signals: EMA + RSI + MACD + Supertrend + SMC confirmation</p>
        </div>
        <div className="badge"><Activity size={16} /> Market Dashboard</div>
      </div>

      <div className="grid">
        <section className="card">
          <h2>Watchlist</h2>
          <div className="symbol-list">
            {data.map((item) => (
              <button key={item.name} className={`symbol ${selected.name === item.name ? 'active' : ''}`} onClick={() => setSelected(item)}>
                <div><div className="name">{item.name}</div><div className="price">Approx: {item.price}</div></div>
                <div className={badgeClass(item.signal)}>{item.signal} {item.confidence}%</div>
              </button>
            ))}
          </div>
          <p className="footer-note"><ShieldAlert size={14} /> This is signal-only. Place trades manually in Zerodha after your own confirmation.</p>
        </section>

        <section>
          <div className="metrics">
            <div className="metric"><span>Signal</span><strong>{selected.signal}</strong></div>
            <div className="metric"><span>Entry</span><strong>{levels.entry}</strong></div>
            <div className="metric"><span>Stop Loss</span><strong>{levels.sl}</strong></div>
            <div className="metric"><span>Confidence</span><strong>{selected.confidence}%</strong></div>
          </div>
          <div className="metrics">
            <div className="metric"><span>Target 1</span><strong>{levels.t1}</strong></div>
            <div className="metric"><span>Target 2</span><strong>{levels.t2}</strong></div>
            <div className="metric"><span>Target 3</span><strong>{levels.t3}</strong></div>
            <div className="metric"><span>Timeframe</span><strong>5 Min</strong></div>
          </div>
          <div className="card chart"><TradingViewWidget symbol={selected.tv} /></div>
          <div className="rules">
            <div className="rule">✅ EMA trend confirmation</div>
            <div className="rule">✅ RSI momentum filter</div>
            <div className="rule">✅ MACD direction check</div>
            <div className="rule">✅ SMC support/resistance confirmation</div>
          </div>
          <p className="footer-note">Important: This v1 dashboard uses demo signal values plus live TradingView charts. For true live calculated signals, you need a legal market data API or paid data source.</p>
        </section>
      </div>
    </main>
  );
}
