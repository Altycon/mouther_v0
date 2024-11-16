

export const App = {
    ORIGIN_URL: 'http://127.0.0.1:1234',
    WEBSOCKET_ORIGIN_URL: 'ws://127.0.0.1:1234',
    devices: undefined,
    username: undefined,
    created: undefined,
};
export const Settings = [
    { id: 'BackgroundColorPrimary', name: 'background-color-primary', cssProperty: '--bc-primary', value: '#0d0d0d' },
    { id: 'TextColorPrimary', name: 'text-color-primary', cssProperty: '--fc-primary', value: '#e6e6e6' },
    { id: 'AccentColor', name: 'accent-color', cssProperty: '--accent-color-primary', value: '#1a1a1a' },
    { id: 'ButtonTalkColor', name: 'button-talk-color', cssProperty: '--bc-btn-talk', value: '#003399' },
    { id: 'ButtonBeepColor', name: 'button-beep-color', cssProperty: '--bc-btn-beep', value: '#990000' },
    { id: 'ButtonPrimaryColor', name: 'button-primary-color', cssProperty: '--bc-btn-primary', value: '#003399' },
    { id: 'ButtonOpenedColor', name: 'button-opened-color', cssProperty: '--bc-btn-opened', value: '#009999' },
    { id: 'ButtonClosedColor', name: 'button-closed-color', cssProperty: '--bc-btn-closed', value: '#003399' },
    { id: 'ButtonChangeColor', name: 'button-change-color', cssProperty: '--bc-btn-change', value: '#990099' },
    { id: 'ButtonConnectedColor', name: 'button-connected-color', cssProperty: '--bc-btn-connected', value: '#009900' },
    { id: 'ButtonConnectingColor', name: 'button-connecting-color', cssProperty: '--bc-btn-connecting', value: '#999900' },
    { id: 'ButtonDisconnectedColor', name: 'button-disconnected-color', cssProperty: '--bc-btn-disconnected', value: '#990000'},
];
export const Canopy = {
    confirmation:{
        element: undefined,
        title: undefined,
        message: undefined,
        cancelButton: undefined,
        confirmButton: undefined,
    },
    notification:{
        element: undefined,
        title: undefined,
        message: undefined,
        instructions: undefined,
        closeButton: undefined,
    },
    visualLog:{
        list: undefined
    }
};
export const Microphone = {
    connectButton: undefined,
    talkButton: undefined,
    beepButton: undefined,
    device: undefined,
    labelDisplay: undefined,
    stream: undefined,
    statusDisplay: undefined
};
export const Bluetooth = {
    connectButton: undefined,
    device: undefined,
    statusDisplay: undefined
};
export const AudioAnalyser = {

    context: undefined,
    source: undefined,
    analyser: undefined,
    bufferLength: undefined,
    dataArray: undefined,
    fftSize: 32,
    smoothingTimeConstant: 0.8,
    minDecibels: -90,
    maxDecibels: -10
};
export const Visualizer = {
    canvas: undefined,
    width: undefined,
    height: undefined,
    context: undefined,
    center: undefined,
    dotSize: 2,
    frequencyDotTotal: 0,
    frequencyDotSpacing: 0,
    animationId: undefined,
};

