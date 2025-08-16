// 顯示彈窗明細
function 顯示彈窗(元素) {
  const 幣種 = 元素.dataset.coin;
  const 金額 = 元素.querySelector('.金額文字')
    ? 元素.querySelector('.金額文字').textContent
    : 元素.dataset.amount + ' ' + 幣種;
  const 時間 = 元素.dataset.time;
  let 狀態 = 元素.dataset.status;
  const 索引 = 元素.dataset.index;

  // 狀態為處理中時，顯示「等待處理」和「說明▼」同一行
  let 狀態顯示 = 狀態;
  if (狀態 === "處理中") {
    狀態顯示 = `
      <span class="狀態等待處理">等待處理</span>
      <span class="說明">說明</span>
      <span class="下拉箭頭圖示2"></span>
    `;
  }
  if (狀態 === "完成") {
    狀態顯示 = `
      <span class="狀態完成">已完成</span>
      <span class="說明">說明</span>
      <span class="下拉箭頭圖示2"></span>
    `;
  }

  const 固定地址 = "TVJmnLKY1hgGL2ctXYhQysbw1nrP5i7uP";
  const 錢包地址 = 索引 === "0" ? 固定地址 : 隨機地址("T", 34);

  // 生成交易單號：年月日 + TW + 8位隨機數字
  function 生成交易單號(時間字串) {
    // 假設時間格式為 "YYYY-MM-DD HH:mm:ss"
    const datePart = 時間字串.split(' ')[0]; // "YYYY-MM-DD"
    const yyyy = datePart.slice(0, 4);
    const mm = datePart.slice(5, 7);
    const dd = datePart.slice(8, 10);
    // 隨機兩位大寫字母
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randLetters = letters[Math.floor(Math.random() * 26)] + letters[Math.floor(Math.random() * 26)];
    const randomNum = Math.floor(Math.random() * 90000000) + 10000000; // 8位
    return `${yyyy}${mm}${dd}${randLetters}${randomNum}`;
  }

  const 交易單號 = 生成交易單號(時間);

  const showChainType = 幣種 !== "TWD";

  const handlingFee = 幣種 === "TWD" ? "30" : "1.6";

  const 彈窗明細區 = document.getElementById("彈窗明細");
  彈窗明細區.innerHTML = `
    <div class="彈窗列 幣種顯示區塊">
      <img src="res/${幣種}.png" alt="${幣種}" class="Coin_Icon" />
      <span class="Coin_U">${幣種}</span>
    </div>
    <div class="交易總計">
      <span class="總計">總計</span>
      <span class="金額">${金額}</span>
      <div class="狀態 ${狀態}" style="display:flex;align-items:center;justify-content:center;gap:0;">
        ${狀態顯示}
      </div>
    </div>
    <div class="Deal_Info">
      <div class="Deal_Label">提領時間<span class="Deal_Label">${時間}</span></div>
      <div class="Deal_Label">交易單號<span class="Deal_Label" id="TransactionID">${交易單號}</span></div>
      ${showChainType ? `<div class="Deal_Label" id="ChainType">交易鏈種<span class="Deal_Label">TRC20</span></div>` : ""}
      <div class="Deal_Label">提領金額<span class="Deal_Label">${金額}</span></div>
      <div class="Deal_Label" id="HandlingFee">手續費<span class="Deal_Label">${handlingFee} ${幣種}</span></div>
    </div>
    <div class="Deal_Address">
    <div class="Deal_Label2">提領到</div>
    <div class="copy-container">
      <input type="text" class="copy-text" id="textToCopy" value="${錢包地址}" />
      <img src="res/Copy.png" class="copyh_box" />
      </div>
    </div>
      ${showChainType ? `<div class="Deal_Label2" id="TXID">TXID</div>
      <div class="copy-container">
        <span class="copy-text" id="textToCopy"></span>
        <img src="res/Copy.png" class="copyh_box"/></div>
      ` : ""}
      
    </div>
  `;

  // 顯示彈窗區塊與遮罩
  document.getElementById("提領彈窗").style.display = "block";
  document.getElementById("遮罩背景").style.display = "block";

  // 關閉彈窗
  document.getElementById("關閉彈窗").addEventListener("click", () => {
    document.getElementById("提領彈窗").style.display = "none";
    document.getElementById("遮罩背景").style.display = "none";
  });
}
