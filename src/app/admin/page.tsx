"use client";

import { useState, FormEvent } from "react";
import { sendMail } from "@/actions/sendEmail";

export default function Admin() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMail(email);
  };

  return (
    <div>
      <h1>Welcome! admin.</h1>
      <p>Invite members</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            className="border-[1px] border-slate-300 outline-[1px] outline-slate-500"
            type="text"
            id="name"
            name="name"
            placeholder="e.g: John"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            className="border-[1px] border-slate-300 outline-[1px] outline-slate-500"
            type="email"
            id="email"
            name="email"
            placeholder="e.g: John123@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="px-3 py-1 bg-slate-400 rounded-sm">
          Send Invite
        </button>
      </form>
    </div>
  );
}
