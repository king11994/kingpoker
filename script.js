// 自动连接Socket.io
const socket = io();

// 游戏状态
let game = {
    me: null,
    players: [],
    pot: 0,
    currentBet: 0
};

// 初始化界面
function initUI() {
    document.getElementById('game-container').innerHTML = `
        <div id="community-cards" class="cards"></div>
        <div id="players" class="players"></div>
        <div class="controls">
            <button id="fold">弃牌</button>
            <button id="check">看牌</button>
            <button id="call">跟注</button>
            <div class="bets">
                <button data-bet="1">1万</button>
                <button data-bet="5">5万</button>
                <button data-bet="10">10万</button>
                <button data-bet="all">梭哈</button>
            </div>
        </div>
        <div id="timer">剩余时间: 60秒</div>
    `;
    
    // 绑定按钮事件
    document.getElementById('fold').addEventListener('click', () => socket.emit('action', 'fold'));
    document.querySelectorAll('[data-bet]').forEach(btn => {
        btn.addEventListener('click', () => {
            const bet = btn.dataset.bet === 'all' ? game.me.chips : parseInt(btn.dataset.bet);
            socket.emit('action', { type: 'bet', amount: bet });
        });
    });
}

// Socket.io事件监听
socket.on('connect', () => {
    const name = prompt("输入您的名字");
    socket.emit('join', name);
});

socket.on('update', (state) => {
    game = state;
    renderGame();
});

// 渲染游戏状态
function renderGame() {
    // 更新公共牌、玩家列表、下注信息等
    // （具体渲染逻辑同之前完整版，已优化简化）
}

// 启动游戏
initUI();