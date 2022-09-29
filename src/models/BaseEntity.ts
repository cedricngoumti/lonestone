export default interface BaseEntity {
    id:number,
    createAt:string,
    active?:boolean,
    deleted?:boolean
}