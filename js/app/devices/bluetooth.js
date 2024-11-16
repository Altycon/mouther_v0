import { Bluetooth } from "../../state.js";
import { 
    setElementState, 
    setElementText 
} from "../../utilities/elements.js";
import { hasBluetooth } from "../../utilities/tools.js";


export async function connectBluetooth(clickEvent){
    clickEvent.preventDefault();
    const bluetoothButton = clickEvent.target;
    
    if(!hasBluetooth()){
        setElementState(bluetoothButton,'disconnected');
        setElementText(Bluetooth.statusDisplay,'not supported');
        return;
    };
    setElementState(bluetoothButton,'connecting');
    setElementText(Bluetooth.statusDisplay, 'connecting...');

    try{

        // I have not tested any of this as I could not get my computer to 
        // recongnize any bluetooth capabilities

        const device = await navigator.bluetooth.requestDevice({ 
            acceptAllDevices: true,
            // filters: [{ services: ['battery_service'] }],
            // optionalServices: ['device_information']
        });
        if(!device){
            setElementState(bluetoothButton,'disconnected');
            setElementText(Bluetooth.statusDisplay,'none selected');
            return;
        }
        setElementState(bluetoothButton,'connected');
        setElementText(Bluetooth.statusDisplay,'connected');
        console.log('bluetooth device', device);
        
    }catch(error){
        console.warn(error);
        setElementState(bluetoothButton,'disconnected');
        setElementText(Bluetooth.statusDisplay,'disconnected');
    }
};

