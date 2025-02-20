// Tạo mảng dữ liệu ngẫu nhiên
let array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
const container = document.getElementById('container');
// Đánh dấu các vị trí đã sắp xếp
let sortedArray = Array.from({ length: 20 }, () => false);
//cài đặt trạng thái sắp xếp
let isSorting = false;
//cài đặt tốc độ khởi điểm
let speed;
setSpeed(1);
document.getElementById("controlButtons").style.display = "none";
//cài đặt trạng thái chạy
let isRunning = true;
document.getElementById("completeStatus").style.display = "none";

// Hàm vẽ mảng
function drawArray(arr, startIdx = -1, pivotIdx = -1, highlightIdx = -1,lowerPivotCount = -1,flag1 = true,flag2 = false) {
container.innerHTML = '';  // Xóa mọi thứ trong container
arr.forEach((value, index) => {
    const bar = document.createElement('div');
    bar.style.height = `${value * 3}px`;  // Mỗi giá trị sẽ được nhân với 3 để có chiều cao đủ lớn
    bar.classList.add('bar');
    
    // Tô màu cho pivot và phần tử đang được highlight
    if (isSorting) {
        if (sortedArray[index]) {
            bar.classList.add('sortedBar');
        } else if (index >= startIdx && index <= Math.max(pivotIdx, highlightIdx)) {
            if (index === pivotIdx && flag1) {
                bar.classList.add('pivot');
            } else if (index === highlightIdx) {
                bar.classList.add('highlight');
            } else if (index <= lowerPivotCount || flag2 && index === highlightIdx - 1) {
                bar.classList.add('lowerPivotHighlight');
            } else {
                bar.classList.add('groupHighlight');
            }
        }
        
    }
    
    container.appendChild(bar);
    // Vẽ vạch kẻ ngang cho pivot (nếu có)
    if (isSorting && index === pivotIdx && flag1) {
            const pivotBar = container.children[pivotIdx];
            const pivotLine = document.createElement('div');
            pivotLine.classList.add('pivot-line');
            pivotLine.style.height = `${parseInt(bar.style.height)}px`;  // Độ cao của vạch kẻ ngang bằng chiều cao của thanh pivot
            container.appendChild(pivotLine);
        }   
    
});
}



// Partition function
async function partition(arr, low, high) {
document.getElementById('code6').style.color = 'red';
document.getElementById('code1').style.color = 'red';
const pivot = arr[high];
let i = low - 1;
if (isSorting) {
    drawArray(array, low, high, -1, i);  // Vẽ lại mảng sau khi chọn pivot
    document.getElementById('code2').style.color = 'red';
    await sleep(getSpeed());  // Dừng lại trong một khoảng thời gian nhất định
    await pause();
}
for (let j = low; j < high; j++) {
    if (isSorting) {
        document.getElementById('code3').style.color = 'red';
        document.getElementById('code2').style.color = 'white';
        drawArray(array, low, high, j, i); 
        await sleep(getSpeed());  // Dừng lại trong một khoảng thời gian nhất định
        await pause();
    }
    if (arr[j] <= pivot) {
        if (isSorting) {
            drawArray(array, low, high, j + 1, i,true,true);  // Vẽ lại mảng sau khi hoán đổi
            await sleep(getSpeed());  // Dừng lại trong một khoảng thời gian nhất định
            await pause();
        }
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap elements
    }
}
if (isSorting) {
    drawArray(array, low, high, -1, i);
    await sleep(getSpeed());
    await pause();
}

[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];  // Hoán đổi pivot vào đúng vị trí

if (isSorting) {
    drawArray(array, low, i + 1, -1, i);
    document.getElementById('code4').style.color = 'red';
    document.getElementById('code3').style.color = 'white';
    document.getElementById('code2').style.color = 'white';
    await sleep(getSpeed());
    await pause();
}
sortedArray[i+1] = true;

if (isSorting) {
    drawArray(array);
    document.getElementById('code6').style.color = 'white';
    document.getElementById('code1').style.color = 'white';
    document.getElementById('code4').style.color = 'white';
    await sleep(getSpeed());
    await pause();
} else {
    newArray(array);
    drawArray(array);
}

return i + 1;
}

// Quick Sort function
async function quickSort(arr, low, high) {
if (isSorting && low === 0 && high === array.length - 1) {
    document.getElementById('code9').style.color = 'red';
    await sleep(getSpeed());
    await pause();
    document.getElementById('code9').style.color = 'white';
}
if (isSorting) { 
    if (low < high) {
        document.getElementById('code7').style.color = 'white';
        document.getElementById('code8').style.color = 'white';
        document.getElementById('code5').style.color = 'red';
        await sleep(getSpeed());
        await pause();
        document.getElementById('code5').style.color = 'white';
        const pi = await partition(arr, low, high);
        
        if (isSorting) {
            document.getElementById('code7').style.color = 'red';
            document.getElementById('code5').style.color = 'white';
            drawArray(array,low,pi - 1,-1,-1,false);
            await sleep(getSpeed());
            await pause();
            await quickSort(arr, low, pi - 1);  // Sắp xếp phần bên trái pivot
            document.getElementById('code7').style.color = 'white';
            document.getElementById('code8').style.color = 'red';
        }
        if (isSorting) {
            drawArray(array,pi + 1,high,-1,-1,false);
            await sleep(getSpeed());
            await pause();
            await quickSort(arr, pi + 1, high);  // Sắp xếp phần bên phải pivot
            document.getElementById('code8').style.color = 'white';
        }
        if (isSorting && low === 0 && high === array.length - 1) {
            document.getElementById("controlButtons").style.display = "none";
            document.getElementById("completeStatus").style.display = "block";
        } else if (!isSorting) {
            newArray(array);
            drawArray(array);
        }
    } else {
        sortedArray[low] = true;
        drawArray(array);
    }
} else {
    newArray(array);
    drawArray(array);
}
}

