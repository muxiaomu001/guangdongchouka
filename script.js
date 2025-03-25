/**
 * 全国省份城市抽卡程序
 * @author Claude
 * @version 1.7.1
 */

// 程序版本号
const VERSION = 'v1.7.1';

// 全国省份城市数据
const provincesData = {
    // 华北地区
    beijing: { name: '北京市', cities: ['东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '顺义区', '通州区', '大兴区', '房山区', '门头沟区', '昌平区', '平谷区', '密云区', '延庆区'] },
    tianjin: { name: '天津市', cities: ['和平区', '河东区', '河西区', '南开区', '河北区', '红桥区', '东丽区', '西青区', '津南区', '北辰区', '武清区', '宝坻区', '滨海新区', '宁河区', '静海区', '蓟州区'] },
    hebei: { name: '河北省', cities: ['石家庄市', '唐山市', '秦皇岛市', '邯郸市', '邢台市', '保定市', '张家口市', '承德市', '沧州市', '廊坊市', '衡水市'] },
    shanxi: { name: '山西省', cities: ['太原市', '大同市', '阳泉市', '长治市', '晋城市', '朔州市', '晋中市', '运城市', '忻州市', '临汾市', '吕梁市'] },
    neimenggu: { name: '内蒙古自治区', cities: ['呼和浩特市', '包头市', '乌海市', '赤峰市', '通辽市', '鄂尔多斯市', '呼伦贝尔市', '巴彦淖尔市', '乌兰察布市', '兴安盟', '锡林郭勒盟', '阿拉善盟'] },
    
    // 东北地区
    liaoning: { name: '辽宁省', cities: ['沈阳市', '大连市', '鞍山市', '抚顺市', '本溪市', '丹东市', '锦州市', '营口市', '阜新市', '辽阳市', '盘锦市', '铁岭市', '朝阳市', '葫芦岛市'] },
    jilin: { name: '吉林省', cities: ['长春市', '吉林市', '四平市', '辽源市', '通化市', '白山市', '松原市', '白城市', '延边朝鲜族自治州'] },
    heilongjiang: { name: '黑龙江省', cities: ['哈尔滨市', '齐齐哈尔市', '鸡西市', '鹤岗市', '双鸭山市', '大庆市', '伊春市', '佳木斯市', '七台河市', '牡丹江市', '黑河市', '绥化市', '大兴安岭地区'] },
    
    // 华东地区
    shanghai: { name: '上海市', cities: ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '奉贤区', '崇明区'] },
    jiangsu: { name: '江苏省', cities: ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市', '连云港市', '淮安市', '盐城市', '扬州市', '镇江市', '泰州市', '宿迁市'] },
    zhejiang: { name: '浙江省', cities: ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'] },
    anhui: { name: '安徽省', cities: ['合肥市', '芜湖市', '蚌埠市', '淮南市', '马鞍山市', '淮北市', '铜陵市', '安庆市', '黄山市', '滁州市', '阜阳市', '宿州市', '六安市', '亳州市', '池州市', '宣城市'] },
    fujian: { name: '福建省', cities: ['福州市', '厦门市', '莆田市', '三明市', '泉州市', '漳州市', '南平市', '龙岩市', '宁德市'] },
    jiangxi: { name: '江西省', cities: ['南昌市', '景德镇市', '萍乡市', '九江市', '新余市', '鹰潭市', '赣州市', '吉安市', '宜春市', '抚州市', '上饶市'] },
    shandong: { name: '山东省', cities: ['济南市', '青岛市', '淄博市', '枣庄市', '东营市', '烟台市', '潍坊市', '济宁市', '泰安市', '威海市', '日照市', '临沂市', '德州市', '聊城市', '滨州市', '菏泽市'] },
    
    // 华中地区
    henan: { name: '河南省', cities: ['郑州市', '开封市', '洛阳市', '平顶山市', '安阳市', '鹤壁市', '新乡市', '焦作市', '濮阳市', '许昌市', '漯河市', '三门峡市', '南阳市', '商丘市', '信阳市', '周口市', '驻马店市', '济源市'] },
    hubei: { name: '湖北省', cities: ['武汉市', '黄石市', '十堰市', '宜昌市', '襄阳市', '鄂州市', '荆门市', '孝感市', '荆州市', '黄冈市', '咸宁市', '随州市', '恩施土家族苗族自治州', '仙桃市', '潜江市', '天门市', '神农架林区'] },
    hunan: { name: '湖南省', cities: ['长沙市', '株洲市', '湘潭市', '衡阳市', '邵阳市', '岳阳市', '常德市', '张家界市', '益阳市', '郴州市', '永州市', '怀化市', '娄底市', '湘西土家族苗族自治州'] },
    
    // 华南地区
    guangdong: { name: '广东省', cities: ['广州市', '深圳市', '珠海市', '汕头市', '佛山市', '韶关市', '湛江市', '肇庆市', '江门市', '茂名市', '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市'] },
    guangxi: { name: '广西壮族自治区', cities: ['南宁市', '柳州市', '桂林市', '梧州市', '北海市', '防城港市', '钦州市', '贵港市', '玉林市', '百色市', '贺州市', '河池市', '来宾市', '崇左市'] },
    hainan: { name: '海南省', cities: ['海口市', '三亚市', '三沙市', '儋州市', '五指山市', '琼海市', '文昌市', '万宁市', '东方市', '定安县', '屯昌县', '澄迈县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'] },
    
    // 西南地区
    chongqing: { name: '重庆市', cities: ['万州区', '涪陵区', '渝中区', '大渡口区', '江北区', '沙坪坝区', '九龙坡区', '南岸区', '北碚区', '綦江区', '大足区', '渝北区', '巴南区', '黔江区', '长寿区', '江津区', '合川区', '永川区', '南川区', '璧山区', '铜梁区', '潼南区', '荣昌区', '开州区', '梁平区', '武隆区'] },
    sichuan: { name: '四川省', cities: ['成都市', '自贡市', '攀枝花市', '泸州市', '德阳市', '绵阳市', '广元市', '遂宁市', '内江市', '乐山市', '南充市', '眉山市', '宜宾市', '广安市', '达州市', '雅安市', '巴中市', '资阳市', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'] },
    guizhou: { name: '贵州省', cities: ['贵阳市', '六盘水市', '遵义市', '安顺市', '毕节市', '铜仁市', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'] },
    yunnan: { name: '云南省', cities: ['昆明市', '曲靖市', '玉溪市', '保山市', '昭通市', '丽江市', '普洱市', '临沧市', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州', '大理白族自治州', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州'] },
    xizang: { name: '西藏自治区', cities: ['拉萨市', '日喀则市', '昌都市', '林芝市', '山南市', '那曲市', '阿里地区'] },
    
    // 西北地区
    shaanxi: { name: '陕西省', cities: ['西安市', '铜川市', '宝鸡市', '咸阳市', '渭南市', '延安市', '汉中市', '榆林市', '安康市', '商洛市'] },
    gansu: { name: '甘肃省', cities: ['兰州市', '嘉峪关市', '金昌市', '白银市', '天水市', '武威市', '张掖市', '平凉市', '酒泉市', '庆阳市', '定西市', '陇南市', '临夏回族自治州', '甘南藏族自治州'] },
    qinghai: { name: '青海省', cities: ['西宁市', '海东市', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'] },
    ningxia: { name: '宁夏回族自治区', cities: ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市'] },
    xinjiang: { name: '新疆维吾尔自治区', cities: ['乌鲁木齐市', '克拉玛依市', '吐鲁番市', '哈密市', '昌吉回族自治州', '博尔塔拉蒙古自治州', '巴音郭楞蒙古自治州', '阿克苏地区', '克孜勒苏柯尔克孜自治州', '喀什地区', '和田地区', '伊犁哈萨克自治州', '塔城地区', '阿勒泰地区'] },
    
    // 特别行政区
    xianggang: { name: '香港特别行政区', cities: ['中西区', '湾仔区', '东区', '南区', '油尖旺区', '深水埗区', '九龙城区', '黄大仙区', '观塘区', '北区', '大埔区', '沙田区', '西贡区', '荃湾区', '屯门区', '元朗区', '葵青区', '离岛区'] },
    aomen: { name: '澳门特别行政区', cities: ['花地玛堂区', '圣安多尼堂区', '大堂区', '望德堂区', '风顺堂区', '嘉模堂区', '路氹填海区', '圣方济各堂区'] },
    taiwan: { name: '台湾省', cities: ['台北市', '新北市', '桃园市', '台中市', '台南市', '高雄市', '基隆市', '新竹市', '嘉义市', '新竹县', '苗栗县', '彰化县', '南投县', '云林县', '嘉义县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '金门县', '连江县'] }
};

// 区域分组
const regions = {
    huabei: { name: '华北地区', provinces: ['beijing', 'tianjin', 'hebei', 'shanxi', 'neimenggu'] },
    dongbei: { name: '东北地区', provinces: ['liaoning', 'jilin', 'heilongjiang'] },
    huadong: { name: '华东地区', provinces: ['shanghai', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong'] },
    huazhong: { name: '华中地区', provinces: ['henan', 'hubei', 'hunan'] },
    huanan: { name: '华南地区', provinces: ['guangdong', 'guangxi', 'hainan'] },
    xinan: { name: '西南地区', provinces: ['chongqing', 'sichuan', 'guizhou', 'yunnan', 'xizang'] },
    xibei: { name: '西北地区', provinces: ['shaanxi', 'gansu', 'qinghai', 'ningxia', 'xinjiang'] },
    tebie: { name: '特别行政区', provinces: ['xianggang', 'aomen', 'taiwan'] }
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
    const provinceMenuBtn = document.getElementById('province-menu-btn');
    const provinceDropdown = document.getElementById('province-dropdown');
    
    // 设置版本号
    versionElement.textContent = VERSION;
    
    // 当前选中的省份
    let currentProvince = 'guangdong';
    
    // 是否正在抽卡
    let isDrawing = false;
    // 所有卡片元素
    let cards = [];
    
    // 初始化省份菜单
    initProvinceMenu();
    
    // 初始化卡片
    initCards();
    
    // 省份菜单按钮点击事件 - 修复版本
    if (provinceMenuBtn) {
        // 移除可能存在的旧事件监听器
        provinceMenuBtn.removeEventListener('click', handleProvinceMenuClick);
        // 添加新的事件监听器
        provinceMenuBtn.addEventListener('click', handleProvinceMenuClick);
        
        console.log('省份菜单按钮事件已绑定');
    } else {
        console.error('找不到省份菜单按钮元素');
    }
    
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
     * 初始化省份菜单
     */
    function initProvinceMenu() {
        provinceDropdown.innerHTML = '';
        
        // 遍历所有区域
        Object.keys(regions).forEach(regionKey => {
            const region = regions[regionKey];
            
            // 创建区域标题
            const regionTitle = document.createElement('div');
            regionTitle.className = 'region-title';
            regionTitle.textContent = region.name;
            provinceDropdown.appendChild(regionTitle);
            
            // 创建该区域的所有省份
            region.provinces.forEach(provinceKey => {
                const province = provincesData[provinceKey];
                
                const provinceItem = document.createElement('div');
                provinceItem.className = 'province-item';
                if (provinceKey === currentProvince) {
                    provinceItem.classList.add('active');
                }
                provinceItem.textContent = province.name;
                provinceItem.dataset.province = provinceKey;
                
                // 添加点击事件
                provinceItem.addEventListener('click', () => {
                    if (isDrawing) return;
                    
                    if (provinceKey === currentProvince) {
                        provinceDropdown.classList.remove('show');
                        return;
                    }
                    
                    // 更新活跃状态
                    document.querySelectorAll('.province-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    provinceItem.classList.add('active');
                    
                    // 更新当前省份
                    currentProvince = provinceKey;
                    
                    // 更新省份名称
                    provinceNameElement.textContent = province.name;
                    
                    // 关闭下拉菜单
                    provinceDropdown.classList.remove('show');
                    
                    // 重置卡片
                    resetCards();
                });
                
                provinceDropdown.appendChild(provinceItem);
            });
        });
    }
    
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

    // 省份菜单按钮点击事件处理函数
    function handleProvinceMenuClick(event) {
        const provinceDropdown = document.getElementById('province-dropdown');
        provinceDropdown.classList.toggle('show');
        
        // 阻止事件冒泡，防止立即触发document的点击事件
        event.stopPropagation();
        
        // 点击其他地方关闭下拉菜单
        function closeDropdown(e) {
            if (!provinceDropdown.contains(e.target) && e.target !== document.getElementById('province-menu-btn')) {
                provinceDropdown.classList.remove('show');
                document.removeEventListener('click', closeDropdown);
            }
        }
        
        // 移除之前可能存在的事件监听器，防止重复添加
        document.removeEventListener('click', closeDropdown);
        // 添加新的事件监听器
        document.addEventListener('click', closeDropdown);
    }
}); 