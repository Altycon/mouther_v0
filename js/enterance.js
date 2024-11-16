
function initializeEnterance(){

    // this is only temporary. I should do this on the server
    // and have no javascript for this page
    const enteranceForm = document.querySelector('#EnteranceForm');
    const enteranceMessageDisplay = document.querySelector('#EnteranceAccessMessage');

    enteranceForm.addEventListener('submit',(submitEvent)=>{
        submitEvent.preventDefault();
        const formData = new FormData(submitEvent.target);
        const key = formData.get('key');
        const pass = formData.get('pass');
        
        if(!key || (key.toLocaleLowerCase()) !== 'station'){
            enteranceMessageDisplay.textContent = 'Access Denied';
            enteranceMessageDisplay.dataset.state = 'denied';
            return;
        }
        if(!pass || (pass.toLocaleLowerCase()) !== 'bill and ted'){
            enteranceMessageDisplay.textContent = 'Access Denied';
            enteranceMessageDisplay.dataset.state = 'denied';
            return;
        }
        enteranceMessageDisplay.textContent = 'Access Granted';
        enteranceMessageDisplay.dataset.state = 'granted';
        setTimeout( ()=> { 
            window.location.href = 'https://altycon.git.io/mouther_v0/index.html';
        },2000);
        
    })
    
};
initializeEnterance();