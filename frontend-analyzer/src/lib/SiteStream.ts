import { Stream } from "./Stream";

export interface siteData{
    type:string,
    hash:string,
    current:string,
    params:string
    timeStamp:number
}

 class SiteStream  extends Stream<siteData> {
    constructor(){
        super("SiteEvent");
    }
    
}

export const siteStream = new SiteStream();
// console.log(s.safeParse(sample));