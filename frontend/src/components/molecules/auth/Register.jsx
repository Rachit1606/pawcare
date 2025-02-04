import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword, signInWithGoogle } from "./firebase";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogAge, setDogAge] = useState("");
  const [dogGender, setDogGender] = useState("");
  const [dogHealthIssues, setDogHealthIssues] = useState("");
  const [dogDietRestrictions, setDogDietRestrictions] = useState("");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const isNumeric = (value) => /^\d+$/.test(value);
  const isAlphabetic = (value) => /^[a-zA-Z\s]*$/.test(value);

  const register = async () => {
    if (!name || !email || !password || !mobile || !address || !dogName || !dogBreed || !dogAge || !dogGender) {
      alert("Please enter all required fields");
      return;
    }

    if (!isAlphabetic(name)) {
      alert("Full Name should contain only alphabets");
      return;
    }

    if (!isNumeric(mobile)) {
      alert("Mobile Number should contain only numbers");
      return;
    }

    if (!isAlphabetic(dogName)) {
      alert("Dog Name should contain only alphabets");
      return;
    }

    if (!isNumeric(dogAge)) {
      alert("Dog Age should be numeric");
      return;
    }

    try {
      await registerWithEmailAndPassword(name, email, password, mobile, address, dogName, dogBreed, dogAge, dogGender, dogHealthIssues, dogDietRestrictions);
      navigate("/");
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="email"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="text"
          className="register__textBox"
          value={mobile}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Mobile Number"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="text"
          className="register__textBox"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <input
          type="text"
          className="register__textBox"
          value={dogName}
          onChange={(e) => setDogName(e.target.value)}
          placeholder="Dog Name"
        />
        <select
          className="register__textBox"
          value={dogBreed}
          onChange={(e) => setDogBreed(e.target.value)}
        >
          <option value="">Select Dog Breed</option>
          <option value="Labrador Retriever">Labrador Retriever</option>
          <option value="German Shepherd">German Shepherd</option>
          <option value="Golden Retriever">Golden Retriever</option>
          <option value="Bulldog">Bulldog</option>
          <option value="Poodle">Poodle</option>
          <option value="Beagle">Beagle</option>
          <option value="Rottweiler">Rottweiler</option>
          <option value="Yorkshire Terrier">Yorkshire Terrier</option>
          <option value="Boxer">Boxer</option>
          <option value="Dachshund">Dachshund</option>
        </select>
        <input
          type="text"
          className="register__textBox"
          value={dogAge}
          onChange={(e) => setDogAge(e.target.value)}
          placeholder="Dog Age"
        />
        <select
          className="register__textBox"
          value={dogGender}
          onChange={(e) => setDogGender(e.target.value)}
        >
          <option value="">Select Dog Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="text"
          className="register__textBox"
          value={dogHealthIssues}
          onChange={(e) => setDogHealthIssues(e.target.value)}
          placeholder="Dog Health Issues"
        />
        <input
          type="text"
          className="register__textBox"
          value={dogDietRestrictions}
          onChange={(e) => setDogDietRestrictions(e.target.value)}
          placeholder="Dog Diet Restrictions"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <button className="register__btn register__google" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Register;
