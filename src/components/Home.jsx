import { NavLink } from "react-router-dom";
export default function Home() {
  return (
    <section className="pb-24 flex items-center min-h-screen justify-center bg-white">
      <div className="mx-auto max-w-[43rem]">
        <div className="text-center">
          <p className="text-lg font-medium leading-8 text-indigo-600/95">
            Hello Folks 👋
          </p>
          <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">
            Welcome to my
            Amazing portfolio
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-400">
            Here you will find my projects and blog posts

          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <NavLink
            to="/about"
            className="transform rounded-md bg-violet-600/95 px-5 py-3 font-medium text-white transition-colors hover:bg-violet-700"
          >
            About Me
          </NavLink>
          <a
            href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            className="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-50"
          >
            My Resume
          </a>
        </div>
      </div>
    </section>
  );
}
