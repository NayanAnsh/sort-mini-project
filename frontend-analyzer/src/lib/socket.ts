// src/lib/socket.js
import { io, Socket } from 'socket.io-client';
import { buttonStream } from './ButtonStream';
import { siteStream } from './SiteStream';
import { mouseStream } from './mouseStream';

class SocketManager {
  socket: Socket;
  eventQueue: never[];
  topicQueue: never[];
  isConnected: boolean;
  bufferSize: number;
  private listenerSetup:boolean;
  constructor() {
    console.log("Connecting...")
      this.socket =  io('http://localhost:5500/', {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        transports: ['websocket']
      });
    this.eventQueue = [];
    this.topicQueue = [];
    this.listenerSetup = false;
    this.isConnected = false;
    this.bufferSize = 3; // size to keep as buffer , increase its value if network congestion
    this.socket.on('message', (data) => {
      console.log(data)
    });
  }
  
  async connect() {
    if (!this.socket) {
      console.log("Connecting...")
      this.socket =   io('http://localhost:5000/', {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        transports: ['websocket']
      });
      this.socket.on('connect', () => {
        this.isConnected = true;
      });
      
      this.socket.on('disconnect', () => {
        this.isConnected = false;
      });
    }
    this.setupEventListeners();

    
    console.log("Connection is there")
    return this.socket;
  }
  private setupEventListeners() {
    if (!this.listenerSetup) {
      console.log("listener established ")
      this.socket.on("Buttons", (data: string) => {
        buttonStream.add(data);
      });
      this.socket.on("Site", (data: string) => {
        siteStream.add(data);
      });
      this.socket.on("Mouse", (data: string) => {
        mouseStream.add(data);
      });
      this.listenerSetup = true;
    }
  }

}

export const socketManager = new SocketManager();
