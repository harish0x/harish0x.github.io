document.addEventListener('DOMContentLoaded', () => {
    const blogList = document.getElementById('blog-list');
    const postContainer = document.getElementById('post-container');

    // Check if we are on the home page
    if (blogList) {
        fetchPosts();
    }

    // Check if we are on a post page
    if (postContainer) {
        loadPost();
    }
});

async function fetchPosts() {
    try {
        const postsUrl = new URL('posts.json', window.location.href).href;
        console.log('Attempting to fetch posts from:', postsUrl);
        const response = await fetch(postsUrl);
        if (!response.ok) throw new Error(`Failed to load posts list: ${response.status} ${response.statusText}`);

        const posts = await response.json();
        const blogList = document.getElementById('blog-list');
        blogList.innerHTML = ''; // Clear loading message

        posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = 'blog-item';
            postElement.innerHTML = `
                <span class="blog-date">${post.date}</span>
                <h2 class="blog-title"><a href="post.html?id=${post.id}">${post.title}</a></h2>
                <p class="blog-summary">${post.summary}</p>
                <a href="post.html?id=${post.id}" class="read-more">Read More -></a>
            `;
            blogList.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('blog-list').innerHTML = '<p>Error loading transmission. Check console.</p>';
    }
}

async function loadPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        document.getElementById('post-container').innerHTML = '<p>Error: No transmission ID specified.</p>';
        return;
    }

    try {
        // 1. Get post metadata to find the filename
        const listResponse = await fetch('posts.json');
        const posts = await listResponse.json();
        const post = posts.find(p => p.id === postId);

        if (!post) {
            throw new Error('Post not found in registry');
        }

        // 2. Fetch the markdown content
        const postUrl = new URL(`posts/${post.filename}`, window.location.href).href;
        console.log('Attempting to fetch post content from:', postUrl);
        const mdResponse = await fetch(postUrl);
        if (!mdResponse.ok) throw new Error(`Failed to load post content: ${mdResponse.status} ${mdResponse.statusText}`);

        const markdown = await mdResponse.text();

        // Remove YAML frontmatter if present
        const cleanMarkdown = markdown.replace(/^---[\s\S]*?---\n/, '');

        // 3. Render HTML
        const postContainer = document.getElementById('post-container');
        postContainer.innerHTML = `
            <span class="blog-date">${post.date}</span>
            <h1 class="blog-title">${post.title}</h1>
            <div class="post-content">${marked.parse(cleanMarkdown)}</div>
        `;

        // Update page title
        document.title = `${post.title} - Harishankar-K`;

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('post-container').innerHTML = '<p>Error: Transmission corrupted or missing.</p>';
    }
}
