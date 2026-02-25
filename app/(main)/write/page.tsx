import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import WriteForm from '@/components/WriteForm'

export default async function WritePage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .order('name')

    const categories = categoriesData || []

    return (
        <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1000px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', fontFamily: 'Outfit' }}>새 글 작성하기</h1>
            <WriteForm categories={categories} />
        </div>
    )
}
