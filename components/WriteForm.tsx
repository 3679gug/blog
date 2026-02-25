'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createPost } from '@/app/auth/actions'
import Editor from './Editor'

interface Category {
    id: number
    name: string
    slug: string
}



export default function WriteForm({ categories }: { categories: Category[] }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [thumbnailUrl, setThumbnailUrl] = useState('')
    const [content, setContent] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !content || !categoryId) {
            alert('제목, 내용, 카테고리는 필수입니다.')
            return
        }

        const formData = new FormData()
        formData.append('title', title)
        formData.append('subtitle', subtitle)
        formData.append('content', content)
        formData.append('categoryId', categoryId)
        formData.append('thumbnailUrl', thumbnailUrl)

        startTransition(async () => {
            try {
                await createPost(formData)
            } catch (err: unknown) {
                const error = err as Error
                console.error('Error publishing post:', error)
                alert('발행 중 오류가 발생했습니다: ' + error.message)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--muted)' }}>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                        style={{
                            background: 'var(--input-bg)',
                            border: '1px solid var(--input-border)',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1rem',
                            color: 'var(--input-text)',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--muted)' }}>카테고리</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        style={{
                            background: 'var(--input-bg)',
                            border: '1px solid var(--input-border)',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1rem',
                            color: 'var(--input-text)',
                            fontSize: '1rem',
                            outline: 'none',
                            appearance: 'none'
                        }}
                    >
                        <option value="">카테고리 선택</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--muted)' }}>소제목</label>
                <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="소제목을 입력하세요 (선택 사항)"
                    style={{
                        background: 'var(--input-bg)',
                        border: '1px solid var(--input-border)',
                        borderRadius: '0.5rem',
                        padding: '0.75rem 1rem',
                        color: 'var(--input-text)',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--muted)' }}>썸네일 이미지 URL</label>
                <input
                    type="text"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    style={{
                        background: 'var(--input-bg)',
                        border: '1px solid var(--input-border)',
                        borderRadius: '0.5rem',
                        padding: '0.75rem 1rem',
                        color: 'var(--input-text)',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--muted)' }}>내용</label>
                <div style={{
                    border: '1px solid var(--input-border)',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    background: 'var(--input-bg)'
                }}>
                    <Editor value={content} onChange={setContent} />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button
                    type="button"
                    onClick={() => router.back()}
                    style={{
                        padding: '0.75rem 2rem',
                        borderRadius: '0.5rem',
                        fontWeight: 600,
                        color: 'var(--foreground)',
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border)'
                    }}
                >
                    취소
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className="btn-primary"
                    style={{
                        padding: '0.75rem 3rem',
                        borderRadius: '0.5rem',
                        fontWeight: 600,
                        fontSize: '1rem'
                    }}
                >
                    {isPending ? '발행 중...' : '발행'}
                </button>
            </div>
        </form>
    )
}
