import  BaseEntity from "./BaseEntity";

export interface Product extends BaseEntity {
    title:string,
    price:number,
    description:string,
    concentration:string,
}