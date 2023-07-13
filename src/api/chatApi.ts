import axios from "axios"
import { ChatMessageType, photosType, profileType, userType } from "../types/types"

type SubscriberType = (messages: ChatMessageType[]) => void

let subscribers = [] as Array<SubscriberType>

let ws: WebSocket | null = null;

const closeHandler = () => {
    console.error('CLOSE WS')
    setTimeout(createChanel, 3000)
}

const updateMessages = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

function createChanel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', updateMessages)
}


export const chatApi = {
    start() {
        createChanel()
    },
    stop() {
        subscribers = []
        ws?.close()
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', updateMessages)
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        // unsubscribe analog
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws ? ws.send(message) : console.error("NO WS CHANEL")
    }
}