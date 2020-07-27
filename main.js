let flag = true;
let eneSec = document.getElementById("eneSec");
let w = 0;
//プレイヤーデータ
let playerName = prompt("プレイヤーの名前を入力してください");
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 5;
let plyExpNeed = [5, 15, 30, 50, 100, 175 , 250,500];
let plyImg = document.getElementById("plyImg");
let PST = new Array(7);
for (let i = 0; i < PST.length; i++) {
    let ppSt = "plySt" + i;
    PST[i] = document.getElementById(ppSt);
}
PST[0].textContent = playerName;
//プレイヤー回復
plyImg.addEventListener("mousedown",() => {
    if(flag){
        plyImg.src = "Img/playerC.png";
    }
});
plyImg.addEventListener("mouseup" , () => {
    if(flag) {
        plyImg.src = "img/playerA.png";
        plyHp += plyHeal;
        if(plyHp > plyHpMax){
            plyHp = plyHpMax;
        }
        PST[2].textContent = "HP:" + plyHp;
    }
});
//敵データ
let t = 0;
let eneLv = 1;
let eneHp = 10;
let eneHpMax = new　Array(10);
let eneAtt = new Array(10);
let eneKill = new Array(10);
let eneExp = new Array(10);
let eneCntMax = new Array(10);
for(let g = 0; g < 10; g++){
    eneHpMax[g] = 10 + 5*g;
    eneAtt[g] = 2 + 3*g;
    eneKill[g] = 0;
    eneExp[g] = 1 + 2*g;
    eneCntMax[g] = 5 + 1 * g;
}
let eneName = ["スライム","バットマン","じぇりー","蛇","おおかみ","鬼","幽霊", "ゾンビ","火の玉","熊"]
let eneCnt = 5;
let eneImg = document.getElementById("eneImg");
let EST = new Array(5);
let eneImgTypeA = "img/enemyA" + t + ".png";
let eneImgTypeB = "img/enemyB" + t + ".png";
for (let d = 0; d < EST.length; d++) {
    let eeSt = "eneSt" + d;
    EST[d]= document.getElementById(eeSt);
}
//敵を攻撃
eneImg.addEventListener("mousedown" , () => {
    if(flag){
        eneImg.src = eneImgTypeB;
    }
});
eneImg.addEventListener("mouseup" , () => {
    if(flag) {
        eneImg.src = eneImgTypeA;
        if(eneHp > 0){
            eneHp -= plyAtt;
            if(eneHp < 0){
                eneHp = 0;
            }
        }else{
            eneHp = eneHpMax[t];
            eneKill[t]++;
            EST[4].textContent = "倒した回数:" + eneKill[t];
            //経験値処理
            plyExp += eneExp[t];
            PST[5].textContent = "経験値:" + plyExp;
            plyExpNext -= eneExp[t];
            if ( eneLv >= 9){
                flag = false;
                eneSec.textContent = "ゲームクリア";
                w = 1;
            }
            //レベルアップの処理
            if(plyExpNext < 1){
                plyExpNext = plyExpNeed[plyLv];
                plyLv++;
                PST[1].textContent = "レベル:" + plyLv;
                plyHpMax = plyLv * 4 + 6;
                plyHp = plyHpMax;
                PST[2].textContent = "HP:" + plyHp;
                plyAtt++;
                PST[3].textContent = "攻撃力:" + plyAtt;
                plyHeal++;
                PST[4].textContent = "回復魔法:" + plyHeal;
            }
        }
        PST[6].textContent = "次のレベルまでの経験値" + plyExpNext + "ポイント";
        if(plyLv == 9 ){
            PST[6].textContent = "最大レベル";
        }
        EST[2].textContent = "HP:" + eneHp;
    }
});
//敵が時間ごとに攻撃

let loop = setInterval(() => {
    if(w == 1){
        flag = false;
    }else{    
    if(eneCnt > 0) {
        eneCnt--;
        eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
    } else {
        plyImg.src = "img/playerB.png";
        plyHp -= eneAtt[t];
        if(plyHp > 0) {
            PST[2].textContent = "HP:" + plyHp;
            eneSec.textContent = "モンスターの攻撃まで"+ eneCnt + "秒";
        }else {
            plyHp = 0;
            clearInterval(loop);
            flag = false;
            PST[2].textContent = "HP:" + plyHp;
            eneSec.textContent = "ゲームオーバー";
        }
        setTimeout(() => {
            if(flag){
                eneCnt = eneCntMax[t];
                plyImg.src = "img/playerA.png";
                eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
            }
        }, 500);
    }
}
} ,1000);

let right = document.getElementById("right");
right.addEventListener("click" , () => {
    if (plyHp < 0 || t == 9){
        flag = false;
    }else{
        if ( t <= 10){
        t++;
        EST[0].textContent = eneName[t];
        EST[2].textContent = "HP:"+eneHpMax[t];
        EST[3].textContent = "攻撃力:"+eneAtt[t];
        eneCnt = eneCntMax[t];
        eneLv++;
        EST[1].textContent = "レベル:"+eneLv;
        eneImgTypeA = "img/enemyA" + t + ".png";
        eneImgTypeB = "img/enemyB" + t + ".png";
        eneImg.src = eneImgTypeA;
    }else{
        t = 10;
    }
    }
});
let left = document.getElementById("left");
left.addEventListener("click" , () => {
    if(plyHp < 0 || t == 0){
        flag = false;
    }else{
        t--;
        if (t >= 0){
        EST[0].textContent = eneName[t];
        EST[2].textContent = "HP:"+eneHpMax[t];
        EST[3].textContent = "攻撃力:"+eneAtt[t];
        eneCnt = eneCntMax[t];
        eneLv--;
        EST[1].textContent = "レベル:"+eneLv;
        eneImgTypeA = "img/enemyA" + t + ".png";
        eneImgTypeB = "img/enemyB" + t + ".png";
        eneImg.src = eneImgTypeA;
        }else{
            t = 0 ;
        }
    }
});