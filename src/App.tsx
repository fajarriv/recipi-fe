import { SearchBox } from "./components/SearchBox";

function App() {
  return (
    <div className="h-screen flex flex-col max-w-xl mx-auto items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Recipi</h1>
      <SearchBox />
    </div>
  );
}

export default App;
