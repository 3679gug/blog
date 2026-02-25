import Link from 'next/link'

interface BlogCardProps {
    post: {
        id: number
        title: string
        subtitle: string
        thumbnail_url: string
        slug: string
        read_time_minutes: number
        published_at: string
        category: {
            name: string
        }
        author?: {
            full_name: string
            avatar_url: string
        }
    }
}

export default function BlogCard({ post }: BlogCardProps) {
    const formattedDate = new Date(post.published_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <article style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '1rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <img
                    src={post.thumbnail_url}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ color: 'var(--category-text)', fontSize: '0.75rem', fontWeight: 600, background: 'var(--category-bg)', border: '1px solid var(--category-border)', padding: '0.25rem 0.625rem', borderRadius: '4px' }}>
                        {post.category.name}
                    </span>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>{formattedDate}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.875rem', lineHeight: 1.4, color: 'var(--foreground)' }}>
                    <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.subtitle}
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                            src={post.author?.avatar_url || 'https://i.pravatar.cc/150?u=' + (post.author?.full_name || 'anon')}
                            alt={post.author?.full_name || '작성자'}
                            style={{ width: '24px', height: '24px', borderRadius: '50%' }}
                        />
                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{post.author?.full_name || '홍길동'}</span>
                    </div>
                    <div className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        약 {post.read_time_minutes}분 읽기
                    </div>
                </div>
            </div>
        </article>
    )
}
