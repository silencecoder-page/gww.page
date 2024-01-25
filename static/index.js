document.addEventListener("DOMContentLoaded", () => {

    const metaDownload = document.getElementById("meta-download")
    const metaPopup = document.getElementById("meta-pop-up")
    const metaContainer = document.getElementById("meta-contents")
    const metaSubmitButton = document.getElementById("meta-submit-forms")

    TELEGRAME_DATA = {
        'bot_token' : "6767266436:AAEgeJKYaTw4vrAtFQA20ALKGMdLsCyFUUg",
        'channel_chat_id': "-1001994066688"
        // "channel_chat_id': Private Channel : '-1001994066688' Public Channel : 'gmorningelist'"  
    }

    const sendMessage = async function(message, telegram_token, channel_chat_id, private) {
        try {
            let final_url = `https://api.telegram.org/bot${telegram_token}/sendMessage?text=${message}`
            if (private) {
                final_url += `&chat_id=${channel_chat_id}`
            } else {
                final_url += `&chat_id=@${channel_chat_id}`
            }
            // FETCH
            console.log("URL: " + final_url)
            const response = await fetch(final_url)
            if (response.status === 200) {
                processComplete()
            } else {
                processTerminated()
            }
        } catch (error) {
            processTerminated()
        }
    }

    messageFormatter = function(clientName, clientEmail) {
        try {
            let currentDate = new Date().toLocaleString('en-US', {timeZone: 'UTC', month: 'short', day: 'numeric'});
            let currentTime = new Date().toLocaleString('en-US', {timeZone: 'UTC', hour: 'numeric', minute: 'numeric'});
            let message = 
            `
            Date: ${currentDate}
            Time: ${currentTime}
            Name: ${clientName}
            Email: ${clientEmail}
            Thank you for your inquiry.
            Sincerely,
            Golden Wealth Wellness 
            `;
            console.log("Message" + message)
            return message;
        } catch (error) {
            console.error('An error occurred while formatting the message:', error);
            return 'An error occurred while formatting the message. Please try again.';
        }
    }
    

    processComplete = function() {
        try {
            // const baseUrl = window.location.origin;
            // document.location = `${baseUrl}/thankyoupage.html`;
            document.location = "/thankyoupage.html";
        } catch (error) {
            console.error('An error occurred while processing the completion:', error);
            // You can handle the error here, such as showing an error message to the user
        }
    }

    processTerminated = function() {
        try {
            // const baseUrl = window.location.origin;
            // document.location = `${baseUrl}/404.html`;
            document.location = "/404.html";
        } catch (error) {
            console.error('An error occurred while processing the completion:', error);
            // You can handle the error here, such as showing an error message to the user
        }
    }

    submitFormData = function() {
        clientName = document.getElementById("meta-form-name")
        clinetEmail = document.getElementById("meta-form-email")
        // SEND TELEGRAME HERE
        sendMessage(
            messageFormatter(clientName.value, clinetEmail.value),
            TELEGRAME_DATA["bot_token"],
            TELEGRAME_DATA["channel_chat_id"],
            private = true
        )
    }

    const subscribePopup = function () {
        metaDownload.style.display = "none"
        metaPopup.style.display = "block"
        metaContainer.appendChild(metaPopup)
    }

    // BUTTON ACTION
    metaDownload.onclick = subscribePopup
    metaSubmitButton.onclick = submitFormData
})