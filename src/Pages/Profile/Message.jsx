import React, { useState } from "react";
import { Send, ArrowRight, Search } from "lucide-react";

const MOCK_CONVERSATIONS = [
  {
    id: "c1",
    user: { name: "سارة علي", avatar: "S", lastSeen: "منذ 5 دقائق" },
    messages: [
      { id: 1, text: "هل الإعلان لا يزال متاحاً؟", sender: "them", time: "10:30 ص" },
      { id: 2, text: "نعم، متوفر!", sender: "me", time: "10:32 ص" },
      { id: 3, text: "هل يمكن التفاوض على السعر؟", sender: "them", time: "10:35 ص" },
    ],
  },
  {
    id: "c2",
    user: { name: "خالد حسن", avatar: "K", lastSeen: "متصل الآن" },
    messages: [
      { id: 1, text: "أرغب بشراء الكنب", sender: "them", time: "أمس" },
      { id: 2, text: "تفضل، أرسل التفاصيل", sender: "me", time: "أمس" },
    ],
  },
  {
    id: "c3",
    user: { name: "محمد أحمد", avatar: "M", lastSeen: "منذ ساعة" },
    messages: [
      { id: 1, text: "هل يمكن التوصيل إلى حمص؟", sender: "them", time: "منذ يومين" },
    ],
  },
];

const MessagePage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput.trim(),
      sender: "me",
      time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedChat.id
          ? { ...c, messages: [...c.messages, newMessage] }
          : c
      )
    );
    setMessageInput("");

    setSelectedChat((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  };

  const filteredConversations = conversations.filter((c) =>
    c.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl h-[calc(100vh-200px)]">
      <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg overflow-hidden h-full flex border border-light-border dark:border-dark-border">
        {/* Sidebar */}
        <div className={`w-full md:w-80 border-l border-light-border dark:border-dark-border ${selectedChat ? "hidden md:flex" : "flex"} flex-col bg-light-input dark:bg-dark-bg`}>
          <div className="p-4 border-b border-light-border dark:border-dark-border">
            <h2 className="text-lg font-bold text-light-text dark:text-dark-text mb-3">الرسائل</h2>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light-muted dark:text-dark-muted" />
              <input
                type="text"
                placeholder="بحث في الرسائل..."
                className="w-full pl-3 pr-9 py-2 border border-light-border dark:border-dark-border rounded-lg outline-none focus:ring-2 focus:ring-accent-main bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full p-4 border-b border-light-border/50 dark:border-dark-border/50 transition-colors text-right flex items-center gap-3 ${
                  selectedChat?.id === chat.id ? "bg-accent-main/10 dark:bg-accent-main/20" : "hover:bg-light-card dark:hover:bg-dark-card"
                }`}
              >
                <div className="w-10 h-10 bg-light-muted dark:bg-dark-bg rounded-full flex items-center justify-center text-light-text dark:text-dark-text font-bold flex-shrink-0">
                  {chat.user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-light-text dark:text-dark-text truncate">{chat.user.name}</h3>
                    <span className="text-xs text-light-muted dark:text-dark-muted">{chat.messages[chat.messages.length - 1]?.time}</span>
                  </div>
                  <p className="text-sm text-light-muted dark:text-dark-muted truncate mt-0.5">
                    {chat.messages[chat.messages.length - 1]?.text}
                  </p>
                  <span className="text-xs text-accent-main">{chat.user.lastSeen}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${!selectedChat ? "hidden md:flex" : "flex"}`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-light-border dark:border-dark-border flex items-center gap-3 bg-light-input dark:bg-dark-bg">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="md:hidden p-1 hover:bg-light-card dark:hover:bg-dark-card rounded transition-colors"
                >
                  <ArrowRight className="w-5 h-5 text-light-text dark:text-dark-text" />
                </button>
                <div className="w-8 h-8 bg-light-muted dark:bg-dark-bg rounded-full flex items-center justify-center text-light-text dark:text-dark-text font-bold text-sm">
                  {selectedChat.user.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-light-text dark:text-dark-text">{selectedChat.user.name}</h3>
                  <span className="text-xs text-accent-main">{selectedChat.user.lastSeen}</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-light-bg dark:bg-dark-bg">
                {selectedChat.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                        msg.sender === "me"
                          ? "bg-accent-main text-white rounded-br-sm shadow-md"
                          : "bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text rounded-bl-sm shadow-sm border border-light-border dark:border-dark-border"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span className={`text-xs mt-1 block ${msg.sender === "me" ? "text-white/70" : "text-light-muted dark:text-dark-muted"}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-light-border dark:border-dark-border bg-light-input dark:bg-dark-bg">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="اكتب رسالة..."
                    className="flex-1 px-4 py-2.5 border border-light-border dark:border-dark-border rounded-lg outline-none focus:ring-2 focus:ring-accent-main bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="px-4 py-2.5 bg-accent-main text-white rounded-lg hover:bg-accent-active disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-light-muted dark:text-dark-muted">
              <div className="text-center">
                <p className="text-lg font-bold">اختر محادثة لبدء المراسلة</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
