
class LocalDatabaseError extends Error{
    constructor(message){
        super(message);
        this.name = 'LocalDatabaseError';
    }
};

export const LocalDB = {
    name: 'mouther-app',
    USER: 'mouther-user',
    SETTINGS: 'mouther-settings',
    items: [],
    initialized: false,
    totalItems: 0,
    storageAvailable(type = 'localStorage'){
        let storage;
        try{
            storage = window[type];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }catch(error){
            return ( error instanceof DOMException &&
                error.name === "QuotaExceededError" &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage &&
                storage.length !== 0
            );
        }
    },
    exists(storeName){

        const store = JSON.parse(localStorage.getItem(storeName || this.name));
        if(store){
            if(!this.initialized) this.initialized = true;
            if(this.items.length === 0)this.items = Object.keys(store);
            return true;
        }
        return false;
    },
    getStore(){
        try{
            const store = JSON.parse(localStorage.getItem(this.name));
            return [null,store];
        }catch(error){
            return [new LocalDatabaseError(error.message),null];
        }
    },
    setStore(store){
        try{

            localStorage.setItem(this.name, JSON.stringify(store));
           
            return [null,null];

        }catch(error){
            return [new LocalDatabaseError(error.message),null];
        }
    },
    deleteStore(storeName){
        if(!this.exists(storeName)){
            return [new LocalDatabaseError(`Store "${storeName || this.name}" does not exits to delete`),null];
        }
        try{

            localStorage.removeItem(storeName || this.name);

            return [null,storeName || this.name];

        }catch(error){
            return [new LocalDatabaseError(error.message),null];
        }
    },
    itemExists(id){
        return this.items.includes(id);
    },
    getItem(id){
        const [error, store ] = this.getStore();
        if(error) return [error, null];

        if(!store.hasOwnProperty(id)){
            return [null, null];
        }
        return [null,store[id]]
    },
    setItem(id,data){
        const [error, store ] = this.getStore();
        if(error) return [error, null];

        store[id] = data;
        this.items.push(id);

        const [ storeError ] = this.setStore(store);
        if(storeError) return [storeError, null];

        return [null,data];
    },
    deleteItem(id){
        const [error, store ] = this.getStore();
        if(error) return [error, null];

        delete store[id];
        const index = this.items.indexOf(id);
        if(index > 0) this.items.splice(index,1);

        const [ storeError ] = this.setStore(store);
        if(storeError) return [storeError, null];

        return [null,null];
    },
    addToItem(id,newItem){
        const [error, store ] = this.getStore();
        if(error) return [error,null];

        const storeItem = store[id];

        try{

            if(Array.isArray(storeItem)){
                storeItem.push(newItem);
            }else{
                for(const prop in newItem){
                    storeItem[prop] = newItem[prop];
                }
            }
            const [ storeError ] = this.setStore(store);
            if(storeError) throw storeError;

            return [null,storeItem];

        }catch(error){
            return [error,null];
        }
    },
    initialize(){
        if(!this.storageAvailable()){
            return [new LocalDatabaseError('browser data storage is full'),null];
        }
        try{
            const [ error ] = this.setStore({});
            if(error) throw error;

            this.initialized = true;

            return [null,null];
        }catch(error){
            return [new LocalDatabaseError(error.message),null];
        }
    }
};