import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login",{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });


      console.log(response);
      if(response.ok){
       const res_data = await response.json();
        // console.log('response from server' , res_data);
        storeTokenInLS(res_data.token);
        setUser({email: "", password: ""});
      }
      else{
        alert("invalid ");
      }
      
    } catch (error) {
      console.log("login",error);
    }
    // navigate("/"); 
  };

  // handle input field value changes
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/Register.jpg"
                  alt="a nurse with a cute look"
                  width="340"
                  height="350"
                />
              </div>
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="Password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
