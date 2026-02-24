-- Seed categories
INSERT INTO public.categories (name, slug)
VALUES 
    ('전체', 'all'), -- This might conflict with the 'all' logic in the UI, but let's see. Actually 'all' is usually hardcoded.
    ('자바스크립트', 'javascript'),
    ('파이썬', 'python'),
    ('러스트', 'rust'),
    ('데브옵스', 'devops'),
    ('디자인 시스템', 'design-systems'),
    ('깃', 'git'),
    ('CSS', 'css'),
    ('쿠버네티스', 'kubernetes')
ON CONFLICT (slug) DO NOTHING;

-- Seed posts
INSERT INTO public.posts (title, subtitle, content, slug, thumbnail_url, category_id, read_time_minutes)
VALUES 
    ('모던 자바스크립트의 Async/Await 이해하기', '비동기 프로그래밍 패턴, 에러 처리, 그리고 2024년 깔끔한 비동기 코드 작성을 위한 베스트 프랙티스를 깊이 있게 살펴봅니다.', '상세 내용...', 'async-await-js', 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800', (SELECT id FROM public.categories WHERE slug = 'javascript'), 5),
    ('파이썬 개발자를 위한 러스트: 실무 가이드', '동적 타이핑과 정적 타이핑의 간극을 메우기. 왜 파이썬 개발자들이 성능이 중요한 애플리케이션을 위해 러스트를 배워야 하는지 알아봅니다.', '상세 내용...', 'rust-for-python', 'https://images.unsplash.com/photo-1525547718511-b05de4e70845?w=800', (SELECT id FROM public.categories WHERE slug = 'python'), 8),
    ('Node.js 앱 도커라이징: 베스트 프랙티스', '컨테이너화를 위한 단계별 가이드. 더 작은 이미지 크기와 빠른 빌드를 위해 Dockerfile을 최적화하는 방법을 배웁니다.', '상세 내용...', 'dockerizing-node', 'https://images.unsplash.com/photo-1605745341112-85968b193ef5?w=800', (SELECT id FROM public.categories WHERE slug = 'devops'), 6),
    ('Git Rebase vs Merge 완벽 정복', '프로처럼 커밋 히스토리를 정리하세요. 언제 rebase를 사용하고 언제 클래식한 merge 전략을 고수해야 하는지 이해해 봅니다.', '상세 내용...', 'git-rebase-vs-merge', 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800', (SELECT id FROM public.categories WHERE slug = 'git'), 4),
    ('CSS Grid vs Flexbox: 궁극의 가이드', '어떤 레이아웃 모델을 사용해야 할까요? 두 현대적인 CSS 레이아웃 시스템의 장단점을 탐구합니다.', '상세 내용...', 'css-grid-vs-flexbox', 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800', (SELECT id FROM public.categories WHERE slug = 'css'), 7),
    ('쿠버네티스 오케스트레이션 입문', '컨테이너 규모를 확장하는 것이 반드시 공포스러울 필요는 없습니다. K8s의 기본 개념을 알기 쉽게 풀어드립니다.', '상세 내용...', 'intro-to-k8s', 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800', (SELECT id FROM public.categories WHERE slug = 'kubernetes'), 10)
ON CONFLICT (slug) DO NOTHING;
