"use client"

import { useAuth } from "../state";

export default function Shop() {
    const { user, login, logout, user_id } = useAuth();
  return (
    <div className="main">
        <h1>Shop!</h1>
        <p>
        {user?"Logged in":"Log in!!"}
        </p>
    </div>
  )
}