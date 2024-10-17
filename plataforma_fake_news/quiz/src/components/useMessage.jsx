import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useState, useEffect } from 'react'
import { app } from "../firebase/config"

export const useMessage = () => {
    const [message, setMessage] = useState("")

    const messaging = getMessaging(app);

    async function solicitarNoticacao() {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                alert("Obrigado pela permissão de notificação")
            }


            getToken(messaging, {
                vapidKey: 'BLfXC3zTmk9Vec55d2tWB0qdj4DaU03Ph4FlcZWLtZO7JfUSNDwuuqzXal4VmEAh759XL-9WAJXeP_GKzLwjyiQ'
            })
                .then((currentToken) => {
                    if (currentToken) {
                        console.log(messaging)
                        setMessage(messaging)
                    } else {
                        console.log('Deu ruim no token!')
                    }
                }).catch((err) => {
                    console.log('Erro cloud: ', err)
                });
        }
        )
    }

    const onMessageListener = () => {
        new Promise(resolve => {
            onMessage(messaging, payload => {
                resolve(payload)
            })
        })
    }

    return {
        solicitarNoticacao,
        onMessageListener,
        message
    }

}