// Sleep function để dừng tạm thời
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

drawArray(array);
// Bắt đầu thuật toán Quick Sort
function startQuickSort() {
    if (!isSorting) {
        document.getElementById("status").innerHTML = "restart";
        document.getElementById("status").style.backgroundColor = '#6c0703';
        document.getElementById("controlButtons").style.display = "block";
        isSorting = true;
    } else {
        document.getElementById("status").innerHTML = "start";
        document.getElementById("status").style.backgroundColor = '#015901';
        document.getElementById("controlButtons").style.display = "none";
        isSorting = false;
        isRunning = false;
        changeRunning();
        document.getElementById("completeStatus").style.display = "none";
    }
    quickSort(array, 0, array.length - 1);
}
//hàm reset mảng mới
function newArray(array) {
    for (let i = 0;i < array.length;i++) {
        array[i] = Math.floor(Math.random() * 100) + 1;
        sortedArray[i] = false;
    }
    document.getElementById('code1').style.color = 'white';
    document.getElementById('code2').style.color = 'white';
    document.getElementById('code3').style.color = 'white';
    document.getElementById('code4').style.color = 'white';
    document.getElementById('code5').style.color = 'white';
    document.getElementById('code6').style.color = 'white';
    document.getElementById('code7').style.color = 'white';
    document.getElementById('code8').style.color = 'white';
    return array;
}

//hàm chỉnh tốc độ
function setSpeed(i) {
    document.getElementById('ctrlButton1').style.backgroundColor = "#6c0703";
    document.getElementById('ctrlButton2').style.backgroundColor = "#6c0703";
    document.getElementById('ctrlButton3').style.backgroundColor = "#6c0703";
    document.getElementById('ctrlButton1').style.color = "#f0f0f0";
    document.getElementById('ctrlButton2').style.color = "#f0f0f0";
    document.getElementById('ctrlButton3').style.color = "#f0f0f0";
    document.getElementById('ctrlButton1').style.pointerEvents = "auto";
    document.getElementById('ctrlButton2').style.pointerEvents = "auto";
    document.getElementById('ctrlButton3').style.pointerEvents = "auto";
    if (i === 1) {
        document.getElementById('ctrlButton1').style.backgroundColor = "#ffeb3b";
        document.getElementById('ctrlButton1').style.color = "#000000";
        document.getElementById('ctrlButton1').style.pointerEvents = "none";
    } else if (i === 2) {
        document.getElementById('ctrlButton2').style.backgroundColor = "#ffeb3b";
        document.getElementById('ctrlButton2').style.color = "#000000";
        document.getElementById('ctrlButton2').style.pointerEvents = "none";
    } else {
        document.getElementById('ctrlButton3').style.backgroundColor = "#ffeb3b";
        document.getElementById('ctrlButton3').style.color = "#000000";
        document.getElementById('ctrlButton3').style.pointerEvents = "none";
    } 
    speed = i;
}

//hàm tạm dừng / tiếp tục chạy
function changeRunning() {
    if (isRunning) {
        isRunning = false;
        document.getElementById("runIcon").innerHTML = "&#9205";
        document.getElementById("runIcon").style.backgroundColor = "#015901";
        document.getElementById('ctrlButton1').style.backgroundColor = "#6c0703";
        document.getElementById('ctrlButton2').style.backgroundColor = "#6c0703";
        document.getElementById('ctrlButton3').style.backgroundColor = "#6c0703";
        document.getElementById('ctrlButton1').style.color = "#f0f0f0";
        document.getElementById('ctrlButton2').style.color = "#f0f0f0";
        document.getElementById('ctrlButton3').style.color = "#f0f0f0";
        document.getElementById('ctrlButton1').style.pointerEvents = "none";
        document.getElementById('ctrlButton2').style.pointerEvents = "none";
        document.getElementById('ctrlButton3').style.pointerEvents = "none";
    } else {
        isRunning = true;
        document.getElementById("runIcon").innerHTML = "&#9208";
        document.getElementById("runIcon").style.backgroundColor = "#6c0703";
        setSpeed(speed);
    }
}

function getSpeed() {
    if (speed === 1) {
        return 1000;
    } else if (speed === 2) {
        return 600;
    } else {
        return 300;
    }
    
}

//hàm thực hiện việc dừng chạy
async function pause() {
    flag = false;
    while (!isRunning) {
        await sleep(100);
        flag = true;
    }
    if (flag) {
        await sleep(getSpeed());
    }
}