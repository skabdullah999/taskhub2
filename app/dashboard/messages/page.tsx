"use client"

import { useState } from "react"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("conv-1")
  const [messageText, setMessageText] = useState("")
  
  // Sample conversations data
  const conversations = [
    {
      id: "conv-1",
      user: {
        name: "Support Team",
        avatar: "/placeholder.svg",
        initials: "ST",
        online: true,
      },
      lastMessage: {
        text: "Hello! How can we help you today?",
        time: "10:30 AM",
        isRead: true,
      },
      messages: [
        {
          id: "msg-1",
          sender: "them",
          text: "Hello! How can we help you today?",
          time: "10:30 AM",
        },
        {
          id: "msg-2",
          sender: "me",
          text: "Hi, I'm having an issue with a task submission. The advertiser rejected it but I followed all instructions.",
          time: "10:32 AM",
        },
        {
          id: "msg-3",
          sender: "them",
          text: "I understand that can be frustrating. Could you please provide the task ID so I can look into this for you?",
          time: "10:35 AM",
        },
        {
          id: "msg-4",
          sender: "me",
          text: "Sure, it's task-3. I completed the survey but they said my answers were too short.",
          time: "10:37 AM",
        },
        {
          id: "msg-5",
          sender: "them",
          text: "Thank you for providing that information. I've reviewed the task and the advertiser's feedback. For surveys, they typically expect detailed responses that show thought and consideration. Would you like me to ask if you can resubmit with more detailed answers?",
          time: "10:42 AM",
        },
      ],
    },
    {
      id: "conv-2",
      user: {
        name: "John Smith",
        avatar: "/placeholder.svg",
        initials: "JS",
        online: false,
      },
      lastMessage: {
        text: "Thanks for completing the task!",
        time: "Yesterday",
        isRead: true,
      },
      messages: [
        {
          id: "msg-1",
          sender: "them",
          text: "Hi there! I've posted a new task for YouTube video engagement. Would you be interested?",
          time: "Yesterday, 2:15 PM",
        },
        {
          id: "msg-2",
          sender: "me",
          text: "Hello! Yes, I'd be interested. What does the task involve exactly?",
          time: "Yesterday, 2:20 PM",
        },
        {
          id: "msg-3",
          sender: "them",
          text: "Great! It involves watching a 3-minute video, liking it, and leaving a thoughtful comment. The payment is $0.75.",
          time: "Yesterday, 2:25 PM",
        },
        {
          id: "msg-4",
          sender: "me",
          text: "Sounds good. I've just completed it and submitted the proof.",
          time: "Yesterday, 2:45 PM",
        },
        {
          id: "msg-5",
          sender: "them",
          text: "Thanks for completing the task! I've approved it and the payment should be in your account now.",
          time: "Yesterday, 3:00 PM",
        },
      ],
    },
    {
      id: "conv-3",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg",
        initials: "SJ",
        online: true,\
