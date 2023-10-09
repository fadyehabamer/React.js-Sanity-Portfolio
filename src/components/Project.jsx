import SanityClient from '../client.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import post from '../../../portfolio/schemas/post.js';
export default function Project() {
  const [projecttData, setProjectData] = useState(null);
  useEffect(() => {
    // * --> select all
    SanityClient.fetch(
      `*[_type == "project"]
        {
            title,
            date,
            place,
            description,
            projectType,
            link,
            tags,
            mainImage{
                asset->{
                    _id,
                    url
                },
                alt
            }
        }
        `
    )
      .then((data) => {
        console.log(data);
        setProjectData(data);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen p-12">
      <section className="container mx-auto">
        <h1 className="text-5xl flex justify-center cursive">Projects Page</h1>
        <h2 className="text-lg text-gray-600 flex justify-center mb-12">
          Welcome to my page of blog posts
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projecttData &&
            projecttData.map((project, index) => (
              <article key={index}>
                <Link to={project.link} key={project.title}>
                  <span
                    className="block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-violet-400"
                    key={index}
                  >
                    <img
                      src={project.mainImage.asset.url}
                      alt={project.mainImage.alt}
                      className="w-full h-full rounded-r object-cover absolute"
                    />

                    <span className="block relative h-full flex justify-end items-end pr-4 pb-4 gap-2">
                      <h3 className="text-gray-800 text-lg font-bold px-3 py-4 bg-violet-700 text-red-100 bg-opacity-75 rounded">
                        {project.title}
                      </h3>

                      <h3 className="text-gray-800 text-lg font-bold px-3 py-4 bg-violet-700 text-red-100 bg-opacity-75 rounded">
                        {project.place}
                      </h3>
                    </span>
                  </span>
                </Link>

                <p className="my-6 text-lg text-gray-700 leading-relaxed">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                    >
                      #{tag}
                    </span>
                  ))}
                </p>
              </article>
            ))}
        </div>
      </section>
    </main>
  );
}
