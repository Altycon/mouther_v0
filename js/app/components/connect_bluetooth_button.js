import { Bluetooth } from "../../state.js";
import { getElement } from "../../utilities/elements.js";
import { connectBluetooth } from "../devices/bluetooth.js";




export function initializeBluetooth(){
    const [ bluetoothButtonError, bluetoothButton ] = getElement('#ConnectBluetoothButton');
    if(bluetoothButtonError){ console.warn( bluetoothButtonError ); return };

    const [ bluetoothStatusDisplayError, bluetoothStatusDisplay ] = getElement('#BluetoothStatusDisplay');
    if(bluetoothStatusDisplayError){ console.warn( bluetoothStatusDisplayError ); return };

    bluetoothButton.addEventListener('click', connectBluetooth);

    Bluetooth.connectButton = bluetoothButton;
    Bluetooth.statusDisplay = bluetoothStatusDisplay;
};