"use client";

import { useState, useId, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

function Typewriter({
  text,
  speed = 60,
  cursor = "|",
  className,
}: {
  text: string;
  speed?: number;
  cursor?: string;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}

function Label({
  htmlFor,
  children,
  className,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium leading-none text-stone-700 dark:text-stone-200",
        className
      )}
    >
      {children}
    </label>
  );
}

function Input({
  className,
  type,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-stone-300 bg-white px-3 py-3 text-sm text-stone-900 shadow-sm shadow-stone-900/5 transition-shadow placeholder:text-stone-400 focus-visible:border-stone-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-transparent dark:text-white dark:placeholder:text-stone-500 dark:focus-visible:border-white/40",
        className
      )}
      {...props}
    />
  );
}

function PasswordInput({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid w-full items-center gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          className={cn("pe-10", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 end-0 flex h-full w-10 items-center justify-center text-stone-400 transition-colors hover:text-stone-600 focus-visible:text-stone-600 focus-visible:outline-none dark:hover:text-stone-300"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}

function AuthButton({
  children,
  variant = "outline",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "google";
}) {
  const baseClasses =
    "inline-flex h-12 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-xl text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: "#1d4ed8",
      color: "#ffffff",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    },
    google: {
      backgroundColor: "bg-[#16a34a]",
      color: "#ffffff",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    },
    outline: {
      backgroundColor: "transparent",
      color: "inherit",
    },
  };

  const variantClasses = {
    primary: "hover:bg-blue-800 active:bg-blue-900",
    google: "hover:bg-green-700 active:bg-green-800",
    outline:
      "border border-stone-300 bg-white text-stone-900 shadow-sm shadow-stone-900/5 hover:bg-stone-50 hover:border-stone-400 dark:border-white/15 dark:bg-transparent dark:text-white dark:hover:bg-white/5 dark:hover:border-white/30",
  };

  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses[variant]} ${className || ""}`}
      style={variantStyles[variant]}
      {...props}
    >
      {children}
    </button>
  );
}

function SignInForm() {
  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSignIn} autoComplete="on" className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-900 shadow-lg shadow-stone-900/20 dark:bg-white">
          <span className="text-xs font-bold tracking-tight text-white dark:text-stone-900">
            AF
          </span>
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 [text-shadow:0_1px_0_rgba(255,255,255,0.5)] dark:text-white dark:[text-shadow:0_1px_0_rgba(0,0,0,0.3)]">
          Sign in to your account
        </h1>
        <p className="text-balance text-sm text-stone-600 dark:text-stone-300">
          Enter your email below to sign in
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            autoComplete="email"
            className="h-11"
          />
        </div>
        <PasswordInput
          name="password"
          label="Password"
          required
          autoComplete="current-password"
          placeholder="Password"
          className="h-11"
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-200">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-400 dark:border-white/20 dark:bg-transparent"
            />
            Remember me
          </label>
          <a
            href="#"
            className="text-sm font-medium text-stone-700 hover:text-stone-900 hover:underline dark:text-stone-200 dark:hover:text-white"
          >
            Forgot password?
          </a>
        </div>
        <AuthButton type="submit" variant="primary" className="mt-2">
          Sign In
        </AuthButton>
      </div>
    </form>
  );
}

function SignUpForm() {
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSignUp} autoComplete="on" className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-900 shadow-lg shadow-stone-900/20 dark:bg-white">
          <span className="text-xs font-bold tracking-tight text-white dark:text-stone-900">
            AF
          </span>
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900 [text-shadow:0_1px_0_rgba(255,255,255,0.5)] dark:text-white dark:[text-shadow:0_1px_0_rgba(0,0,0,0.3)]">
          Create an account
        </h1>
        <p className="text-balance text-sm text-stone-600 dark:text-stone-300">
          Enter your details below to sign up
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-1">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            autoComplete="name"
            className="h-11"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            autoComplete="email"
            className="h-11"
          />
        </div>
        <PasswordInput
          name="password"
          label="Password"
          required
          autoComplete="new-password"
          placeholder="Password"
          className="h-11"
        />
        <label className="flex items-start gap-2 text-sm text-stone-700 dark:text-stone-200">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-400 dark:border-white/20 dark:bg-transparent"
          />
          <span>
            I agree to the{" "}
            <a href="#" className="font-medium text-stone-900 hover:underline dark:text-white">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="font-medium text-stone-900 hover:underline dark:text-white">
              Privacy Policy
            </a>
          </span>
        </label>
        <AuthButton type="submit" variant="primary" className="mt-2">
          Create Account
        </AuthButton>
      </div>
    </form>
  );
}

function AuthFormContainer({
  isSignIn,
  onToggle,
}: {
  isSignIn: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="mx-auto grid w-full max-w-sm gap-6">
      {isSignIn ? <SignInForm /> : <SignUpForm />}
      <div className="text-center text-sm">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={onToggle}
          className="font-medium text-stone-900 underline-offset-4 hover:underline dark:text-white"
        >
          {isSignIn ? "Sign up" : "Sign in"}
        </button>
      </div>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-stone-200 dark:after:border-white/10">
        <span className="relative z-10 bg-white px-2 text-stone-500 dark:bg-stone-950 dark:text-stone-400">
          Or continue with
        </span>
      </div>
      <AuthButton type="button" onClick={() => {}} variant="google">
        <img
          src="/images/google.png"
          alt="Google logo"
          className="h-6 w-13 object-contain"
        />
        Continue with Google
      </AuthButton>
    </div>
  );
}

const SIGN_IN_CONTENT = {
  image: {
    src: "/images/login.png",
    alt: "A beautiful interior design for sign-in",
  },
  quote: {
    text: "Welcome back. The journey continues.",
    author: "AI Forge",
  },
};

const SIGN_UP_CONTENT = {
  image: {
    src: "/images/signup.png",
    alt: "A vibrant, modern space for new beginnings",
  },
  quote: {
    text: "Create an account. A new chapter awaits.",
    author: "AI Forge",
  },
};

export function AuthSection() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [curtain, setCurtain] = useState<"idle" | "covering" | "revealing">("idle");
  const [displaySignIn, setDisplaySignIn] = useState(true);

  const toggleForm = () => {
    if (curtain !== "idle") return;
    setCurtain("covering");
    window.setTimeout(() => {
      setIsSignIn((prev) => !prev);
      setDisplaySignIn((prev) => !prev);
      setCurtain("revealing");
      window.setTimeout(() => setCurtain("idle"), 700);
    }, 700);
  };
  const currentContent = displaySignIn ? SIGN_IN_CONTENT : SIGN_UP_CONTENT;
  const formOnLeft = displaySignIn;

  return (
    <section className="mt-20 sm:mt-28">
      <div className="mb-8 max-w-2xl mx-auto px-4 text-center sm:mb-10">
        <p className="text-sm font-medium uppercase tracking-widest text-stone-500 dark:text-stone-400">
          Account
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900 dark:text-white sm:text-3xl">
          Save what matters
        </h2>
        <p className="mt-3 text-base leading-relaxed text-stone-600 dark:text-stone-300">
          Create a free account to bookmark tools and build a
          personal shortlist — or sign in to pick up where you
          left off. No spam, no tracking, no credit card.
        </p>
      </div>

      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm shadow-stone-900/5 dark:border-white/10 dark:bg-stone-950 dark:shadow-black/20">
        <style>{`
          input[type="password"]::-ms-reveal,
          input[type="password"]::-ms-clear {
            display: none;
          }
        `}</style>
        <div className="relative grid md:grid-cols-2">
          {/* Form side */}
          <div
            className={cn(
              "relative flex items-center justify-center bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300 p-6 sm:p-8 md:p-12 lg:p-16 dark:from-stone-800 dark:via-stone-700 dark:to-stone-600",
              formOnLeft ? "md:order-1" : "md:order-2"
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_50%)]" />
            <div className="relative">
              <AuthFormContainer isSignIn={displaySignIn} onToggle={toggleForm} />
            </div>
          </div>

          {/* Image side */}
          <div
            className={cn(
              "auth-image-side relative hidden bg-cover bg-center transition-all duration-500 ease-in-out md:block",
              formOnLeft ? "md:order-2" : "md:order-1"
            )}
            style={{ backgroundImage: `url(${currentContent.image.src})` }}
            key={currentContent.image.src}
          >
            <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-white to-transparent dark:from-stone-950" />
            <div className="relative z-10 flex h-full flex-col items-center justify-end p-2 pb-6">
              <blockquote className="space-y-2 text-center text-stone-900 dark:text-white">
                <p className="text-lg font-medium">
                  &ldquo;
                  <Typewriter
                    key={currentContent.quote.text}
                    text={currentContent.quote.text}
                    speed={60}
                  />
                  &rdquo;
                </p>
                <cite className="block text-sm font-light text-stone-500 not-italic dark:text-stone-400">
                  — {currentContent.quote.author}
                </cite>
              </blockquote>
            </div>
          </div>

          {/* Curtain overlay */}
          {curtain !== "idle" && (
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-stone-200 via-stone-300 to-stone-400 dark:from-stone-700 dark:via-stone-600 dark:to-stone-500",
                curtain === "covering" ? "animate-curtain-cover" : "animate-curtain-reveal"
              )}
            />
          )}
        </div>
      </div>
    </section>
  );
}
