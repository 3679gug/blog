'use client'

import { useState } from 'react'

interface EditorProps {
    value: string
    onChange: (value: string) => void
}

export default function Editor({ value, onChange }: EditorProps) {
    const [preview, setPreview] = useState(false)

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', minHeight: '400px' }}>
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <button
                    onClick={() => setPreview(false)}
                    style={{
                        padding: '0.5rem 1rem',
                        fontWeight: 600,
                        color: !preview ? 'var(--primary)' : 'var(--muted)',
                        borderBottom: !preview ? '2px solid var(--primary)' : 'none'
                    }}
                >
                    작성하기
                </button>
                <button
                    onClick={() => setPreview(true)}
                    style={{
                        padding: '0.5rem 1rem',
                        fontWeight: 600,
                        color: preview ? 'var(--primary)' : 'var(--muted)',
                        borderBottom: preview ? '2px solid var(--primary)' : 'none'
                    }}
                >
                    미리보기
                </button>
            </div>

            <div style={{ flex: 1, position: 'relative' }}>
                {!preview ? (
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="마크다운으로 내용을 작성하세요..."
                        style={{
                            width: '100%',
                            height: '100%',
                            minHeight: '400px',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--input-text)',
                            fontSize: '1rem',
                            fontFamily: 'monospace',
                            outline: 'none',
                            resize: 'vertical',
                            lineHeight: '1.6'
                        }}
                    />
                ) : (
                    <div
                        className="blog-content"
                        style={{
                            width: '100%',
                            height: '100%',
                            minHeight: '400px',
                            padding: '1rem',
                            background: 'var(--input-bg)',
                            borderRadius: '0.5rem',
                            overflowY: 'auto',
                            color: 'var(--foreground)',
                            border: '1px solid var(--input-border)'
                        }}
                    >
                        {/* Simple markdown placeholder - in real app would use react-markdown */}
                        {value.split('\n').map((line, i) => {
                            if (line.startsWith('# ')) return <h1 key={i}>{line.replace('# ', '')}</h1>
                            if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>
                            if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>
                            if (line.startsWith('- ')) return <li key={i}>{line.replace('- ', '')}</li>
                            return <p key={i}>{line || '\u00A0'}</p>
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
