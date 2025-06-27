import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
  }, [location.state]);

  return (
    <>
      <Header />

      {/* About Section */}
      <section id="about" className="py-24 bg-[#fffdfb]">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center gap-9">
          <img
            src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About BlogSpace"
            className="w-full md:w-1/2 rounded-lg"
          />
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">About BlogSpace</h2>
            <p className="text-gray-600 text-md">
              BlogSpace is your go-to platform to read, write, and share your thoughts with the world.
              Whether you're a seasoned writer or just getting started, we help you express and connect
              through words.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section
  id="articles"
  className="py-32 bg-cover bg-center relative"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-[#644B31]/50"></div>

  {/* Content */}
  <div className="relative z-10 max-w-4xl mx-auto text-slate-100 px-6 text-center p-10">
    <h2 className="text-4xl font-bold mb-4">
      Explore Articles
    </h2>
    <p className="text-slate-100 text-md mb-4">
      Our articles cover tech, travel, self-growth, and more — sharing stories, insights, and tips from our community.
    </p>
    
  </div>
</section>

      {/* Contact Section */}
     <section id="contact" className="py-24 bg-[#fffdfb]">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold text-gray-800 mb-6">Get In Touch</h2>
    <p className="text-gray-600 text-md mb-8">
      Have questions, feedback, or just want to say hi? We'd love to hear from you.
    </p>
    <a
      href="mailto:221sakshisharma@gmail.com"
      className="inline-block bg-gray-700 text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
    >
      Email Us
    </a>
  </div>
</section>

      <Footer />
    </>
  );
};

export default Home;
