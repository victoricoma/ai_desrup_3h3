import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useState, useEffect } from 'react';
import { app } from "../firebase/config";

export const useMessage = () => {
    const [message, setMessage] = useState("");

    const messaging = getMessaging(app);

    function solicitarNoticacao() {
        Notification.requestPermission().then((permission) => {
            console.log("Permissão de notificação:", permission); // Verificar a permissão
            if (permission === "granted") {
                console.log("Permissão concedida, buscando token...");

                getToken(messaging, {
                    vapidKey: 'BLfXC3zTmk9Vec55d2tWB0qdj4DaU03Ph4FlcZWLtZO7JfUSNDwuuqzXal4VmEAh759XL-9WAJXeP_GKzLwjyiQ'
                })
                    .then((currentToken) => {
                        if (currentToken) {
                            console.log("Client Token:", currentToken); // Verifica se o token foi obtido corretamente
                            setMessage(currentToken); // Armazena o token na variável de estado
                        } else {
                            console.log('Nenhum token disponível. Por favor, solicite permissão para gerar um token.');
                        }
                    })
                    .catch((err) => {
                        console.error('Erro ao buscar o token do FCM:', err); // Mostra erros no console
                    });
            } else {
                console.log("Permissão para notificações não foi concedida.");
            }
        });
    }

    const onMessageListener = () => {
        return new Promise(resolve => {
            onMessage(messaging, payload => {
                console.log("Mensagem recebida:", payload); // Log da mensagem recebida
                resolve(payload);
            });
        });
    };

    // Chama a função solicitarNoticacao no início
    useEffect(() => {
        solicitarNoticacao();
    }, []);

    return {
        solicitarNoticacao,
        onMessageListener,
        message
    };
};
