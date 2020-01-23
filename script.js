/*
 * Рабочий вариант упрощенный
 *
 *
 */

    // const imgPrevSmall = document.querySelector('.img-small');
    // const imgPrevBig = imgPrevSmall.getAttribute('data-big');
    // const divPrevBig = document.querySelector('.zoom-prev');
    // const selectDiv = document.querySelector('.select-div');

    // imgPrevSmall.addEventListener('mousemove', (e) => {
    //     let x = e.offsetX;
    //     let y = e.offsetY;
    //     let bgB = imgPrevSmall.getAttribute('data-big');

    //     let changeX = ((x) * 100) / imgPrevSmall.clientWidth;
    //     let changeY = ((y) * 100) / imgPrevSmall.clientHeight;

    //     divPrevBig.style.background = (`url(${bgB})`);
    //     divPrevBig.style.backgroundPositionX = changeX + '%';
    //     divPrevBig.style.backgroundPositionY = changeY + '%';
    //     divPrevBig.style.backgroundSize = imgPrevSmall.clientWidth * 2 + '%';

    // });


/*
 * Версия вторая, попытка сделать красиво
 *
 *
 */

const imgPrevSmall = document.querySelector('.img-small');
const imgPrevBig = imgPrevSmall.getAttribute('data-big');
const divPrevBig = document.querySelector('.zoom-prev');
const selectDiv = document.querySelector('.select-div');
let zoom=0.2;
let xx;
let yy;
let selectDivWidth, selectDivHeight;
let bgB = imgPrevSmall.getAttribute('data-big');
let bgS = imgPrevSmall.getAttribute('src');

let xxSelect = imgPrevSmall.getBoundingClientRect().width;
let yySelect = imgPrevSmall.getBoundingClientRect().height;

imgPrevSmall.addEventListener('mousewheel', (e)=>{
    e.preventDefault();
    let x = e.offsetX;
    let y = e.offsetY;
        if(e.deltaY<0){
            if (xxSelect>selectDiv.clientWidth) {
                zoom=parseFloat((zoom+0.1).toFixed(1)); 
            }
        }else{
            if (zoom>=0.2) {
                zoom=parseFloat((zoom-0.1).toFixed(1)); 
            }
        };
        selectDivWidth = xxSelect*zoom;
        selectDivHeight = yySelect*zoom;
        selectDiv.style.width = selectDivWidth + 'px';
        selectDiv.style.height = selectDivHeight+ 'px';

        bgLargeSize(xxSelect, selectDivWidth, selectDiv);
        bgCur(x, y);
        bgSelectRender(x, y);
});



imgPrevSmall.addEventListener('mousemove', (e) => {
     x = e.offsetX;
     y = e.offsetY;
    
    
    let changeX = (((x) * 100) / imgPrevSmall.clientWidth);      
    let changeY = (((y) * 100) / imgPrevSmall.clientHeight);

    divPrevBig.style.background = (`url(${bgB})`);
    divPrevBig.style.backgroundRepeat = 'no-repeat';
    divPrevBig.style.position = 'fixed';
    divPrevBig.style.boxShadow = '0 1px 4px rgba(0, 0, 0, .3), -23px 0 20px -23px rgba(0, 0, 0, .6), 23px 0 20px -23px rgba(0, 0, 0, .6), inset 0 0 40px rgba(0, 0, 0, .1)';
    divPrevBig.style.left = imgPrevSmall.getBoundingClientRect().left+imgPrevSmall.clientWidth+20 + 'px';
    divPrevBig.style.top = imgPrevSmall.getBoundingClientRect().top + 'px';
    divPrevBig.style.backgroundPositionX = changeX + '%';
    divPrevBig.style.backgroundPositionY = changeY + '%';
    divPrevBig.style.width = xxSelect*1.5 + 'px';
    divPrevBig.style.height = yySelect*1.5 + 'px';
    bgLargeSize(xxSelect, selectDivWidth, selectDiv);
    bgSelectRender(x, y);

    

});

imgPrevSmall.addEventListener('mouseover', (e) => {
    e.preventDefault();
    selectDiv.style.display = 'block';
    divPrevBig.style.display = 'block';
    imgPrevSmall.style.opacity = 0.5;
});

imgPrevSmall.addEventListener('mouseout', (e) => {
    e.preventDefault();
    selectDiv.style.display = 'none';
    imgPrevSmall.style.opacity = 1;
    divPrevBig.style.display = 'none';
});


function bgLargeSize(xxSelect, selectDivWidth, selectDiv){     //увеличение изображения при событии скролл
    let ind=xxSelect/selectDiv.clientWidth;
        if(selectDiv.clientWidth>xxSelect*0.7){
            divPrevBig.style.backgroundSize = 100 + '%';
        }else{
            divPrevBig.style.backgroundSize = ((xxSelect*ind*0.25)) + '%';
        }
};

function bgSelectRender(x, y){      //для курсора, установка фона превью, при движении по маленькому изображению, чтоб был эффект затемнения
    bgCur(x, y);
    swichCord(x, y);
    selectDiv.style.background = (`url(${bgS})`);
    selectDiv.style.backgroundSize = 300 + 'px';
       
    selectDiv.style.backgroundPositionX = -xx + 'px';
    selectDiv.style.backgroundPositionY = -yy + 'px';
    
};

function bgCur(x, y){       //позиционирование рамки "лупы" при движении мышки и событии скрол
    swichCord(x, y);
    selectDiv.style.left = xx + 'px';
    selectDiv.style.top = yy + 'px';
};

function swichCord(x, y){       //проверка данных для позиицонирования, чтоб рамка выделения не вылазила за пределы поля 
    switch (true) {
        case x <= selectDiv.clientWidth * 0.5:
            xx = 0;
            break;
        case x > selectDiv.clientWidth * 0.5 && x < imgPrevSmall.clientWidth - selectDiv.clientWidth * 0.5:
            xx = x - (selectDiv.clientWidth * 0.5);
            break;
        case x >= imgPrevSmall.clientWidth - selectDiv.clientWidth * 0.5:
            xx = imgPrevSmall.clientWidth - selectDiv.clientWidth - 2;
            break;
    };

    switch (true) {
        case y <= selectDiv.clientHeight * 0.5:
            yy = 0;
            break;
        case y > selectDiv.clientHeight * 0.5 && y < imgPrevSmall.clientHeight - selectDiv.clientHeight * 0.5:
            yy = y - (selectDiv.clientHeight * 0.5);
            break;
        case y >= imgPrevSmall.clientHeight - selectDiv.clientHeight * 0.5:
            yy = imgPrevSmall.clientHeight - selectDiv.clientHeight - 2;
            break;
    };
}