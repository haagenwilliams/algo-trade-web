import React from 'react'
    import ReactMarkdown from 'react-markdown'
    import blogPosts from '../data/blogPosts'

    export default function Blog() {
      return (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8">Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <ReactMarkdown className="prose">
                    {post.content.substring(0, 200) + '...'}
                  </ReactMarkdown>
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-accent hover:underline mt-4 inline-block"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
