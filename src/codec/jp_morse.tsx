import { morse_table } from './code_table';
import { Codec } from './interface';
import { zenkaku_to_hankaku, katakana_to_hiragana } from './utils';

// 和文モールス符号のコーデック
export class JpMorseCodec implements Codec {
    name = "Morse code (JP)";
    // エンコード
    encode(input: string): string {
        const unified_text = katakana_to_hiragana(zenkaku_to_hankaku(input)).normalize("NFD").toUpperCase();
        const chars = unified_text.split("");
        const morses = [];
        const delimiter = ["(", ")"];
        for (let t = false, i = chars.includes(delimiter[0]) ? chars.indexOf(delimiter[0]) : chars.length; chars.length !== 0; t = !t, i = chars.includes(delimiter[Number(t)]) ? chars.indexOf(delimiter[Number(t)]) : chars.length) {
            morses.push(...chars.splice(0, i).map(e => (t ? morse_table.intl : morse_table.jp).find(([k,]) => (k === e))?.[1] ?? "⛝"));
        }
        const morse_text = morses.join(" ");
        return morse_text.replace(/ *\n */g, "\n").trim();
    }
    // デコード
    decode(input: string): string {
        const unified_text = input.toUpperCase();
        const morses = unified_text.replace(/\n/g, " \n ").split(" ");
        const chars = [];
        const delimiter = ["-·--·-", "·-··-·"];
        for (let t = false, i = morses.includes(delimiter[0]) ? morses.indexOf(delimiter[0]) : morses.length; morses.length !== 0; t = !t, i = morses.includes(delimiter[Number(t)]) ? morses.indexOf(delimiter[Number(t)]) : morses.length) {
            chars.push(...morses.splice(0, i).map(e => (t ? morse_table.intl : morse_table.jp).find(([, k]) => (k === e))?.[0] ?? "⛝"));
        }
        const text = chars.join("");
        return text.normalize("NFC").replace(/ *\n */g, "\n").trim();
    }
}
