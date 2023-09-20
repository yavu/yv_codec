// コーデックのインターフェース
export interface Codec {
    name: string;
    encode(input: string): string;
    decode(input: string): string;
}
