import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Play, Calendar, Star } from 'lucide-react';

export default function Homepage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const carouselMovies = [
    { 
      id: 1, 
      title: "Pushpa 2: The Rule", 
      backdrop: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=800&fit=crop",
      genre: "Action, Drama",
      rating: 8.5,
      description: "The clash is on as Pushpa and Bhanwar Singh continue their rivalry in this epic action saga."
    },
    { 
      id: 2, 
      title: "RRR", 
      backdrop: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=800&fit=crop",
      genre: "Action, Period",
      rating: 9.2,
      description: "A fearless revolutionary and an officer in the British force clash in this epic tale."
    },
    { 
      id: 3, 
      title: "Pathaan", 
      backdrop: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=800&fit=crop",
      genre: "Action, Thriller",
      rating: 8.0,
      description: "A soldier caught by enemies tries to return while facing dangerous obstacles."
    },
  ];

  const nowPlaying = [
    { id: 1, title: "Pushpa 2", poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=250&h=350&fit=crop", genre: "Action", rating: 8.5 },
    { id: 2, title: "RRR", poster: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=250&h=350&fit=crop", genre: "Action", rating: 9.2 },
    { id: 3, title: "Pathaan", poster: "https://images.unsplash.com/photo-1574267432644-f71bc4f14c04?w=250&h=350&fit=crop", genre: "Thriller", rating: 8.0 },
    { id: 4, title: "Jawan", poster: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=250&h=350&fit=crop", genre: "Action", rating: 8.3 },
    { id: 5, title: "Leo", poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=250&h=350&fit=crop", genre: "Thriller", rating: 7.8 },
    { id: 6, title: "Vikram", poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=250&h=350&fit=crop", genre: "Action", rating: 8.9 },
  ];

  const comingSoon = [
    { id: 7, title: "Devara", poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=250&h=350&fit=crop", genre: "Action", releaseDate: "Apr 2025" },
    { id: 8, title: "Tiger 3", poster: "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=250&h=350&fit=crop", genre: "Thriller", releaseDate: "May 2025" },
    { id: 9, title: "Salaar 2", poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=250&h=350&fit=crop", genre: "Action", releaseDate: "Jun 2025" },
    { id: 10, title: "Brahmastra 2", poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=250&h=350&fit=crop", genre: "Fantasy", releaseDate: "Jul 2025" },
  ];

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselMovies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselMovies.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselMovies.length) % carouselMovies.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      

      {/* Carousel */}
      <section className="relative mt-16 h-[600px] overflow-hidden">
        {carouselMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{
              animation: isLoaded && index === currentSlide ? 'slideIn 0.8s ease-out' : 'none'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
            <img
              src={movie.backdrop}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-2xl space-y-4">
                  <div className="flex items-center gap-3 text-blue-600 text-sm font-semibold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{movie.rating}/10</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{movie.genre}</span>
                  </div>
                  <h2 className="text-6xl font-bold text-gray-900 leading-tight">
                    {movie.title}
                  </h2>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    {movie.description}
                  </p>
                  <div className="flex gap-4 pt-4">
                    <button className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all shadow-lg shadow-blue-600/30">
                      <Play className="w-5 h-5" />
                      Book Tickets
                    </button>
                    <button className="px-8 py-3 bg-white bg-opacity-80 text-gray-800 rounded-lg hover:bg-gray-100 transition-all border border-gray-300">
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full transition-all shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full transition-all shadow-lg"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
          {carouselMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all ${
                index === currentSlide ? 'w-12 bg-blue-600' : 'w-8 bg-gray-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Now Playing */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        <section>
          <h2 className={`text-3xl font-bold text-gray-900 mb-8 transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>Now Playing</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {nowPlaying.map((movie, index) => (
              <div
                key={movie.id}
                className={`group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-blue-100 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform shadow-lg">
                      <Play className="w-4 h-4" />
                      Book Now
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{movie.title}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{movie.genre}</span>
                    <span className="flex items-center gap-1 text-blue-600">
                      <Star className="w-3 h-3 fill-current" />
                      {movie.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coming Soon */}
        <section>
          <h2 className={`text-3xl font-bold text-gray-900 mb-8 transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>Coming Soon</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {comingSoon.map((movie, index) => (
              <div
                key={movie.id}
                className={`group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-blue-100 transform hover:scale-105 transition-all duration-300 cursor-pointer ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{
                  transitionDelay: `${(index + 6) * 100}ms`
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {movie.releaseDate}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-60" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{movie.title}</h3>
                  <span className="text-sm text-gray-600">{movie.genre}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`bg-gray-100 border-t border-gray-200 py-8 mt-16 transition-all duration-700 ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`} style={{ transitionDelay: '400ms' }}>
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p className="text-sm">© 2025 CineGram. All rights reserved. | Your Premier Movie Booking Experience</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(1.1);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}