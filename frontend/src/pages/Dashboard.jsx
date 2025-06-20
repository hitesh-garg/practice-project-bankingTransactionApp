import { Appbar } from "../components/Appbar"
import { Users } from "../components/Users"
import { Balance } from "../components/Balance"
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const Dashboard = ()=> {

    const[balance , setBalance] = useState(null);

    useEffect(() =>{
        const token = localStorage.getItem("token");

        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then((response) => {
            setBalance(response.data.balance);
        }).catch((err) => {
            console.error("Failed to fetch balance" , err);
            setBalance("Error");
        })
    } , []);

    

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance !== null ? `₹${balance.toFixed(2)}` : "Loading..."} />
            <Users />
        </div>
    </div>
}
