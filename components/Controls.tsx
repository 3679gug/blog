import Link from 'next/link'

interface CategoryFilterProps {
    categories: { id: number; name: string; slug: string }[]
    activeCategory: string
}

export function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
    return (
        <div style={{ display: 'flex', gap: '0.75rem', margin: '2rem 0', flexWrap: 'wrap' }}>
            <Link
                href="/"
                style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '2rem',
                    background: activeCategory === 'all' ? 'var(--primary)' : 'var(--category-bg)',
                    color: activeCategory === 'all' ? 'white' : 'var(--category-text)',
                    border: activeCategory === 'all' ? 'none' : '1px solid var(--category-border)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                }}
            >
                전체
            </Link>
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/?category=${category.slug}`}
                    style={{
                        padding: '0.5rem 1.25rem',
                        borderRadius: '2rem',
                        background: activeCategory === category.slug ? 'var(--primary)' : 'var(--category-bg)',
                        color: activeCategory === category.slug ? 'white' : 'var(--category-text)',
                        border: activeCategory === category.slug ? 'none' : '1px solid var(--category-border)',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        textDecoration: 'none',
                        transition: 'all 0.2s'
                    }}
                >
                    {category.name}
                </Link>
            ))}
        </div>
    )
}

interface PaginationProps {
    currentPage: number
    totalPages: number
    totalResults: number
    pageSize: number
}

export function Pagination({ currentPage, totalPages, totalResults, pageSize }: PaginationProps) {
    const start = (currentPage - 1) * pageSize + 1
    const end = Math.min(currentPage * pageSize, totalResults)

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '4rem 0 2rem' }}>
            <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                전체 <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>{totalResults}</span>개의 결과 중 <span style={{ color: 'var(--foreground)', fontWeight: 600 }}>{start}</span>-<span style={{ color: 'var(--foreground)', fontWeight: 600 }}>{end}</span> 표시
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link
                    href={`/?page=${currentPage - 1}`}
                    aria-disabled={currentPage === 1}
                    style={{
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        color: 'var(--muted)',
                        opacity: currentPage === 1 ? 0.5 : 1,
                        pointerEvents: currentPage === 1 ? 'none' : 'auto',
                        background: 'var(--card-bg)'
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </Link>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Link
                        key={page}
                        href={`/?page=${page}`}
                        style={{
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px',
                            background: currentPage === page ? 'var(--primary)' : 'transparent',
                            color: currentPage === page ? 'white' : 'var(--muted)',
                            border: currentPage === page ? 'none' : 'none',
                            textDecoration: 'none',
                        }}
                    >
                        {page}
                    </Link>
                ))}

                <Link
                    href={`/?page=${currentPage + 1}`}
                    aria-disabled={currentPage === totalPages}
                    style={{
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        color: 'var(--muted)',
                        opacity: currentPage === totalPages ? 0.5 : 1,
                        pointerEvents: currentPage === totalPages ? 'none' : 'auto',
                        background: 'var(--card-bg)'
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </Link>
            </div>
        </div>
    )
}
