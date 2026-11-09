import "./styles/WelcomeBanner.css";

type WelcomeBannerProps = {
  user: string;
};

function WelcomeBanner({ user }: WelcomeBannerProps) {
  return (
    <div className="welcome-banner">
      <h1>Welcome Back, {user}!</h1>
    </div>
  );
}

export default WelcomeBanner;