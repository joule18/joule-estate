import { Link } from "react-router-dom";
function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4 ">
        <input
          type="text"
          className="border p-3 rounded-lg"
          placeholder="username"
          id="username"
        />
        <input
          type="email"
          className="border p-3 rounded-lg"
          placeholder="email"
          id="email"
        />
        <input
          type="password"
          className="border p-3 rounded-lg"
          placeholder="password"
          id="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/log-in"}>
          <span className="text-blue-700">Log in</span>
        </Link>
      </div>
    </div>
  );
}
export default SignUp;
