import { EventEmitter } from "./EventEmitter";
export type StreamItem<T> = {key: number} & T;
export type StreamList<T> = Array<StreamItem<T>>;

export class Stream<T> extends EventEmitter<Array<{key:number}&T>> {
  protected readonly streamList: Array<{key:number}&T>;
  readonly eventString: string;

  constructor(eventString: string) {
    super();
    this.streamList = [];
    this.eventString = eventString;
  }

  safeParse(input: string): T {
    console.log(input);
    return JSON.parse(input);
  }

  add(input: string) {
    const parsedInput:T = this.safeParse(input);
    this.streamList.push({key:this.streamList.length, ...parsedInput});
    console.log("Emitting", this.streamList);
    this.emit(this.eventString, [...this.streamList]);
  }

  registerforEvents(listener: (data: Array<{key:number}&T>) => void) {
    this.on(this.eventString, listener);
  }

  deRegisterForEvents(listener: (data: Array<{key:number}&T>) => void) {
    this.off(this.eventString, listener);
  }

  getList() {
    return [...this.streamList];
  }
}