// サービス画像をクリック → 詳細ポップアップ（ネイティブの <dialog> を使用）
document.querySelectorAll("[data-dialog]").forEach((button) => {
  const dialog = document.getElementById(button.dataset.dialog);
  if (!dialog) return;

  button.addEventListener("click", () => dialog.showModal());

  // 背景（ダイアログの外側）クリックで閉じる
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    const inside =
      event.clientX >= r.left && event.clientX <= r.right &&
      event.clientY >= r.top && event.clientY <= r.bottom;
    if (!inside) dialog.close();
  });
});
