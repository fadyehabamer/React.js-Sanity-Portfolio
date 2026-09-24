import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SanityClient from '../client.js';
import { PortableText } from '@portabletext/react';
import { imageUrl, imageSrcSet } from '../imageUrl.js';

export default function SinglePost() {
  const [singlePost, setSinglePost] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    // Pass the slug as a GROQ parameter: interpolating the URL segment into the
    // query string lets a crafted URL rewrite the query.
    SanityClient.fetch(
      `*[_type == "post" && slug.current == $slug]{
        title,
        _id,
        slug,
        mainImage{
          asset->{
            _id,
            url
          }
        },
        body,
        "name": author->name,
        "authorImage": author->image.asset->url
      }`,
      { slug }
    )
      .then((data) => {
        setSinglePost(data[0] ?? null);
        setNotFound(!data[0]);
      })
      .catch(console.error);
  }, [slug]);

  if (notFound) return <div>Post not found.</div>;
  if (!singlePost) return <div>Loading...</div>;

  return (
    <main className="bg-gray-200 min-h-screen p-12">
      <article className="container shadow-lg mx-auto bg-violet-200 rounded-lg">
        <header className="relative">
          <div className="absolute h-full w-full flex items-center justify-center p-8">
            <div className="bg-white bg-opacity-75 rounded p-12">
              <h1 className="cursive text-3xl lg:text-6xl mb-4">
                {singlePost.title}
              </h1>
              <div className="flex justify-center text-gray-800">
                {singlePost.authorImage && (
                  <img
                    src={singlePost.authorImage}
                    alt={singlePost.name}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <p className="cursive flex items-center pl-2 text-2xl">
                  {singlePost.name}
                </p>
              </div>
            </div>
          </div>
          {singlePost.mainImage?.asset?.url && (
            <img
              src={imageUrl(singlePost.mainImage, 1600)}
              srcSet={imageSrcSet(singlePost.mainImage, [800, 1200, 1600, 2400])}
              sizes="100vw"
              alt={singlePost.title}
              className="w-full object-cover rounded-t"
              style={{ height: '400px' }}
            />
          )}
        </header>
        <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
          <PortableText value={singlePost.body ?? []} />
        </div>
      </article>
    </main>
  );
}
