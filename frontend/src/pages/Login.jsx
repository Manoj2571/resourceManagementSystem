import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login({ email, password });
    if (result.success) {
      navigate("/dashboard");
    }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-24 p-6 bg-white rounded-md border">
        <h1 className="text-3xl font-semibold mb-4 text-purple-700 text-center">
        RMS
      </h1>
      <h2 className="text-xl mb-1 text-center font-medium">Log in to your account</h2>
      <p className="text-center text-gray-500 mb-6">Please enter your details</p>
        <form onSubmit={handleSubmit} className="space-y-5">
      <div>
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
       <div>
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
            Password
          </label>
            <Input
              id="password"
              placeholder="Enter your password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
            >
            </button>
        </div>
      <Button type="submit" className="w-full" disabled={loading}>
        Login
      </Button>
    </form>

    <p className="mt-4 text-sm text-center text-muted-foreground">
         Don't have an account?{" "}<Link to="/register" className="text-primary font-medium hover:underline">
    Register
  </Link>
      </p>
    </div>
    
  );
}
