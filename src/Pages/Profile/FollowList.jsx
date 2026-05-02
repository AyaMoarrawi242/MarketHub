import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, ArrowLeft } from "lucide-react";
import { useFollow } from "../../Hooks/useFollow";
import FollowButton from "../../Components/Common/FollowButton";

const FollowList = ({ type = "followers" }) => {
  const { followers, following, fetchFollows } = useFollow();
  const [activeTab, setActiveTab] = useState(type);

  useEffect(() => {
    fetchFollows();
  }, [fetchFollows]);

  const users = activeTab === "followers" ? followers : following;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/profile" className="p-2 hover:bg-light-muted dark:hover:bg-dark-bg rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-light-text dark:text-dark-text" />
        </Link>
        <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">المتابعون</h1>
      </div>

      <div className="flex gap-2 mb-6 bg-light-muted dark:bg-dark-bg p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("followers")}
          className={`flex-1 py-2 px-4 rounded-md font-bold text-sm transition-all ${
            activeTab === "followers"
              ? "bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text shadow"
              : "text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text"
          }`}
        >
          متابعوني ({followers.length})
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`flex-1 py-2 px-4 rounded-md font-bold text-sm transition-all ${
            activeTab === "following"
              ? "bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text shadow"
              : "text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text"
          }`}
        >
          أنا أتابع ({following.length})
        </button>
      </div>

      <div className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border divide-y divide-light-border dark:divide-dark-border">
        {users.length === 0 ? (
          <div className="text-center py-12 text-light-muted dark:text-dark-muted font-bold">
            {activeTab === "followers" ? "لا يوجد أحد يتابعك بعد" : "لا تتابع أحداً بعد"}
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4">
              <Link to={`/user/${user.id}`} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-light-muted dark:bg-dark-bg rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-light-muted dark:text-dark-muted" />
                </div>
                <div>
                  <p className="font-bold text-light-text dark:text-dark-text">{user.name}</p>
                  <p className="text-sm text-light-muted dark:text-dark-muted">{user.email}</p>
                </div>
              </Link>
              <FollowButton targetUserId={user.id} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FollowList;
