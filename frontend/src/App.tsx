import Header from "./components/Header";
import WelcomeBanner from "./components/WelcomeBanner";
import AuthLayout from "./components/AuthLayout";

function App() {
  return (
    <main>
      <Header organisation="Tobiversity" name="Mr. User" />
      <WelcomeBanner user="Tobi" />
      <AuthLayout />
    </main>
  );
}

export default App;