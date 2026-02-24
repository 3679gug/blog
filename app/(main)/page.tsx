import { createClient } from '@/utils/supabase/server'
import BlogCard from '@/components/BlogCard'
import { CategoryFilter, Pagination } from '@/components/Controls'

const PAGE_SIZE = 6

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const { category: activeCategory = 'all', page = '1' } = await searchParams
  const currentPage = parseInt(page)
  const supabase = await createClient()

  let categories: { id: number; name: string; slug: string }[] = []
  let posts: any[] = []
  let totalResults = 0

  try {
    // Fetch Categories
    const { data: categoriesData, error: catError } = await supabase.from('categories').select('*')
    if (catError) throw catError
    categories = categoriesData || []

    // Build Post Query
    let query = supabase
      .from('posts')
      .select('*, category:categories(*)', { count: 'exact' })
      .order('published_at', { ascending: false })

    if (activeCategory !== 'all') {
      const cat = categories.find((c) => c.slug === activeCategory)
      if (cat) {
        query = query.eq('category_id', cat.id)
      }
    }

    const from = (currentPage - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const { data: postsData, count, error: postsError } = await query.range(from, to)
    if (postsError) throw postsError

    posts = postsData || []
    totalResults = count || 0
  } catch (err: any) {
    console.error('SERVER ERROR:', err)
    return (
      <div className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>
        <h1 style={{ color: 'red' }}>에러 발생</h1>
        <p>{err.message || '알 수 없는 서버 오류'}</p>
        <pre style={{ textAlign: 'left', background: '#f5f5f5', padding: '1rem', marginTop: '1rem', overflowX: 'auto' }}>
          {JSON.stringify(err, null, 2)}
        </pre>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <section style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', fontFamily: 'Outfit', color: 'var(--foreground)' }}>
          최신 게시글
        </h1>
        <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px' }}>
          소프트웨어 개발 세상의 최신 인사이트와 튜토리얼을 만나보세요.
        </p>
      </section>

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil((totalResults || 0) / PAGE_SIZE)}
        totalResults={totalResults || 0}
        pageSize={PAGE_SIZE}
      />
    </div>
  )
}
