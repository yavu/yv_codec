// 片仮名を平仮名に変換
export function katakana_to_hiragana(str: string): string {
    return str.normalize("NFD").replace(/[\u30A1-\u30F6]/g, function (match) {
        return String.fromCharCode(match.charCodeAt(0) - 96).normalize("NFC");
    });
}
// 全角の英数字と記号を半角に変換
export function zenkaku_to_hankaku(str: string): string {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９（）]/g, function (match) {
        return String.fromCharCode(match.charCodeAt(0) - 65248);
    });
}
