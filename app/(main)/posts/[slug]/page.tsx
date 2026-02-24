import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { Calendar, Clock, Share2, Twitter, Facebook, Link as LinkIcon } from 'lucide-react'

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const supabase = await createClient()

    const { data: post } = await supabase
        .from('posts')
        .select('*, category:categories(*), author:profiles(*)')
        .eq('slug', slug)
        .single()

    if (!post) {
        notFound()
    }

    const formattedDate = new Date(post.published_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
            <article style={{ maxWidth: '800px', margin: '0 auto' }}>
                <header style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <span style={{ color: 'var(--category-text)', fontSize: '0.875rem', fontWeight: 600, background: 'var(--category-bg)', border: '1px solid var(--category-border)', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>
                            {post.category?.name}
                        </span>
                    </div>

                    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', lineHeight: 1.2, fontFamily: 'Outfit' }}>
                        {post.title}
                    </h1>

                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid var(--border)', borderTop: '1px solid var(--border)', padding: '1.5rem 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img
                                src={post.author?.avatar_url || 'https://i.pravatar.cc/150?u=' + (post.author?.full_name || 'anon')}
                                alt={post.author?.full_name || '작성자'}
                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            />
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '1rem' }}>{post.author?.full_name || '홍길동'}</div>
                                <div className="text-muted" style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={14} />
                                    {formattedDate}
                                    <span style={{ margin: '0 0.25rem' }}>•</span>
                                    <Clock size={14} />
                                    {post.read_time_minutes}분 읽기
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <button title="공유하기" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--card-bg)', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--foreground)' }}>
                                <Share2 size={16} />
                                공유하기
                            </button>
                            <div style={{ height: '24px', width: '1px', background: 'var(--border)' }}></div>
                            <button title="트위터" style={{ color: 'var(--muted)' }}><Twitter size={20} /></button>
                            <button title="페이스북" style={{ color: 'var(--muted)' }}><Facebook size={20} /></button>
                            <button title="링크 복사" style={{ color: 'var(--muted)' }}><LinkIcon size={20} /></button>
                        </div>
                    </div>
                </header>

                <div style={{ marginBottom: '3rem', borderRadius: '1.5rem', overflow: 'hidden', width: '100%', aspectRatio: '16/9', position: 'relative' }}>
                    <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>

                <div
                    className="blog-content"
                    style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--foreground)', opacity: 0.9 }}
                >
                    <p style={{ marginBottom: '1.5rem' }}>{post.subtitle}</p>
                    <div dangerouslySetInnerHTML={{ __html: post.content?.replace(/\n/g, '<br/>') || '' }} />
                </div>

                <div style={{ marginTop: '4rem', padding: '3rem', background: 'var(--card-bg)', borderRadius: '1.5rem', border: '1px solid var(--border)', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--foreground)' }}>내용이 마음에 드셨나요?</h3>
                    <p className="text-muted" style={{ marginBottom: '2rem' }}>이 게시글이 도움이 되었다면 다른 분들께도 공유해 주세요.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Twitter size={18} />
                            트위터에 공유
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--foreground)', padding: '0.625rem 1.25rem', borderRadius: '0.5rem', fontWeight: 600 }}>
                            <LinkIcon size={18} />
                            링크 복사
                        </button>
                    </div>
                </div>
            </article>
        </div>
    )
}
