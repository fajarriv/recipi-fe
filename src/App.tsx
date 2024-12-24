import { SearchBox } from "./components/SearchBox";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Recipi</h1>
          <SearchBox />
          <p className="text-gray-500 text-center mt-4 text-sm">
            Search for recipes, ingredients, or cooking methods
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
