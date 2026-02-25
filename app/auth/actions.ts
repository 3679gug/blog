'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    console.log('Attempting login for:', email)

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Login error:', error.message)
        redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    return redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '')
    console.log('Attempting signup for:', email, 'Redirect to:', `${siteUrl}/auth/callback`)

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${siteUrl}/auth/callback`,
        },
    })

    if (error) {
        console.error('Signup error:', error.message)
        redirect(`/signup?error=${encodeURIComponent(error.message)}`)
    }

    redirect('/signup?message=가입 확인 메일을 보냈습니다. 이메일을 확인해 주세요.')
}

export async function signInWithOAuth(provider: 'google' | 'github') {
    const supabase = await createClient()
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '')

    console.log(`${provider} OAuth Init - Site URL:`, siteUrl)

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${siteUrl}/auth/callback`,
        },
    })

    if (error) {
        console.error(`${provider} OAuth error:`, error.message)
        redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    if (data.url) {
        redirect(data.url)
    }
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}

export async function createPost(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const title = formData.get('title') as string
    const subtitle = formData.get('subtitle') as string
    const content = formData.get('content') as string
    const categoryId = formData.get('categoryId') as string
    const thumbnailUrl = formData.get('thumbnailUrl') as string

    // Simple slug generation
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9가-힣]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        + '-' + Math.random().toString(36).substring(2, 7)

    const { data, error } = await supabase.from('posts').insert({
        title,
        subtitle,
        content,
        slug,
        thumbnail_url: thumbnailUrl || 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
        category_id: parseInt(categoryId),
        author_id: user.id,
        read_time_minutes: Math.ceil(content.length / 500) || 1,
        published_at: new Date().toISOString()
    }).select().single()

    if (error) {
        throw new Error(error.message)
    }

    redirect(`/posts/${data.slug}`)
}
