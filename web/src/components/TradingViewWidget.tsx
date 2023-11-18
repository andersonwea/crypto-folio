'use client'

import React, { useEffect, useRef } from 'react'

interface TradingViewWidgetProps {
  marketCurrencySymbol: string
}

let tvScriptLoadingPromise: Promise<Event>

export default function TradingViewWidget({
  marketCurrencySymbol,
}: TradingViewWidgetProps) {
  const onLoadScriptRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    onLoadScriptRef.current = createWidget

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise<Event>((resolve) => {
        const script = document.createElement('script')
        script.id = 'tradingview-widget-loading-script'
        script.src = 'https://s3.tradingview.com/tv.js'
        script.type = 'text/javascript'
        script.onload = resolve

        document.head.appendChild(script)
      })
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current(),
    )

    return () => {
      onLoadScriptRef.current = null
    }

    function createWidget() {
      if (
        document.getElementById('tradingview_37e45') &&
        'TradingView' in window
      ) {
        const tradingView = window.TradingView as any // Use 'any' as a fallback

        if (typeof tradingView.widget === 'function') {
          const config = {
            autosize: true,
            symbol: marketCurrencySymbol + 'USDT',
            interval: 'D',
            timezone: 'Etc/UTC',
            theme: 'light',
            style: '1',
            locale: 'en',
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: 'tradingview_37e45',
          }

          // eslint-disable-next-line no-new, new-cap
          new tradingView.widget(config)
        }
      }
    }
  }, [])

  return (
    <div
      className="tradingview-widget-container"
      style={{ height: '100%', width: '100%' }}
    >
      <div
        id="tradingview_37e45"
        style={{ height: 'calc(100% - 32px)', width: '100%' }}
      />
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  )
}
