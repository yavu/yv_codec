import { morse_table } from './code_table';
import { Codec } from './interface';
import { zenkaku_to_hankaku } from './utils';

// 国際モールス符号のコーデック
export class IntlMorseCodec implements Codec {
    name = "Morse code (INTL)";
    // エンコード
    encode(input: string): string {
        const unified_text = zenkaku_to_hankaku(input).toUpperCase();
        const chars = unified_text.split("");
        const morses = chars.map(e => morse_table.intl.find(([k,]) => (k === e))?.[1] ?? "⛝");
        const morse_text = morses.join(" ");
        return morse_text.replace(/ *\n */g, "\n").trim();
    }
    // デコード
    decode(input: string): string {
        const unified_text = input.toUpperCase();
        const morses = unified_text.replace(/\n/g, " \n ").split(" ");
        const chars = morses.map(e => morse_table.intl.find(([, k]) => (k === e))?.[0] ?? "⛝");
        const text = chars.join("");
        return text.replace(/ *\n */g, "\n").trim();
    }
}
