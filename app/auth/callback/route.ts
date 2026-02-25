import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Simply redirect to origin + next. 
            // Vercel handled origin should be correct for the deployment.
            return NextResponse.redirect(`${origin}${next}`)
        }

        console.error('Auth Callback Error:', error.message)
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/login?error=Authentication failed during callback`)
}
