/**
 * 广东省城市抽奖程序 - 单张翻牌版
 * @author Claude
 */

// 广东省所有城市
const cities = [
    '广州市', '深圳市', '珠海市', '汕头市', '佛山市', 
    '韶关市', '湛江市', '肇庆市', '江门市', '茂名市', 
    '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', 
    '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市'
];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const resetBtn = document.getElementById('reset-btn');
    const resultElement = document.getElementById('result');
    
    // 是否正在抽奖
    let isDrawing = false;
    // 所有卡片元素
    let cards = [];
    
    // 初始化卡片
    initCards();
    
    /**
     * 初始化卡片
     */
    function initCards() {
        cardContainer.innerHTML = '';
        cards = [];
        
        // 随机打乱城市顺序
        const shuffledCities = shuffleArray([...cities]);
        
        // 创建所有城市的卡片
        shuffledCities.forEach((city, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.city = city;
            
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">?</div>
                    <div class="card-back">${city}</div>
                </div>
            `;
            
            // 添加点击事件
            card.addEventListener('click', () => {
                if (isDrawing || card.classList.contains('flipped')) return;
                
                // 抽取这张卡片
                drawCard(card);
            });
            
            cardContainer.appendChild(card);
            cards.push(card);
        });
    }
    
    /**
     * 重置按钮点击事件
     */
    resetBtn.addEventListener('click', () => {
        if (isDrawing) return;
        
        // 添加重置动画
        cardContainer.classList.add('shuffling');
        
        // 延迟后重新初始化卡片
        setTimeout(() => {
            // 重置所有卡片
            initCards();
            
            // 重置结果
            resultElement.textContent = '尚未抽奖';
            
            // 移除动画类
            cardContainer.classList.remove('shuffling');
        }, 500);
    });
    
    /**
     * 抽取卡片
     * @param {HTMLElement} card - 要抽取的卡片元素
     */
    function drawCard(card) {
        isDrawing = true;
        resetBtn.disabled = true;
        resultElement.textContent = '抽奖中...';
        
        // 添加动画效果
        card.classList.add('selecting');
        
        // 延迟后翻开卡片
        setTimeout(() => {
            // 移除选择动画
            card.classList.remove('selecting');
            
            // 翻开卡片
            card.classList.add('flipped', 'selected');
            
            // 显示结果
            const selectedCity = card.dataset.city;
            resultElement.textContent = selectedCity;
            
            // 恢复按钮状态
            resetBtn.disabled = false;
            isDrawing = false;
        }, 1000);
    }
    
    /**
     * 随机打乱数组
     * @param {Array} array - 要打乱的数组
     * @returns {Array} 打乱后的数组
     */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}); 