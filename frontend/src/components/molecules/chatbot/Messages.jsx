import React from 'react'

const Message = ({ messageDetails }) => {
    const styles = {
        messageBody: {
            width: "75%",
            textAlign: `${messageDetails.isBot ? "left" : "right"}`,
            background: `${messageDetails.isBot ? "#a8cba8" : "#f3d7b5"}`,
            padding: "5px",
            margin: `5px ${messageDetails.isBot ? "auto" : "0"} 5px ${messageDetails.isBot ? "0" : "auto"}`,
            borderRadius: "5px",
        },
        messageFooter: {
            display: "flex",
            justifyContent: "space-between",
            flexDirection: `${messageDetails.isBot ? "row" : "row-reverse"}`
        }
    }

    return (
        <div style={styles.messageBody}>
            <p style={{ fontWeight: "bold" }}>{messageDetails.message}</p>
            <div style={styles.messageFooter}>
                <span>{messageDetails.isBot ? "Bot" : null}</span>
                <span>{messageDetails.time}</span>
            </div>
        </div>
    )
}

export default Message;