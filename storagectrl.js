// Storage Controller
const StorageCtrl = (function(){
    // Public Methods
    return {
        // Store item
        storeItem: item => {
            let items;
            
            // Checks to see if items is not already stored
            if(localStorage.getItem('items') === null) {
                // Intialize array
                items = [];
                // Add new item
                items.push(item);
                // Store
                localStorage.setItem('items', JSON.stringify(items));
            // If items already exists in storage
            } else {
                // Set items to storage items
                items = JSON.parse(localStorage.getItem('items'));
                // Add new item
                items.push(item);
                // Store
                localStorage.setItem('items', JSON.stringify(items));
            }
        },

        // Returns all items for storage
        getItemsFromStorage: () => {
            let items;
            
            // Checks to see if items is not already stored
            if(localStorage.getItem('items') === null) {
                items = [];
                
            // If items already exists in storage
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }

            return items;
        },

        // Deletes item from storage
        deleteItemFromStorage: id => {
            let items = JSON.parse(localStorage.getItem('items'));
            
            items.forEach(item => {
                if(item.id === id){
                    let index = items.indexOf(item);
                    items.splice(index, 1);
                }
            });

            localStorage.setItem('items', JSON.stringify(items));
        },

        // Updates an item in storage
        updateItemInStorage: newItem => {
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(item => {
                const itemID = item.id;

                if(itemID === newItem.id) {
                    item.name = newItem.name;
                    item.calories = newItem.calories;
                }
            });

            localStorage.setItem('items', JSON.stringify(items));
        },

        // Clears all items from storage
        clearStorage: () => {
            localStorage.removeItem('items');
        }
    }
})();