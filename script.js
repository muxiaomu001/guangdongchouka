/**
 * 多省份城市抽卡程序
 * @author Claude
 * @version 1.6
 */

// 程序版本号
const VERSION = 'v1.6';

// 各省份城市数据
const provincesData = {
    guangdong: {
        name: '广东省',
        cities: [
            '广州市', '深圳市', '珠海市', '汕头市', '佛山市', 
            '韶关市', '湛江市', '肇庆市', '江门市', '茂名市', 
            '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', 
            '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市'
        ]
    },
    jiangxi: {
        name: '江西省',
        cities: [
            '南昌市', '景德镇市', '萍乡市', '九江市', '新余市',
            '鹰潭市', '赣州市', '吉安市', '宜春市', '抚州市', '上饶市'
        ]
    },
    guangxi: {
        name: '广西壮族自治区',
        cities: [
            '南宁市', '柳州市', '桂林市', '梧州市', '北海市',
            '防城港市', '钦州市', '贵港市', '玉林市', '百色市',
            '贺州市', '河池市', '来宾市', '崇左市'
        ]
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const resetBtn = document.getElementById('reset-btn');
    const resultElement = document.getElementById('result');
    const versionElement = document.getElementById('version');
    const resultModal = document.getElementById('result-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const confirmBtn = document.getElementById('confirm-btn');
    const provinceNameElement = document.getElementById('province-name');
    const provinceBtns = document.querySelectorAll('.province-btn');
    
    // 设置版本号
    versionElement.textContent = VERSION;
    
    // 当前选中的省份
    let currentProvince = 'guangdong';
    
    // 是否正在抽卡
    let isDrawing = false;
    // 所有卡片元素
    let cards = [];
    
    // 初始化卡片
    initCards();
    
    // 省份按钮点击事件
    provinceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isDrawing) return;
            
            const province = btn.dataset.province;
            if (province === currentProvince) return;
            
            // 更新按钮状态
            provinceBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 更新当前省份
            currentProvince = province;
            
            // 更新省份名称
            provinceNameElement.textContent = provincesData[currentProvince].name;
            
            // 重置卡片
            resetCards();
        });
    });
    
    // 关闭弹窗按钮点击事件
    closeModalBtn.addEventListener('click', () => {
        resultModal.classList.remove('show');
    });
    
    // 点击弹窗外部关闭弹窗
    resultModal.addEventListener('click', (e) => {
        if (e.target === resultModal) {
            resultModal.classList.remove('show');
        }
    });
    
    // 确认按钮点击事件
    confirmBtn.addEventListener('click', () => {
        // 隐藏弹窗
        resultModal.classList.remove('show');
        
        // 重置卡片
        resetCards();
    });
    
    /**
     * 初始化卡片
     */
    function initCards() {
        cardContainer.innerHTML = '';
        cards = [];
        
        // 获取当前省份的城市
        const cities = provincesData[currentProvince].cities;
        
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
        
        // 重置卡片
        resetCards();
    });
    
    /**
     * 重置所有卡片
     */
    function resetCards() {
        if (isDrawing) return;
        
        // 添加重置动画
        cardContainer.classList.add('shuffling');
        
        // 延迟后重新初始化卡片
        setTimeout(() => {
            // 重置所有卡片
            initCards();
            
            // 重置结果
            resultElement.textContent = '尚未抽卡';
            
            // 移除动画类
            cardContainer.classList.remove('shuffling');
            
            // 隐藏弹窗
            resultModal.classList.remove('show');
        }, 500);
    }
    
    /**
     * 抽取卡片
     * @param {HTMLElement} card - 要抽取的卡片元素
     */
    function drawCard(card) {
        isDrawing = true;
        resetBtn.disabled = true;
        resultElement.textContent = '抽卡中...';
        
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
            
            // 显示结果弹窗
            setTimeout(() => {
                resultModal.classList.add('show');
            }, 500);
            
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