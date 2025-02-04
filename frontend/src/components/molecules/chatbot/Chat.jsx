import React, { useState, useEffect, useRef } from 'react'
import { IoChatbubbleOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Message from './Messages';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
    const [openChat, setOpenChat] = useState(false);
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [sessionId, setSessionId] = useState("");
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, [messages]);

    const initChat = async () => {
        if (messages.length === 0) {
            try {
                const newSessionId = uuidv4();
                setSessionId(newSessionId);

                const chatEndpoint = `${import.meta.env.VITE_NODE_BACKEND_URL}/chat/send-message`;
                const headers = {
                    'Content-Type': 'application/json'
                };
                const initMessage = {
                    message: "hi",
                    sessionId: newSessionId
                }
                const response = await axios.post(chatEndpoint, initMessage, { headers });
                const botMessage = {
                    message: response.data.message,
                    time: new Date().toLocaleTimeString(),
                    isBot: true
                }
                setMessages([...messages, botMessage]);
            } catch (err) {
                console.error(err);
            }
        }

        setOpenChat(true);
    }

    const handleClose = () => {
        setOpenChat(false);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputMessage === "") {
            return;
        }

        const newMessage = {
            message: inputMessage,
            time: new Date().toLocaleTimeString(),
            isBot: false
        }
        setMessages(prevMessages => [...prevMessages, newMessage]);

        const chatEndpoint = `${import.meta.env.VITE_NODE_BACKEND_URL}/chat/send-message`;
        const headers = {
            'Content-Type': 'application/json'
        };

        let currSessionId = sessionId;
        if (currSessionId === "") {
            currSessionId = uuidv4();
            setSessionId(currSessionId);
        }

        const payload = {
            message: inputMessage,
            sessionId: currSessionId
        }

        try {
            const response = await axios.post(chatEndpoint, payload, { headers });
            let botMessage = {
                message: response.data.message,
                time: new Date().toLocaleTimeString(),
                isBot: true
            }
            if (response.data.status === "failed") {
                botMessage.message = "Sorry, I couldn't understand that. Please try again.";
            }
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (err) {
            console.error(err);
            alert("Failed to send message");
        }

        setInputMessage("");
    }

    return (
        <div style={styles.chatContainer}>
            {
                openChat ? (
                    <div style={styles.chatBox}>
                        <div style={styles.chatHeader}>
                            <div>
                                <IoChatbubbleOutline size={"14px"} />
                                <span style={{ margin: "10px", fontWeight: "bold" }}>Chatbot</span>
                            </div>
                            <IoIosCloseCircleOutline style={styles.chatClose} onClick={() => handleClose()} size={"25px"} />
                        </div>
                        <div ref={chatContainerRef} style={styles.chatBody}>
                            {
                                messages.sort((m1, m2) => m1.time < m2.time).map((message, index) => (
                                    <div key={index}>
                                        <Message messageDetails={message} />
                                    </div>
                                ))
                            }
                        </div>
                        <form onSubmit={handleSubmit} style={styles.inputForm}>
                            <input style={styles.inputBox} value={inputMessage} type="text" placeholder="Type a message" onChange={(e) => setInputMessage(e.target.value)} />
                            <button type='submit'>Send</button>
                        </form>
                    </div>
                ) : <IoChatbubbleEllipsesOutline style={styles.openChatButton} size={"40px"} onClick={() => initChat()} />
            }
        </div>
    )
}

const styles = {
    chatContainer: {
        position: "fixed",
        bottom: "20px",
        right: "25px",
        backgroundColor: "white",
        zIndex: "9999",
        borderRadius: "20px",
    },
    chatBox: {
        width: "20rem",
        border: "2px solid black",
        borderRadius: "20px",
        overflow: "hidden",
    },
    chatHeader: {
        display: "flex",
        justifyContent: "space-between",
        background: "#d8aa73",
        padding: "5px"
    },
    chatClose: {
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: "0px"
    },
    chatBody: {
        overflow: "scroll",
        height: "20rem",
        padding: "10px"
    },
    inputForm: {
        background: "#d8aa73",
        padding: "10px",
        display: "flex",
        borderTop: "1px solid black"
    },
    inputBox: {
        background: "white",
        color: "black",
        flexGrow: "1",
        border: "0px",
        margin: "0 5px"
    },
    openChatButton: {
        backgroundColor: "#d8aa73",
        cursor: "pointer",
        borderRadius: "30%",
    }
};

export default Chat;