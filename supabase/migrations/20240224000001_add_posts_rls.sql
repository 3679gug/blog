-- Allow authenticated users to insert posts
CREATE POLICY "Users can insert their own posts" ON public.posts
    FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Allow authenticated users to update their own posts
CREATE POLICY "Users can update their own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = author_id);

-- Allow authenticated users to delete their own posts
CREATE POLICY "Users can delete their own posts" ON public.posts
    FOR DELETE USING (auth.uid() = author_id);
