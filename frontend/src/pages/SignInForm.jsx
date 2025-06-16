import React, { useEffect, useState } from 'react';
import logo from "../assets/site_logo.png"
import { Eye, EyeOff } from 'lucide-react';
import useTitle from '../components/Title';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/userApi';
import { Loader2 } from "lucide-react"
import useRecaptcha from '../hook/useRecaptcha';
import ReCAPTCHA from 'react-google-recaptcha';

const SignInForm = () => {

    useTitle("Sign in to your account")

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha()
    const [form, setForm] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const res = await loginUser(form);

            if (res.recaptchaValid === false) {
                alert("ReCAPTCHA validation failed. Please try again.");
                handleRecaptcha("");
                if (recaptchaRef.current) recaptchaRef.current.reset();
                return;
            }

            if (res.success) {
                alert(res.message);
                localStorage.setItem("token", res.token);
                navigate("/dashboard");
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (err) {
            if (err.response) {
                if (err.response.status === 401) {
                    alert("Invalid email or password. Please try again.");
                } else if (err.response.status === 404) {
                    alert("No account found with that email.");
                } else {
                    alert(err.response?.data?.message || "An unexpected error occurred.");
                }
            } else {
                alert("Network error. Please check your connection.");
            }
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Logo */}
                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <img
                            src={logo}
                            alt="BlueStock Logo"
                            className="h-10 w-auto object-contain" // Changed from h-full to h-10
                            style={{ maxHeight: '40px' }} // Optional: adjust as needed
                        />
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-2 space-y-6">
                    <div className="space-y-4">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                                placeholder="hello@bluestock.in"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={handleChange}
                                    className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                                    placeholder="••••••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={togglePasswordVisibility}
                                >
                                    {
                                        showPassword ? (
                                            <EyeOff className='h-5 w-5 text-gray-500' />
                                        ) : (
                                            <Eye className='h-5 w-5 text-gray-500' />
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* reCAPTCHA */}
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={import.meta.env.VITE_SITE_KEY}
                        onChange={handleRecaptcha}
                        className='flex items-center justify-center w-full'
                    />


                    {/* Sign In Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading || !capchaToken}
                            className="disabled:opacity-50 relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin w-5 h-5 mr-1" />
                                    <p>Please Wait...</p>
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-gray-50 text-gray-500">or sign in with</span>
                        </div>
                    </div>

                    {/* Google Button */}
                    <div>
                        <button
                            type="button"
                            className="group relative w-full flex justify-center items-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-sm transition duration-150 ease-in-out"
                        >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-sm text-gray-600">
                        <a href="/sign-up" className="text-blue-600 hover:text-blue-500 font-medium">
                            Create an account
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInForm;