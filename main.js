

function getValue(id) {
    return document.getElementById(id).value;
}

/**
 * @description     Return object with rgb params from given hex
 * @param {String} hex 
 */
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getGradient(channels, increment) {
    var grad = [];
    var checkMax = (value)=>{
        return value <= 225 ? value : 225;
    };
    var checkMin = (value)=>{
        return value > 0 ? value : 0;
    };

    for (let i = 3; i >= 1; i--) {
        new_r = checkMax(channels.r + (i * increment));
        new_g = checkMax(channels.g + (i * increment));
        new_b = checkMax(channels.b + (i * increment));
        grad.push('rgb(' + new_r + ',' + new_g + ',' + new_b + ')');
    }
    grad.push('rgb(' + channels.r + ',' + channels.g + ',' + channels.b + ')');
    for (let i = 1; i < 5; i++) {
        new_r = checkMin(channels.r - (i * increment));
        new_g = checkMin(channels.g - (i * increment));
        new_b = checkMin(channels.b - (i * increment));
        grad.push('rgb(' + new_r + ',' + new_g + ',' + new_b + ')');
    }
    return grad.reverse();
}

//Da tenere:    rgb(0,37,45)
//Da escludere: rgb(181,225,225)

function applyColors(colorPickerClass, tilesWrapperId) {
    //PrimaryColors
    primaryChannels = hexToRgb(getValue(colorPickerClass ? colorPickerClass :'primary-color-picker'));
    // primaryTiles = Array.from(document.getElementById('primary-color-class').childNodes)
    //     .filter((node) => {
    //         return node.tagName == 'DIV';
    //     });
    primaryTiles = Array.from(document.getElementById(tilesWrapperId ? tilesWrapperId :'primary-color-class').children)
        // .map((child)=>{
        //     return child.firstElementChild ? child.firstElementChild : child;
        // });

    primaryColors = getGradient(primaryChannels,30);
    console.log(primaryTiles);
    console.log(primaryChannels);
    console.log(getGradient(primaryChannels,30));
    // primaryTiles.forEach((tile, index) => {
    //     tile.style.backgroundColor(primaryColors[index]);
    // });

    //Cicle tiles and set color
    for(let i = 0; i<primaryTiles.length; i++){
        let tileWrap = primaryTiles[i];
        if(tileWrap.firstElementChild){
            tileWrap.children[0].style.backgroundColor = primaryColors[i];
            tileWrap.children[1].innerHTML = primaryColors[i];
        }else{
            primaryTiles[i].style.backgroundColor = primaryColors[i];
        }
        
    }

}

function test() {
    let input = util.getById('primary-color-picker');
    console.log(input);

}

