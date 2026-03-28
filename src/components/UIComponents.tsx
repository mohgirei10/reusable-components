import React, { ReactNode } from 'react';
import { useTheme } from '../context/ThemeContext';

export const Button = ({ onClick, children, variant = 'primary', type = 'button' }: any) => {
  const { colors } = useTheme();
  const bg = variant === 'danger' ? '#EF4444' : variant === 'success' ? '#10B981' : colors.accent;
  return (
    <button type={type} onClick={onClick} style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', backgroundColor: bg, color: 'white', cursor: 'pointer', fontWeight: '600' }}>
      {children}
    </button>
  );
};

export const Input = ({ label, value, onChange, placeholder }: any) => {
  const { colors } = useTheme();
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontSize: '14px', color: colors.text, marginBottom: '4px' }}>{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} 
        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: colors.card, color: colors.text }} />
    </div>
  );
};

export const Card = ({ title, children }: { title: string, children: ReactNode }) => {
  const { colors } = useTheme();
  return (
    <div style={{ backgroundColor: colors.card, color: colors.text, padding: '24px', borderRadius: '12px', border: `1px solid ${colors.border}`, marginBottom: '1rem' }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </div>
  );
};

export const DataTable = <T extends { id: number | string }>({ data, columns, onDelete }: any) => {
  const { colors } = useTheme();
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', color: colors.text }}>
      <thead>
        <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
          {columns.map((col: string) => <th key={col} style={{ padding: '12px', textAlign: 'left', textTransform: 'capitalize' }}>{col}</th>)}
          {onDelete && <th style={{ textAlign: 'right' }}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item: T) => (
          <tr key={item.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
            {columns.map((col: keyof T) => <td key={String(col)} style={{ padding: '12px' }}>{String(item[col])}</td>)}
            {onDelete && <td style={{ textAlign: 'right' }}><Button variant="danger" onClick={() => onDelete(item.id)}>Delete</Button></td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};