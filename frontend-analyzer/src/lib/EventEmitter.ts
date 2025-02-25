
 type Listener = (data: any) => void;
export class EventEmitter<T> {
    
    private events: { [event: string]: Listener[] } = {};
    
  on(event: string, listener: Listener): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event: string, data: T): void {
  
    const listeners = this.events[event];
    console.log(listeners)
    if (listeners) {
      listeners.forEach((listener) => listener(data));
    }
  }

  off(event: string, listenerToRemove: Listener): void {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
  }
}

