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
export interface Address {
    "type": string,
    "licence": string,
    "features": [
        {
            "type": string,
            "properties": {
                "place_id": number,
                "osm_type": string,
                "osm_id": number,
                "place_rank": number,
                "category": string,
                "type": string,
                "importance": number,
                "addresstype": string,
                "name": string,
                "display_name": string,
                "address": {
                    "building": string,
                    "road": string,
                    "suburb": string,
                    "town": string,
                    "county": string,
                    "state_district": string,
                    "state": string,
                    "postcode": string,
                    "country": string,
                    "country_code": string,
                }
            },
            "bbox": [
                number,
                number,
                number,
                number,
            ],
            "geometry": {
                "type": string,
                "coordinates": [
                    number,
                    number,
                ]
            }
        }
    ]
}


export interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
    editing: boolean;
}