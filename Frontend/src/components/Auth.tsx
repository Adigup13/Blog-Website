import { signupInput } from "blogwonders-common";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Auth = ({type}: {type: "signup" | "signin"})=>{
    const navigate = useNavigate();
    const [postInput, setpostInput] = useState<signupInput>({
        username: "",
        password:"",
        name:""
        
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInput);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e) {
            alert("Error while signing up")
            // alert the user here that the request failed
        }
    }
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                <div className="px-10">
            <div className="text-3xl font-extrabold">
                Create an account

            </div>
            <div className="text-gray-500 text-sm pl-4 pb-5">
                {type==="signin"? "Don't have a account" : "Already have a account"}
                <Link className="pl-1 underline"  to={type === "signin"? "/signup": "/signin"}>
                {type==="signin"? "Sign up" : "Sign in"}</Link>
            </div>

            </div>
     <div>
             {type==="signup"?<LabelledInput label= "Name" placeholder="Aditya Gupta...." onchange={(e)=>{
                setpostInput({
                    ...postInput,                           
                    name:e.target.value
                })
            }}></LabelledInput>: null}

           <LabelledInput label= "Username" placeholder="adityagup@.com" onchange={(e)=>{
                setpostInput({
                    ...postInput,                           
                    username:e.target.value 
                })
            }}></LabelledInput>

           <LabelledInput label= "Password" type={"password"} placeholder="qwerty@54" onchange={(e)=>{
                setpostInput({
                    ...postInput,                           
                    password:e.target.value
                })
            }}></LabelledInput>
            <button onClick={sendRequest  } type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5
             py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"? "sign up": "sign in"}</button>
            </div>
            </div>
          </div>
        </div>
    ) 
}
    interface LabelledData {
        label: string;
        placeholder: string; 
        onchange: (e: ChangeEvent<HTMLInputElement> )=> void;
        type?:string;
    }

function LabelledInput ({ label, placeholder, onchange , type}: LabelledData) {
    return <div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-Black">{label}</label>
            <input onChange={onchange} type={type ||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>

}