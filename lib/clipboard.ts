export function copyToClipboard(obj: any): void {
    // オブジェクトをJSON文字列に変換
    const jsonString = JSON.stringify(obj);

    // テキストエリアを作成し、値をセット
    const textarea = document.createElement('textarea');
    textarea.value = jsonString;

    // テキストエリアを非表示にするためのスタイル
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';

    // テキストエリアをDOMに追加
    document.body.appendChild(textarea);

    // テキストエリアを選択してコピー
    textarea.select();
    document.execCommand('copy');

    // テキストエリアを削除
    document.body.removeChild(textarea);
}