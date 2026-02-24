'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
                aria-label="Toggle Theme"
                style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <div style={{ width: '20px', height: '20px' }} />
            </button>
        )
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle Theme"
            style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                color: 'var(--foreground)',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
            }}
        >
            {theme === 'dark' ? (
                <Sun size={20} />
            ) : (
                <Moon size={20} />
            )}
        </button>
    )
}
