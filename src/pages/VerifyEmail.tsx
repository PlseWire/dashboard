import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [pending, setPending] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setPending(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        toast.success("Identity verified. Account activated.");
        navigate("/");
      } else {
        console.error("Verification incomplete:", result);
        toast.error("Verification process was not completed.");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      toast.error(err.errors?.[0]?.message || "Identity verification failed.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-card border border-border animate-fade-in relative overflow-hidden rounded-2xl">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="border-beam"></div>
      
      <div className="text-center mb-8">
        <img src="/logo.svg" alt="Pulsewire Logo" className="h-24 w-auto mx-auto mb-2" />
        <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] mt-2 opacity-70">
          Verify Operator Identity
        </p>
      </div>

      <div className="mb-8 text-center sm:text-left border-l-2 border-primary/40 bg-primary/5 p-4 rounded-sm">
        <p className="text-xs text-muted-foreground leading-relaxed">
          A security credential has been dispatched to your email address. 
          Enter the verification code below to authorize your registration.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleVerify}>
        <div>
          <label className="block text-[10px] font-quantico text-secondary/70 uppercase mb-2 tracking-wider">
            Verification Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input-field bg-black/40 border-primary/20 focus:border-primary/60 transition-all duration-300 text-center tracking-[0.5em] text-lg font-bold"
            placeholder="000000"
            maxLength={6}
            required
            disabled={pending}
          />
        </div>

        <div className="btn-wrapper mt-2">
          <button type="submit" className="uiverse-btn" disabled={pending}>
            <div className="txt-wrapper">
              {pending ? (
                <span className="txt-1">ACTIVATING...</span>
              ) : (
                <span className="txt-1">
                  {"ACTIVATE ACCESS".split("").map((char, i) => (
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

      <div className="mt-8 text-center">
        <Link
          to="/signup"
          className="text-muted-foreground text-[10px] uppercase hover:text-primary transition-all duration-300 tracking-[0.15em] opacity-60 hover:opacity-100"
        >
          Incorrect email? <span className="underline underline-offset-4 decoration-primary/30">Restart Registration</span>
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
