import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase.init";

const Login = () => {
    const { SignInEmailAndPass } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data)
        setLoading(true);
        SignInEmailAndPass(auth, data.email, data.password)
            .then(() => {
                toast.success("Login successful!");
                navigate("/dashboard");
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
                Sign In
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Email Field */}
                <div className="mb-4">
                    <label htmlFor="email" className="block font-medium mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value:
                                    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "Enter a valid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="mb-6">
                    <label htmlFor="password" className="block font-medium mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition"
                >
                    {loading ? "Logging in..." : "Sign In"}
                </button>
            </form>

            {/* Social Login */}
            {/* <SocialLogin /> */}

            {/* Navigation to Register */}
            <p className="text-center text-gray-600 mt-4">
                Don’t have an account?{" "}
                <Link to="/register" className="text-red-600 font-semibold hover:underline">
                    Register here
                </Link>
            </p>
        </div>
    );
};

export default Login;
