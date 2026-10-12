import React from 'react';

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  hint,
  required = false,
  options = [],
  rows = 3,
  prefix,
  suffix,
  className = '',
  disabled = false
}) {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="form-label" htmlFor={name}>
          <span>
            {label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
          </span>
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {prefix && (
          <span
            style={{
              position: 'absolute',
              left: 12,
              color: 'var(--color-muted)',
              fontSize: '0.875rem',
              fontWeight: 600,
              pointerEvents: 'none'
            }}
          >
            {prefix}
          </span>
        )}

        {type === 'select' ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`form-control ${error ? 'error' : ''}`}
            style={{
              paddingLeft: prefix ? '36px' : undefined,
              paddingRight: suffix ? '36px' : undefined
            }}
          >
            {options.map((opt) => {
              const val = typeof opt === 'object' ? opt.value : opt;
              const lbl = typeof opt === 'object' ? opt.label : opt;
              return (
                <option key={val} value={val}>
                  {lbl}
                </option>
              );
            })}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`form-control ${error ? 'error' : ''}`}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`form-control ${error ? 'error' : ''}`}
            style={{
              paddingLeft: prefix ? '36px' : undefined,
              paddingRight: suffix ? '36px' : undefined
            }}
          />
        )}

        {suffix && (
          <span
            style={{
              position: 'absolute',
              right: 12,
              color: 'var(--color-muted)',
              fontSize: '0.8125rem',
              pointerEvents: 'none'
            }}
          >
            {suffix}
          </span>
        )}
      </div>

      {error && <span className="form-error">{error}</span>}
      {!error && hint && <span className="form-hint">{hint}</span>}
    </div>
  );
}
