import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const { isLoaded, signIn, setActive } = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setPending(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password: password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Identity verified. Session initialized.");
        navigate("/");
      } else {
        console.error("Incomplete sign in result:", result);
        setError("Process incomplete. Please follow the required steps.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const errorMessage = err.errors?.[0]?.message || "Identity verification failed.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setPending(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err: any) {
      toast.error("Google authentication failed.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-card border border-border animate-fade-in relative overflow-hidden rounded-2xl">
       <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
       <div className="border-beam"></div>
      
      <div className="text-center mb-8">
        <img src="/logo.svg" alt="Pulsewire Logo" className="h-24 w-auto mx-auto mb-2" />
        <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] mt-2 opacity-70">
          Intelligence Access Terminal
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-[9px] uppercase font-quantico tracking-[0.2em] animate-in fade-in slide-in-from-top-1">
          ERROR DETECTED: {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-[10px] font-quantico text-secondary/70 uppercase mb-2 tracking-wider">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field bg-black/40 border-primary/20 focus:border-primary/60 transition-all duration-300"
            placeholder="Enter your email"
            required
            disabled={pending}
          />
        </div>
        <div className="relative">
          <label className="block text-[10px] font-quantico text-secondary/70 uppercase mb-2 tracking-wider">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field bg-black/40 border-primary/20 focus:border-primary/60 transition-all duration-300 pr-10"
              placeholder="Enter your password"
              required
              disabled={pending}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>
        <div className="btn-wrapper mt-4">
          <button type="submit" className="uiverse-btn" disabled={pending}>
            <div className="txt-wrapper">
              {pending ? (
                <span className="txt-1">PROCESSING...</span>
              ) : (
                <span className="txt-1">
                  {"SIGN IN".split("").map((char, i) => (
                    <span key={i} className="btn-letter">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-col space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/30" />
          </div>
          <div className="relative flex justify-center text-[9px] uppercase tracking-widest">
            <span className="bg-card px-2 text-muted-foreground">Or access via</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full border border-border/40 bg-transparent hover:bg-foreground/5 text-foreground/80 font-quantico py-3 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center space-x-2 rounded-xl"
          disabled={pending}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/signup"
          className="text-muted-foreground text-[10px] uppercase hover:text-primary transition-all duration-300 tracking-[0.15em] opacity-60 hover:opacity-100"
        >
          Don't have an account? <span className="underline underline-offset-4 decoration-primary/30">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
