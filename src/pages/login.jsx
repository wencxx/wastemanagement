import { Link } from "react-router-dom";

function Login() {
    return ( 
        <div className="h-screen flex justify-center items-center">
            <form action="" className="bg-white p-8 rounded border border-gray-200 flex flex-col gap-4 w-full max-w-sm">
                <h1 className="text-center text-2xl font-medium">Welcome Back Admin!</h1>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xl">Email</label>
                    <input type="email" id="email" placeholder="Enter email" className="border border-gray-500 rounded pl-2 h-10" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-xl">Password</label>
                    <input type="password" id="password" placeholder="Enter password" className="border border-gray-500 rounded pl-2 h-10" />
                </div>
                <button className="bg-slate-900 text-white py-1 rounded text-lg mt-2">Login</button>
                <Link to="" className="hover:underline">Forgot password?</Link>
            </form>
        </div>
    );
}

export default Login;