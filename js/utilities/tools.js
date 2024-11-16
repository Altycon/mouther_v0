
function random(min,max,bool){
    if(bool){
        return Math.floor(Math.random()*(max-min)+min);
    }
    return Math.random()*(max-min)+min;
};
function scale(number,inMin,inMax,outMin,outMax){
    return (number - inMin)*(outMax-outMin)/(inMax-inMin)+outMin;
};
function generateRandomUsername(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = random(0,characters.length,true);
      username += characters[randomIndex];
    }
  
    return username;
};
function hasDeviceSupport(){
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
        return false;
    }
    return true;
};
function isIphone(){
    return /(iPad|iPhone|iPod)/i.test(navigator.userAgent);
};
function hasInternetConnection(){
    return (navigator.onLine);
};
function hasBluetooth(){
    if(!navigator.bluetooth) return false;
    return navigator.bluetooth.getAvailablity();
};

export { 
    random, 
    scale, 
    generateRandomUsername,
    hasDeviceSupport,
    isIphone,
    hasInternetConnection,
    hasBluetooth 
};
