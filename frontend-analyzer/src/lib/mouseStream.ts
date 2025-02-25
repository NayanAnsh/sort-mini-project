import { Stream } from "./Stream";
export enum interactionTypeEnum  {"mousemove", "touchmove"}
export interface MouseData{
    type:string,
    x:number
    y:number,
    interactionType:interactionTypeEnum,
    timeStamp:number
}

 class MouseStream  extends Stream<MouseData> {
    constructor(){
        super("MouseEvent");
    }
    
}

export const mouseStream = new MouseStream();
// console.log(s.safeParse(sample));