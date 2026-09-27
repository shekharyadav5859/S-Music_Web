
import React from "react";
import {
  Music2,
  Home,
  Library,
  Users,
  Heart,
 
  

} from "lucide-react";

export default function Footer() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <button
              onClick={scrollTop}
              className="flex items-center gap-2 text-white text-2xl font-bold mb-4"
            >
              <div className="bg-purple-600 p-2 rounded-xl">
                <Music2 size={22} />
              </div>
              S-Music
            </button>

            <p className="text-sm leading-6 max-w-xs">
              Discover your favorite music, artists and songs.
              Enjoy your music experience with S-Music.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Explore
            </h3>

            <div className="space-y-3 text-sm">
              <button
                onClick={scrollTop}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Home size={16} />
                Home
              </button>

              <a
                href="/library"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Library size={16} />
                Library
              </a>

              <a
                href="/artists"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Users size={16} />
                Artists
              </a>

              <a
                href="/liked"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Heart size={16} />
                Liked Songs
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Support
            </h3>

            <div className="space-y-3 text-sm">
              <a href="/about" className="block hover:text-white transition">
                About Us
              </a>

              <a href="/contact" className="block hover:text-white transition">
                Contact Us
              </a>

              <a href="/privacy" className="block hover:text-white transition">
                Privacy Policy
              </a>

              <a href="/terms" className="block hover:text-white transition">
                Terms & Conditions
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Follow Us
            </h3>

            <p className="text-sm mb-5">
              Follow S-Music for updates and new features.
            </p>

            <div className="flex gap-3">

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 hover:bg-purple-600 hover:text-white transition"
              >
               
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 hover:bg-purple-600 hover:text-white transition"
              >
              
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 hover:bg-purple-600 hover:text-white transition"
              >
               
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">

          <p>
            © {new Date().getFullYear()} S-Music. All rights reserved.
          </p>

          <button
            onClick={scrollTop}
            className="text-gray-400 hover:text-white transition"
          >
            Back to top ↑
          </button>

        </div>

      </div>
    </footer>
  );
}

