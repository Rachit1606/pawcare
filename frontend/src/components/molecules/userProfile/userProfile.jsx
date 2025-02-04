import React, { useState, useEffect, useRef } from "react";
import "./userProfile.scss";
import axios from 'axios';

const Profile = () => {
    // user profile section states
    const [user, setUser] = useState({});
    const [userEdit, setUserEdit] = useState(false);
    const updateUserField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const handleUserEdit = (e) => {
        e.preventDefault();
        setUserEdit(!userEdit);
    }

    // update user data in database
    const handleUserSave = async (e) => {
        e.preventDefault();

        const currPetInfo = {
            dogName: pet.name,
            dogBreed: pet.breed,
            dogAge: pet.age,
            dogGender: pet.gender,
            dogHealthIssues: pet.healthIssues,
            dogDietRestrictions: pet.dietRestrictions
        }

        // fetch call to update user data
        const updateEndpoint = `${import.meta.env.VITE_BACKEND_URL}/users/update/${user.id}`;
        const headers = {
            "Content-type": 'application/json'
        };
        const payload = {
            ...currPetInfo,
            username: user.name,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            address: user.address
        };

        const response = await axios.put(updateEndpoint, payload, { headers: headers })
            .then(response => response.data)
            .catch((err) => {
                console.log(err);
            });

        const updatedUserInfo = {
            name: response.username,
            email: response.email,
            password: response.password,
            ext: "+1",
            phoneNumber: response.phoneNumber,
            address: response.address
        }
        setUser(updatedUserInfo);
        setUserEdit(!userEdit);
    }

    // pet profile section states
    const [pet, setPet] = useState({});
    const [petEdit, setPetEdit] = useState(false);

    const updatePetField = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPet({ ...pet, [name]: value });
    }

    const handlePetEdit = (e) => {
        e.preventDefault();
        setPetEdit(!petEdit);
    }

    // update pet data in database
    const handlePetSave = async (e) => {
        e.preventDefault();

        const currUserInfo = {
            username: user.name,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            address: user.address
        }

        // fetch call to update pet data
        const updateEndpoint = `${import.meta.env.VITE_BACKEND_URL}/users/update/${user.id}`;
        const headers = {
            "Content-type": 'application/json'
        };
        const payload = {
            ...currUserInfo,
            dogName: pet.name,
            dogBreed: pet.breed,
            dogAge: pet.age,
            dogGender: pet.gender,
            dogHealthIssues: pet.healthIssues,
            dogDietRestrictions: pet.dietRestrictions
        }
        const response = await axios.put(updateEndpoint, payload, { headers: headers })
            .then(response => response.data)
            .catch((err) => {
                console.log(err);
            });

        const updatedPetInfo = {
            name: response.dogName,
            breed: response.dogBreed,
            age: response.dogAge,
            gender: response.dogGender,
            healthIssues: response.dogHealthIssues,
            dietRestrictions: response.dogDietRestrictions
        }
        setPet(updatedPetInfo);
        setPetEdit(!petEdit);
    }

    useEffect(() => {
        const fetchUserProfile = async (email) => {
            const userProfileApi = `${import.meta.env.VITE_BACKEND_URL}/users/get/email/${email}`
            const headers = {
                "Content-type": 'application/json'
            };
            const response = await axios.get(userProfileApi, { headers: headers })
                .then(response => response.data)
                .catch((err) => {
                    console.log(err);
                });

            // user profile attributes
            const { id, username, password, phoneNumber, address } = response;
            const user = {
                id: id,
                name: username,
                email,
                password,
                ext: "+1",
                phoneNumber,
                address
            };
            setUser(user);

            // dog profile attributes
            const { dogName, dogBreed, dogAge, dogGender, dogHealthIssues, dogDietRestrictions } = response;
            const dog = {
                name: dogName,
                breed: dogBreed,
                age: dogAge,
                gender: dogGender,
                healthIssues: dogHealthIssues,
                dietRestrictions: dogDietRestrictions
            };
            setPet(dog);
        };

        const userEmail = localStorage.getItem('userEmail');
        fetchUserProfile(userEmail);
    }, []);

    return (
        <div className="container">
            <div id="userProfileCard">
                <h2>User Profile</h2>
                {
                    userEdit ?
                        <form>
                            <label>Name: </label>
                            <input type="text" name="name" value={user.name} onChange={(e) => updateUserField(e)} />
                            <br />
                            <label>Email: </label>
                            <input type="text" name="email" value={user.email} onChange={(e) => updateUserField(e)} />
                            <br />
                            <label>Password: </label>
                            <input type="password" name="password" value={user.password} onChange={(e) => updateUserField(e)} />
                            <br />
                            <label>Phone: </label>
                            <input type="text" name="ext" value={user.ext} onChange={(e) => updateUserField(e)} />
                            <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={(e) => updateUserField(e)} />
                            <br />
                            <label>Address: </label>
                            <input type="text" name="address" value={user.address} onChange={(e) => updateUserField(e)} />
                            <br />
                            <button onClick={handleUserSave}>Save</button>
                        </form>
                        :
                        <div>
                            <label>Name: </label>
                            <input type="text" name="name" disabled value={user.name} />
                            <br />
                            <label>Email: </label>
                            <input type="text" name="email" disabled value={user.email} />
                            <br />
                            <label>Password: </label>
                            <input type="password" name="password" disabled value={user.password} />
                            <br />
                            <label>Phone: </label>
                            <input type="text" name="ext" disabled value={user.ext + " " + user.phoneNumber} />
                            <br />
                            <label>Address: </label>
                            <input type="text" name="address" disabled value={user.address} />
                            <br />
                            <button onClick={handleUserEdit}>Edit</button>
                        </div>
                }
            </div>
            <div id="petProfileCard">
                <h2>Pet Profile</h2>
                {
                    petEdit ?
                        <form>
                            <label>Name: </label>
                            <input type="text" name="name" value={pet.name} onChange={updatePetField} />
                            <br />
                            <label>Breed: </label>
                            <input type="text" name="breed" value={pet.breed} onChange={updatePetField} />
                            <br />
                            <label>Age: </label>
                            <input type="text" name="age" value={pet.age} onChange={updatePetField} />
                            <br />
                            <label>Gender: </label>
                            <input type="text" name="gender" value={pet.gender} onChange={updatePetField} />
                            <br />
                            <label>Health issues: </label>
                            <input type="text" name="healthIssues" value={pet.healthIssues} onChange={updatePetField} />
                            <br />
                            <label>Dietary Restrictions: </label>
                            <input type="text" name="dietRestrictions" value={pet.dietRestrictions} onChange={updatePetField} />
                            <br />
                            <button onClick={handlePetSave}>Save</button>
                        </form>
                        :
                        <div>
                            <label>Name: </label>
                            <input type="text" name="name" disabled value={pet.name} />
                            <br />
                            <label>Breed: </label>
                            <input type="text" name="breed" disabled value={pet.breed} />
                            <br />
                            <label>Age: </label>
                            <input type="text" name="age" disabled value={pet.age} />
                            <br />
                            <label>Gender: </label>
                            <input type="text" name="gender" disabled value={pet.gender} />
                            <br />
                            <label>Health issues: </label>
                            <input type="text" name="healthIssues" disabled value={pet.healthIssues} />
                            <br />
                            <label>Dietary Restrictions: </label>
                            <input type="text" name="dietRestrictions" disabled value={pet.dietRestrictions} />
                            <br />
                            <button onClick={handlePetEdit}>Edit</button>
                        </div>
                }
            </div>
        </div>
    );
}

export default Profile;