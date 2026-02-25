'use client'

import Link from 'next/link'
import { Mail, Lock, Github, Chrome, Loader2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { signup, signInWithOAuth } from '@/app/auth/actions'
import { useSearchParams } from 'next/navigation'
import ThemeToggle from '@/components/ThemeToggle'
import { Suspense } from 'react'

function SignupContent() {
    const searchParams = useSearchParams()
    const errorParam = searchParams.get('error')
    const messageParam = searchParams.get('message')

    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(errorParam)
    const [message, setMessage] = useState<string | null>(messageParam)

    const handleAction = async (formData: FormData) => {
        setError(null)
        setMessage(null)
        startTransition(async () => {
            await signup(formData)
        })
    }

    return (
        <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]">
            {/* Mockup Header */}
            <header className="w-full flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center rotate-12">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
                    </div>
                    <span className="font-bold text-2xl tracking-tighter font-outfit">DevLog</span>
                </Link>
                <nav className="flex items-center gap-10">
                    <div className="hidden md:flex items-center gap-8 text-[var(--muted)] text-sm font-semibold">
                        <Link href="#" className="hover:text-[var(--foreground)] transition-colors">기능</Link>
                        <Link href="#" className="hover:text-[var(--foreground)] transition-colors">커뮤니티</Link>
                        <Link href="#" className="hover:text-[var(--foreground)] transition-colors">가격</Link>
                    </div>
                    <div className="flex items-center gap-4 border-l border-[var(--border)] pl-8 ml-4">
                        <ThemeToggle />
                        <Link href="/login" className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">로그인</Link>
                        <Link href="/signup" className="text-sm font-semibold bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">회원가입</Link>
                    </div>
                </nav>
            </header>

            <main className="flex-1 flex items-center justify-center p-6 relative">
                <div className="w-full max-w-[480px] relative z-10">
                    <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[2.5rem] p-12 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] space-y-10">
                        <div className="text-center space-y-3">
                            <h1 className="text-4xl font-extrabold tracking-tight font-outfit">계정 만들기</h1>
                            <p className="text-[var(--muted)]">지금 바로 개발자 커뮤니티에 합류하세요</p>
                        </div>

                        <form className="space-y-6" action={handleAction}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--muted)]">이메일 주소</label>
                                <div className="relative">
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="이메일을 입력하세요"
                                        className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-[var(--input-text)]"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--muted)]">비밀번호</label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="비밀번호를 입력하세요"
                                        className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-[var(--input-text)]"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-[var(--muted)] mt-2">
                                    회원가입 시 이용약관 및 개인정보 처리방침에 동의하게 됩니다.
                                </p>
                            </div>

                            {(error || errorParam) && (
                                <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg text-sm">
                                    {error || errorParam}
                                </div>
                            )}

                            {(message || messageParam) && (
                                <div className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 px-4 py-2 rounded-lg text-sm">
                                    {message || messageParam}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                                계정 생성
                            </button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[var(--card-border)]"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-[var(--card-bg)] px-2 text-[var(--muted)]">또는 다음으로 계속하기</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => {
                                    startTransition(async () => {
                                        await signInWithOAuth('google')
                                    })
                                }}
                                disabled={isPending}
                                className="flex items-center justify-center gap-3 bg-[var(--input-bg)] border border-[var(--input-border)] py-3.5 rounded-2xl hover:bg-[var(--card-border)] transition-all text-sm font-semibold text-[var(--foreground)] active:scale-[0.98] disabled:opacity-50"
                                type="button"
                            >
                                <Chrome className="w-5 h-5" />
                                <span>Google</span>
                            </button>
                            <button
                                onClick={() => {
                                    startTransition(async () => {
                                        await signInWithOAuth('github')
                                    })
                                }}
                                disabled={isPending}
                                className="flex items-center justify-center gap-3 bg-[var(--input-bg)] border border-[var(--input-border)] py-3.5 rounded-2xl hover:bg-[var(--card-border)] transition-all text-sm font-semibold text-[var(--foreground)] active:scale-[0.98] disabled:opacity-50"
                                type="button"
                            >
                                <Github className="w-5 h-5" />
                                <span>GitHub</span>
                            </button>
                        </div>

                        <div className="text-center text-sm text-[var(--muted)] pt-2">
                            이미 계정이 있으신가요?{' '}
                            <Link href="/login" className="text-blue-600 hover:text-blue-500 font-bold hover:underline">
                                로그인
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="w-full px-8 py-10 flex flex-col md:flex-row justify-between items-center text-[var(--muted)] text-xs gap-6 max-w-7xl mx-auto">
                <span>© 2026 DevLog Platform. All rights reserved.</span>
                <div className="flex gap-10">
                    <Link href="#" className="hover:text-[var(--foreground)] transition-colors">개인정보 처리방침</Link>
                    <Link href="#" className="hover:text-[var(--foreground)] transition-colors">이용약관</Link>
                    <Link href="#" className="hover:text-[var(--foreground)] transition-colors">고객 센터</Link>
                </div>
            </footer>
        </div>
    )
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignupContent />
        </Suspense>
    )
}
