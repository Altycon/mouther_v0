import { Settings } from "../../state.js";


export class ColorSetting{
    constructor(id,value,name,cssProperty){
        this.type = 'color';
        this.id = id;
        this.value = value;
        this.name = name;
        this.cssProperty = cssProperty;
    }
};

export function createColorSettings(){
    const settings = [];

    [...document.querySelectorAll('#AppSettingsForm [name]')].forEach( input => {
        Settings.forEach( setting => {
            if(setting.name === input.name && 
                setting.value !== input.value){

                settings.push(
                    new ColorSetting(
                        input.id,
                        input.value,
                        input.name,
                        setting.cssProperty
                    )
                )
            }
        })
    });
    return settings;
};