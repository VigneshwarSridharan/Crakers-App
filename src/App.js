import TopNavigation from "./layout/TopNavigation";


function App({ children }) {
  return (
    <div>
      <TopNavigation />
      {children}
    </div>
  );
}

export default App;
