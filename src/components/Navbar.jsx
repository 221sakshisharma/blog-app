import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { logout as stateLogout } from '../state/authSlice';

const Navbar = ({
  navLinks = [
    { to: "about", label: "About" },
    { to: "articles", label: "Articles" },
    { to: "contact", label: "Contact" }
  ]
}) => {
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(stateLogout());
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const scrollToSection = (id) => {
  if (window.location.pathname !== '/') {
    navigate('/', { state: { scrollTo: id } });
    setIsMobileMenuOpen(false);
    return;
  }

  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }
};


  const guestLinks = (
    <div className="flex items-center gap-4">
      <Link
        to="/signup"
        className="text-gray-900 text-sm border rounded-sm border-gray-300 px-4 py-1.5 hover:bg-gray-50 transition"
      >
        Get Started
      </Link>
    </div>
  );

  const userLinks = (
    <div className="relative">
      <button
        type="button"
        className="w-9 h-9 rounded-full overflow-hidden border border-gray-300"
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
          setIsMobileMenuOpen(false);
        }}
      >
        <img
          src="https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2210.jpg?semt=ais_hybrid&w=740"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-1 w-30 bg-white border border-gray-100">
          <Link to="/my-space" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsDropdownOpen(false)}>My Space</Link>
          <Link to="/all-posts" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsDropdownOpen(false)}>All Posts</Link>
          <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsDropdownOpen(false)}>Profile</Link>
          <div onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">Logout</div>
        </div>
      )}
    </div>
  );

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200 px-6 py-3 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            setIsDropdownOpen(false);
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="text-3xl font-light text-gray-800 hover:text-black transition-colors">
          <span className="font-semibold">Blog</span>Space
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 text-sm font-medium">
          {navLinks.map(({ to, label }) => (
            <button
              key={to}
              onClick={() => scrollToSection(to)}
              className="hover:text-black transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right Side */}
        {user ? userLinks : guestLinks}
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 text-gray-700 text-sm font-medium space-y-2">
          {navLinks.map(({ to, label }) => (
            <button
              key={label}
              onClick={() => scrollToSection(to)}
              className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
