import { SearchBox } from "./components/SearchBox";

function App() {
  return (
    <div className="h-screen flex flex-col max-w-xl mx-auto items-center justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Recipi</h1>
        <SearchBox />
      </div>
    </div>
  );
}

export default App;
