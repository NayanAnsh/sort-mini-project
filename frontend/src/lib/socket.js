// src/lib/socket.js
import { io } from 'socket.io-client';

class SocketManager {
  constructor() {
    this.socket = null;
    this.eventQueue = [];
    this.topicQueue = [];
    this.isConnected = false;
    this.bufferSize = 3; // size to keep as buffer , increase its value if network congestion
  }
  
  async connect() {
    if (!this.socket) {
      console.log("Connecting...")
      this.socket =  io('http://localhost:5000/', {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        transports: ['websocket']
      });
      this.socket.on('connect', () => {
        this.isConnected = true;
        this.flushQueue();
      });
      
      this.socket.on('disconnect', () => {
        this.isConnected = false;
      });
    }
    console.log("Connection is there")
    return this.socket;
  }
  buildButtonClickEvent(componentName){
      return { event:"Button",
        payload:{
          type :"BUTTON_CLICK",
          component:componentName,
          timeStamp: Date.now()
        }
      } 
  }
  buildSiteChangeEvent(location){ // expects location hook context 
    return { event:"Site",
      payload:{
        type :"Site_switch",
        hash:location.hash,
        current:location.pathname,
        params:location.search,
        timeStamp: Date.now()
      }
    } 
  }

  trackEvent(event,payload) {
    this.eventQueue.push(payload);
    this.flushQueue(event);
  }

  flushQueue(event) {
    if (this.isConnected && this.eventQueue.length >= this.bufferSize) {
      console.log("Message sent ")
      console.log(this.eventQueue)
      this.socket.emit(event, this.eventQueue,()=>this.eventQueue = []);
      
    }
  }
}

export const socketManager = new SocketManager();
