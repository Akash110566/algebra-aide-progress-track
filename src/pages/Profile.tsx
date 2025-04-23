
import React from "react";
import { Header } from "@/components/Header";
import { ProgressTracker } from "@/components/ProgressTracker";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-algebra-800 mb-8">Your Learning Profile</h1>
          <ProgressTracker />
        </div>
      </main>
    </div>
  );
};

export default Profile;
