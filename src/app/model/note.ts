export interface Note{
    id: number;
    title: string;
    content: string;
    color: string;
    labels : String[];
    lastUpdated: string | Date;
    isHidden: boolean;

}