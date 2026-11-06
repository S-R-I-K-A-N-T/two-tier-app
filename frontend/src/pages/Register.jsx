import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  return (
    <div className="card">
      <h2>Create your account</h2>
      <RegisterForm />
      <p className="small">Already registered? <Link to="/login">Login</Link> · <Link to="/">Home</Link></p>
    </div>
  );
}