
export type CARD_TYPE = 'black' | 'white';

export interface CardModel {
    id: string;
    type: CARD_TYPE;
    text: string;
}
