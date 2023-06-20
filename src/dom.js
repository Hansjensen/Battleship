


function buildPage() {

    const body = document.querySelector('body')
    const template = 
        elementBuild('div', {'id' : 'wrapper'}, 
            elementBuild('header', {'id' : 'header'},
                elementBuild('div', {'id' : 'logo'})),
            elementBuild('div', {'id' : 'gameContainer'},
                elementBuild('div', {'id' : 'playerContainer', 'class' : 'gameboard'} ),
                elementBuild('div', {'id' : 'computerContainer', 'class' : 'gameboard'})),
            elementBuild('footer', {'id' : 'footer'})  
        )  

    body.appendChild(template);
}










function elementBuild (type, attributes, ...children) {

    const element = document.createElement(type)
    
    for (let key in attributes) {

        element.setAttribute(key, attributes[key])
    }

    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child))
        }  else{
            element.appendChild(child)
        }
    })

    return element;
}

export { buildPage }