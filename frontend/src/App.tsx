import Header from "./components/Header";
import WelcomeBanner from "./components/WelcomeBanner";

function App() {
  return (
    <main>
      <Header organisation="Tobiversity" name="Handsome User" />
      <WelcomeBanner user="Tobi" />
    </main>
  );
}

export default App;