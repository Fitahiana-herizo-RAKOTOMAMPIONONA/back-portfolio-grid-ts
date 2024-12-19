interface Iwork{
    title_work: string;
    description_work: string;
    file_url: string;
    date: string;
    type: string;
    status : string;
    team_members : Array<string>;
    visibility : string;
    technologies_used : Array<string>;
    rating  : number ;
    client_name : string; 
    progress : number;
    tags : Array<string>;

}
export default Iwork
