export interface Qod {
    contents: SubContent;
    success: SuccessIFace;
}
interface SuccessIFace {
    total: number;
}
interface SubContent {
    quotes: SubQuote[];
    copyright: string;
}
interface SubQuote {
    quote: string;
    author: string;
    length: string;
    tags: Array<string>;
    category: string;
    title: string;
    date: string;
    id: string;
}

export interface Weather {
    [x: string]: any;

}