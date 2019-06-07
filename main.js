

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
    var checkMax = (value) => {
        return value <= 225 ? value : 225;
    };
    var checkMin = (value) => {
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



function applyColors(colorPickerClass, tilesWrapperId) {
    //PrimaryColors
    primaryChannels = hexToRgb(getValue(colorPickerClass ? colorPickerClass : 'primary-color-picker'));
    // primaryTiles = Array.from(document.getElementById('primary-color-class').childNodes)
    //     .filter((node) => {
    //         return node.tagName == 'DIV';
    //     });
    primaryTiles = Array.from(document.getElementById(tilesWrapperId ? tilesWrapperId : 'primary-color-class').children);
    // .map((child)=>{
    //     return child.firstElementChild ? child.firstElementChild : child;
    // });

    let primaryColors = getGradient(primaryChannels, 30);
    console.log(primaryTiles);
    console.log(primaryChannels);
    console.log(getGradient(primaryChannels, 30));
    // primaryTiles.forEach((tile, index) => {
    //     tile.style.backgroundColor(primaryColors[index]);
    // });

    //Cicle tiles and set color and Label
    for (let i = 0; i < primaryTiles.length; i++) {
        let tileWrap = primaryTiles[i];
        if (tileWrap.firstElementChild) {
            tileWrap.children[0].style.backgroundColor = primaryColors[i];
            tileWrap.children[1].innerHTML = primaryColors[i];
        } else {
            primaryTiles[i].style.backgroundColor = primaryColors[i];
        }

    }

}

function setLabes(tilesWrapperId) {
    colorTiles = Array.from(document.getElementById(tilesWrapperId).children);

    //Cicle tiles and set Label
    for (let i = 0; i < colorTiles.length; i++) {
        let tileWrap = colorTiles[i];
        //let lab = tileWrap.children[0].style.backgroundColor;
        let lab = window.getComputedStyle(tileWrap.children[0]).getPropertyValue('background-color');
        tileWrap.children[1].innerHTML = lab;
    }
}

/**
 * @description     Initial page setup
 * @param {Number} channelInterval - Intervall base for gradient steps.
 */
function initialSetUp(channelInterval){
    channelInterval = channelInterval ? channelInterval : 30;
    
    //List of color class wrappers
    const wrappers = [
        //{ colorClass : 'grey-color-class', tiles : [] },
        { colorClass : 'primary-color-class', inputId:'primary-color-picker' },
        { colorClass : 'secondary-color-class', inputId:'secondary-color-picker' },
        { colorClass : 'success-color-class', inputId:'success-color-picker' }
    ];

    console.log('settin up...');
    
    //Set labels
    wrappers.forEach(wrap => {
        // setLabes(wrap);
        wrap.tiles = Array.from(document.getElementById(wrap.colorClass).children);
        wrap.channels = hexToRgb(getValue(wrap.inputId));
        wrap.gradient = getGradient(wrap.channels, channelInterval);

        //Cicle tiles and set color and Label
        for (let i = 0; i < wrap.tiles.length; i++) {
            let tileWrap = wrap.tiles[i];
            if (tileWrap.firstElementChild) {
                tileWrap.children[0].style.backgroundColor = wrap.gradient[i];
                tileWrap.children[1].innerHTML = wrap.gradient[i];
            } else {
                wrap.tiles[i].style.backgroundColor = wrap.gradient[i];
            }
        }
    });
}

function test() {
    

}

//When Ready
(function () {
    
    initialSetUp();
})();
