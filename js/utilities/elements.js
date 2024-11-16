
class MissingElementError extends Error{
    constructor(message){
        super(message);
        this.name = this.constructor.name;
    }
};

function getElement(selector){
    const element = document.querySelector(selector);
    if(!element) return [new MissingElementError(`"${selector}" element missing.`),null];
    return [null,element];
};
function getElementChild(selector,childSelector){
    if(selector instanceof Node){
        const element = selector.querySelector(childSelector);
        if(!element) return [new MissingElementError(`"${childSelector}" element missing.`),null];
        return [null,element];
    }else{
        const element = document.querySelector(`${selector}`);
        if(!element) return [new MissingElementError(`parent "${selector}" element missing.`),null];
        const child = element.querySelector(childSelector);
        if(!child) return [new MissingElementError(`child "${childSelector}" element missing`)]
        return [null,child];
    }
}
function setElementText(element,text){
    if(!(element instanceof Node)){
        console.error(
            new TypeError(`expected HTML element, got ${typeof element}`)
        );
        return;
    }
    element.textContent = text;
};
function setElementState(element,state){
    if(!(element instanceof Node)){
        console.error(
            new TypeError(`expected HTML element, got ${typeof element}`)
        );
        return;
    }
    element.dataset.state = state;
};
function setElementValue(element,value){
    if(!(element instanceof Node)){
        console.error(
            new TypeError(`expected HTML element, got ${typeof element}`)
        );
        return;
    }
    element.value = value;
}
function transition(type,element,immediateClassNames,delayedClassNames,delay,delayedCallback){
    function handleClasses(classNames,action){
        if(classNames){
            if(Array.isArray(classNames)){
                element.classList[action](...classNames)  
            }else{
                element.classList[action](classNames)
            }
        }
    }
    switch(type){
        case 'add':
        case 'remove':
            handleClasses(immediateClassNames,type);
            if(delayedClassNames){
                setTimeout( ()=>{
                    handleClasses(delayedClassNames,type);
                    if(delayedCallback) delayedCallback(element);
                },delay ? delay:100)
            }
        break;
        case 'add-remove':
            handleClasses(immediateClassNames,'add');
            if(delayedClassNames){
                setTimeout( ()=>{
                    handleClasses(delayedClassNames,'remove');
                    if(delayedCallback) delayedCallback(element);
                },delay ? delay:100)
            }
        break;
    }
};
function createElement(tagName, attributes = {}, content, listeners){
    const element = document.createElement(tagName);
    
    if(attributes){
        for(const key in attributes){
            const value = attributes[key];
            if(key === 'class'){
                element.classList.add(...value.split(' '));
            }else if((Object.getOwnPropertyDescriptor(element, key)?.writable)){
                element[key] = value;
            }else{
                element.setAttribute(key, value);
            }
        }
    }
    if(content){
        if(Array.isArray(content)){
            for(let i = 0; i < content.length; i++){
                const item = content[i];
                if(item instanceof Node){
                    element.appendChild(item);
                }else{
                    element.appendChild(document.createTextNode(item));
                }
            }
        }else if(content instanceof Node){
            element.appendChild(content);
        }else{
            element.textContent = content;
        }
    }
    if(listeners){
        if(Array.isArray(listeners)){
            for(let i = 0; i < listeners.length; i++){
                if(listeners[i].hasOwnProperty('listen')){
                    element.addEventListener(listeners[i].type, listeners[i].listen);
                }
            }
        }
        if(listeners.hasOwnProperty('listen')){
            element.addEventListener(listeners.type, listeners.listen);
        }
        
    }
    return element;
};

export { 
    getElement, 
    getElementChild, 
    setElementText, 
    setElementState,
    setElementValue,
    transition,
    createElement
};