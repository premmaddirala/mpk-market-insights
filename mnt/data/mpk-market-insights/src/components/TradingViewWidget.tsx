'use client';
import { useEffect, useRef } from 'react';

declare global { interface Window { TradingView?: any } }

export default function TradingViewWidget({ symbol }: { symbol: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: '5',
      timezone: 'Asia/Kolkata',
      theme: 'dark',
      style: '1',
      locale: 'en',
      enable_publishing: false,
      allow_symbol_change: true,
      studies: ['STD;EMA', 'STD;RSI', 'STD;MACD'],
      support_host: 'https://www.tradingview.com'
    });
    ref.current.appendChild(script);
  }, [symbol]);

  return <div className="tradingview-widget-container" ref={ref} style={{ height: '100%', width: '100%' }} />;
}
