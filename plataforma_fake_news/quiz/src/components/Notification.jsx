import React, { useState, useEffect } from 'react'
import { Toaster, toast } from "react-hot-toast"
import { useMessage } from './useMessage'

const Notification = () => {
    const { solicitarNoticacao, onMessageListener } = useMessage()
    const [notification, setNotification] = useState({ title: "", body: "" })

    useEffect(() => {
        // Pedir permissão assim que o componente carregar
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                console.log("Permissão concedida para notificações!")
                solicitarNoticacao();  // Se a permissão for concedida, solicita notificações
            } else {
                console.log("Permissão negada para notificações.")
            }
        })

        onMessageListener().then(payload => {
            setNotification({
                title: payload?.notification?.title,
                body: payload?.notification?.body
            })
        }).catch(err => console.log("Erro ao receber mensagem: ", err))
        
    }, [])

    return (
        <div><Toaster /></div>
    )
}

export default Notification
