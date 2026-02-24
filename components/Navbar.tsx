import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { logout } from '@/app/auth/actions'
import ThemeToggle from '@/components/ThemeToggle'


export default async function Navbar() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <header>
            <div className="container" style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', fontWeight: 700, fontFamily: 'Outfit' }}>
                    <div style={{ background: '#3b82f6', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
                    </div>
                    DevLog
                </Link>

                <div style={{ flex: 1, margin: '0 2rem', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="글 제목, 태그, 작성자 검색..."
                        style={{ width: '100%', background: 'var(--input-bg)', border: '1px solid var(--input-border)', borderRadius: '8px', padding: '0.625rem 1rem 0.625rem 2.5rem', color: 'var(--input-text)', outline: 'none' }}
                    />
                    <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>

                <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginRight: '1rem' }}>
                        <Link href="/" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--muted)' }}>포스트</Link>
                        <Link href="/" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--muted)' }}>임시저장</Link>
                        <Link href="/" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--muted)' }}>설정</Link>
                    </div>
                    <div style={{ marginRight: '0.5rem' }}>
                        <ThemeToggle />
                    </div>
                    {user ? (
                        <>
                            <Link href="/write" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>글쓰기</Link>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                <img src={user.user_metadata?.avatar_url || 'https://i.pravatar.cc/150?u=' + user.id} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <form action={logout}>
                                <button type="submit" className="btn-secondary" style={{ padding: '0.5rem', color: 'var(--foreground)' }}>로그아웃</button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="btn-secondary" style={{ color: 'var(--foreground)' }}>로그인</Link>
                            <Link href="/signup" className="btn-primary">시작하기</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}
