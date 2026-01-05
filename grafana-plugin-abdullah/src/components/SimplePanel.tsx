import React, { useMemo, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from '../types';

type Props = PanelProps<SimpleOptions>;

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const [expanded, setExpanded] = useState(false);
  const isMobile = width < 520;

  // ---- Data calculations ----
  const { pointsCount, last, min, max, trendUp } = useMemo(() => {
    const series = data.series?.[0];
    const field = series?.fields?.find((f) => f.type === 'number');
    const values = field?.values?.toArray?.() ?? [];
    const nums = values.filter((v) => typeof v === 'number') as number[];

    const pointsCount = nums.length;
    const last = nums.length ? nums[nums.length - 1] : undefined;
    const min = nums.length ? Math.min(...nums) : undefined;
    const max = nums.length ? Math.max(...nums) : undefined;

    // basit trend: son 5 ortalaması > ilk 5 ortalaması
    const slice = (arr: number[], n: number) => arr.slice(0, Math.min(n, arr.length));
    const head = slice(nums, 5);
    const tail = nums.slice(Math.max(nums.length - 5, 0));
    const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
    const trendUp = nums.length >= 10 ? avg(tail) > avg(head) : undefined;

    return { pointsCount, last, min, max, trendUp };
  }, [data]);

  const bg = options?.backgroundColor ?? '#f5f5f5';
  const accent = options?.accentColor ?? '#4c9aff';
  const customText = options?.customText ?? 'Abdullah Panel';
  const showStats = options?.showStats ?? true;

  // ---- Styles ----
  const cardStyle: React.CSSProperties = {
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: 10,
    padding: 14,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease',
  };

  const statGridCols = isMobile ? '1fr' : '1fr 1fr 1fr';

  const containerStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 16,
    background: bg,
    borderRadius: 12,
  };

  return (
    <div style={containerStyle}>
      {/* ✅ İSİM TEK YER: Burada kalsın */}
      <div style={{ textAlign: 'center', fontWeight: 700, marginBottom: 10, opacity: 0.85 }}>
        Developed by Abdullah Coşkuner
      </div>

      {/* İçerik */}
      <div style={{ flex: '1 1 auto' }}>
        {pointsCount === 0 ? (
          <div style={{ textAlign: 'center', opacity: 0.7, marginTop: 30 }}>
            No data found. Please run a query.
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginTop: 6 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>
                Data Points: {pointsCount}
              </div>

              <div style={{ marginTop: 10, opacity: 0.8 }}>
                Panel loaded successfully with data
              </div>

              {trendUp === true && (
                <div style={{ marginTop: 14, color: accent, fontWeight: 800 }}>
                  📈 Upward trend detected
                </div>
              )}
              {trendUp === false && (
                <div style={{ marginTop: 14, color: '#f59f00', fontWeight: 800 }}>
                  📉 Downward/flat trend detected
                </div>
              )}
            </div>

            {showStats && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: statGridCols,
                  gap: 12,
                  justifyContent: 'center',
                  marginTop: 18,
                  maxWidth: 520,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                {[
                  { label: 'Last', value: last },
                  { label: 'Min', value: min },
                  { label: 'Max', value: max },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      ...cardStyle,
                      borderColor: expanded ? accent : 'rgba(0,0,0,0.08)',
                      boxShadow: expanded ? '0 10px 28px rgba(0,0,0,0.10)' : 'none',
                      transform: expanded ? 'translateY(-1px)' : 'none',
                    }}
                    onClick={() => setExpanded((v) => !v)}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 28px rgba(0,0,0,0.10)';
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)';
                      (e.currentTarget as HTMLDivElement).style.borderColor = accent;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = expanded ? '0 10px 28px rgba(0,0,0,0.10)' : 'none';
                      (e.currentTarget as HTMLDivElement).style.transform = expanded ? 'translateY(-1px)' : 'none';
                      (e.currentTarget as HTMLDivElement).style.borderColor = expanded ? accent : 'rgba(0,0,0,0.08)';
                    }}
                    title="Click to toggle highlight"
                  >
                    <div style={{ fontSize: 12, opacity: 0.65 }}>{s.label}</div>
                    <div style={{ marginTop: 6, fontSize: 22, fontWeight: 800, color: accent }}>
                      {typeof s.value === 'number' ? s.value.toFixed(2) : '-'}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {expanded && (
              <div style={{ textAlign: 'center', marginTop: 14, opacity: 0.75 }}>
                {customText} • details expanded
              </div>
            )}
          </>
        )}
      </div>

      {/* ✅ Footer: sadece 1 satır, isim tekrar yok */}
      <div style={{ marginTop: 'auto', textAlign: 'center', paddingTop: 14, opacity: 0.75 }}>
        Grafana Panel Plugin v1.0
      </div>
    </div>
  );
};
