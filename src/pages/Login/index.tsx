import { useState } from "react";
import Registration from "../../components/Registration";
import Login from "../../components/Login";
export default function LoginPage() {

    const [activeTab, setActiveTab] = useState<'register' | 'login'>('login');
    return (
        <div className="registration_container">
            {(activeTab == "register") ? (
                <Registration />
            ) : (
                <>
                <Login />
                </>
            )}
            <div className="registration">
                <button onClick={()=>setActiveTab("login")}>Войти</button>
                <button onClick={()=>setActiveTab("register")}>Зарегистрироваться</button>
            </div>

        </div>
    )
}