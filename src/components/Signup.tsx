import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTimeout(() => {
      navigate('/welcome');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name: <input type="text" name="name" />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
