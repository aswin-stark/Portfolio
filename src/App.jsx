import useLenis from "./hooks/useLenis.js";
import Preloader from "./components/Preloader.jsx";
import Cursor from "./components/Cursor.jsx";
import Background from "./components/Background.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Resume from "./components/Resume.jsx";
// import Blog from "./components/Blog.jsx"; // Blog section hidden — restore this line to bring it back
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  useLenis();

  return (
    <>
      <Preloader />
      <Cursor />
      <Background />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:px-5 focus:py-3 focus:rounded-pill focus:bg-accent focus:text-white focus:font-display focus:uppercase focus:tracking-widest"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <About />
        <Portfolio />
        <Resume />
        {/* <Blog /> */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
