// Item Controller
const ItemCtrl = (function() {
    // Item constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Items data
    const data = {
        // items: [
        //     // {id: 0, name: 'Steak Dinner', calories: 1200},
        //     // {id: 1, name: 'Cookie', calories: 400},
        //     // {id: 2, name: 'Eggs', calories: 300}
        // ],
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    // Public methods
    return {
        // Returns data items
        getData: () => data.items,

        // Adds item to data items
        addItem: (name, calories) => {
            let id;
            // Generate ID
            if(data.items.length > 0) {
                // Gets the id of last item on the list and adds one
                id = data.items[data.items.length-1].id + 1
            } else {
                id = 0;
            }

            // Parse calories to int
            calories = parseInt(calories);

            // Create new item
            const newItem = new Item(id, name, calories);

            // Adds items to data items array
            data.items.push(newItem);

            // Returns new item
            return newItem;
        },

        // Returns item by ID
        getItemById: id => {
            let found = null;
            
            data.items.forEach(item => {
                if(item.id === id) found = item;
            });
            
            return found;
        },
        
        // Updates item
        updateItem(name, calories) {
            // Calories to number
            calories = parseInt(calories);
            
            let found = null;
            
            data.items.forEach(item => {
                if(item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    
                    found = item;
                }
            });
            
            return found;
        },
        
        // Delete item from data items
        deleteItem: id => {
            data.items.forEach(item => {
                if(item.id === id){
                    let index = data.items.indexOf(item);
                    data.items.splice(index, 1);
                }
            });
        },

        // Returns current item object
        getCurrentItem: () => data.currentItem,
        
        // Returns and add calories of all items
        getTotalCalories: () => {
            let totalCalories = 0;

            data.items.forEach(item => {
                totalCalories += item.calories;
            });

            data.totalCalories = totalCalories;

            return totalCalories;
        },

        // Sets current item
        setCurrentItem: item => data.currentItem = item,

        // Clears all item data
        clearItems: () => data.items = [],

        // Returns data object
        logData: () => data
    }
})();