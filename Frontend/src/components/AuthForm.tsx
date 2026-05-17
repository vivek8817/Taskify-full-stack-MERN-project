import { useState } from "react";
import { Link } from "react-router-dom";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: any) => void;
}



const AuthForm: React.FC<AuthFormProps> = ({type, onSubmit}) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'register') {
      onSubmit({name, email, password})
    } else {
      onSubmit({email, password})
    }
  }

const isLogin = type === 'login'

  return (
    <div className="w-full max-w-md bg-surface p-8 rounded-xl border border-mainDash shadow-2xl">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-2 mb-8 text-center">
        <div className="w-12 h-12 rounded-full bg-mainDash border border-mainDash flex items-center justify-center mb-2">
          <iconify-icon
            icon={isLogin ? "mdi:login-variant" : "mdi:account-plus-outline"}
            width="24"
            style={{ color: "var(--color-brand)" }}
          />
        </div>
        <h2 className="text-2xl font-bold text-text-main">{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
        <p className="text-text-muted text-base">
          {isLogin ? 'Enter your details to access your tasks.' : 'Sign up to start managing your tasks.'}
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">


        {!isLogin && (<div className="flex flex-col gap-2">
          <label className="text-sm text-text-muted font-medium ml-1">
            Full Name
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-text-muted flex">
              <iconify-icon icon="mdi:account-outline" width="20" />
            </span>
            <input
              type="text"
              required={!isLogin}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full bg-background border border-mainDash rounded-xl py-3 pl-12 pr-4 text-text-main placeholder:text-text-muted/50 focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            />
          </div>
        </div>)}

        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-muted font-medium ml-1">
            Email Address
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-text-muted flex">
              <iconify-icon icon="mdi:email-outline" width="20" />
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-background border border-mainDash rounded-xl py-3 pl-12 pr-4 text-text-main placeholder:text-text-muted/50 focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-2">
          <label className="text-sm text-text-muted font-medium ml-1">
            Password
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-text-muted flex">
              <iconify-icon icon="mdi:lock-outline" width="20" />
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-background border border-mainDash rounded-xl py-3 pl-12 pr-4 text-text-main placeholder:text-text-muted/50 focus:border-brand focus:ring-1 focus:ring-brand transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-brand text-brand-dark font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity flex justify-center items-center gap-2"
        >
          <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
          <iconify-icon icon="mdi:arrow-right" width="20" />
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-text-muted">
        {isLogin ? (
          <p>Don't have an account? <Link to="/register" className="text-brand hover:underline font-medium">Sign up</Link></p>
        ) : (
          <p>Already have an account? <Link to="/login" className="text-brand hover:underline font-medium">Sign in</Link></p>
        )}
      </div>


    </div>
  );
};

export default AuthForm;
