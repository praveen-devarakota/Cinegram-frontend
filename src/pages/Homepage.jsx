// src/pages/Homepage.jsx
export default function Homepage() {
  const movies = [
    { id: 1, title: "Pushpa 2", poster: "https://via.placeholder.com/250x350" },
    { id: 2, title: "RRR", poster: "https://via.placeholder.com/250x350" },
    { id: 3, title: "Pathaan", poster: "https://via.placeholder.com/250x350" },
    { id: 4, title: "Jawan", poster: "https://via.placeholder.com/250x350" },
    { id: 5, title: "Leo", poster: "https://via.placeholder.com/250x350" },
    { id: 6, title: "Vikram", poster: "https://via.placeholder.com/250x350" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">🎬 CineGram</h1>
        <nav className="space-x-6">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Movies</a>
          <a href="#" className="hover:underline">Theatres</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
      </header>

      {/* Banner */}
      <section className="relative bg-gray-800 text-white h-64 flex items-center justify-center">
        <h2 className="text-4xl font-bold">Welcome to CineGram</h2>
      </section>

      {/* Movies Section */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Now Showing</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-lg shadow hover:scale-105 transition-transform overflow-hidden"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-2">
                <h3 className="font-medium text-center">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 p-4 text-center">
        © 2025 CineGram. All rights reserved.
      </footer>
    </div>
  );
}
