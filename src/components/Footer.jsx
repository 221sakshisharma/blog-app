import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionClick = (sectionId) => {
    if (location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <footer className="bg-[#f8f5f2] text-gray-700 border-t border-gray-200 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-2 md:mb-0">
          © {new Date().getFullYear()} BlogSpace. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <button onClick={() => handleSectionClick('about')} className="hover:underline">
            About
          </button>
          <button onClick={() => handleSectionClick('articles')} className="hover:underline">
            Articles
          </button>
          <button onClick={() => handleSectionClick('contact')} className="hover:underline">
            Contact
          </button>
          <a
            href="https://github.com/221sakshisharma/blog-app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sakshi-sharma-188125277/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
