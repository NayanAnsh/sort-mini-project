import { Stream } from "./Stream";

export interface buttonData{
    type:string,
    component:string,
    timeStamp:number
}

 class ButtonStream  extends Stream<buttonData> {
    constructor(){
        super("buttonEvent");
    }
    
}

export const buttonStream = new ButtonStream();
// console.log(s.safeParse(sample));