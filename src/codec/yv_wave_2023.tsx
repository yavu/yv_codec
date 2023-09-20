import { yv_table } from './code_table';
import { Codec } from './interface';
import { zenkaku_to_hankaku, katakana_to_hiragana } from './utils';

// YV-Wave 2023のコーデック
export class YvWave2023Codec implements Codec {
    name = "YV-Wave 2023";
    // エンコード
    encode(input: string): string {
        const unified_text = katakana_to_hiragana(zenkaku_to_hankaku(input)).normalize("NFD").toUpperCase();
        const chars = unified_text.split("");
        const morses = chars.map(e => yv_table.yv_wave_2023.find(([k,]) => (k === e))?.[1] ?? "⛝");
        const code_text = morses.join(" ");
        return code_text.replace(/ *\n */g, "\n").trim();
    }
    // デコード
    decode(input: string): string {
        const unified_text = input.toUpperCase();
        const codes = unified_text.replace(/\n/g, " \n ").split(" ");
        const chars = codes.map(e => yv_table.yv_wave_2023.find(([, k]) => (k === e))?.[0] ?? "⛝");
        const text = chars.join("");
        return text.normalize("NFC").replace(/ *\n */g, "\n").trim();
    }
}
