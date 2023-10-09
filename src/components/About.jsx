import  {useEffect , useState} from "react";
import SanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imgBg from "../assets/pattern.svg";
export default function About(){
    const [author, setAuthor] = useState(null);    
    useEffect(() => {
        SanityClient.fetch(
        `*[_type == "author"]{
            name,
            bio,
            "authorImage": image.asset->url
        }`
        )
        .then((data) => setAuthor(data[0]))
        .catch(console.error);
    }, []);
    
    if (!author) return <div>Loading...</div>;
    
    return (
        <main className="relative">
        <img
            src={imgBg}
            alt="Background"
            className="absolute w-full"
        />
        <div className="p-10 lg:pt-48 container mx-auto relative">
            <section className="bg-white rounded-lg shadow-2xl lg:flex p-20">
            <img
                src={author.authorImage}
                alt={author.name}
                className="rounded w-32 h-32 lg:w-64 lg:h-64 mr-8"
            />
            <div className="text-lg flex flex-col justify-center">
                <h1 className="cursive text-6xl text-violet-700 mb-4">
                    Hey there. I&rsquo;m{" "}
                    <br />
                    <span className="text-violet-900">{author.name}</span>
                </h1>
                <div className="prose lg:prose-xl text-violet">
                    <BlockContent
                        blocks={author.bio}
                        projectId="v0q0xj1i"
                        dataset="production"
                    />
                </div>
            </div>
            </section>
        </div>
        </main>
    );
}