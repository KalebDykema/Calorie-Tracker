// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
    // Event Listeners
    const loadEventListeners = () => {
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors();
        
        // Disable submit on enter
        document.addEventListener('keypress', e => {
            if(e.keyCode === 13 || e.which === 13) e.preventDefault();
        });

        // Item add submit listener
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // Edit item button listeners
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        // Update item submit listener
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
        
        // Delete item listener
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
        
        // Back button listener
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
        
        // Clear All button listener
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllClick);
    }

    // Item add submit function
    const itemAddSubmit = e => {
        // Assigns item input values to variable
        const input = UICtrl.getItemInput();

        // Check for name and calories input
        if(input.name !== '' && !input.calories !== '') {
            // Add item to data
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            // Add list item to UI
            UICtrl.addListItem(newItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            // Write to storage
            StorageCtrl.storeItem(newItem);
            
            // Clear fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    // Updates form UI upon edit button click on item
    const itemEditClick = e => {
        if(e.target.classList.contains('edit-item')) {
            // Get list item id
            const listId = e.target.parentNode.parentNode.id;
            
            // Breawk into an array to get just number of ID
            const listIdArr = listId.split('-');
            
            // Get actual ID
            const id = parseInt(listIdArr[1]);
            
            // Get item
            const itemToEdit = ItemCtrl.getItemById(id);            

            // Set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add item to form
            UICtrl.addItemToForm();
        }
        
        e.preventDefault();
    }

    // Item update submit function
    const itemUpdateSubmit = e => {
        // Get form input
        const input = UICtrl.getItemInput();

        // Updates item in data~
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        // Updates item in UI
        UICtrl.updateListItem(updatedItem);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Update item in storage
        StorageCtrl.updateItemInStorage(updatedItem);

        // Clears edit state
        UICtrl.clearEditState();

        e.preventDefault();
    }

    // Delete item submit function
    const itemDeleteSubmit = e => {
        // Get current item
        const currentItem = ItemCtrl.getCurrentItem();

        // Delete from data
        ItemCtrl.deleteItem(currentItem.id);

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Delete from storage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        // Clears edit state
        UICtrl.clearEditState();

        e.preventDefault();
    }

    // Clear all button function
    const clearAllClick = e => {
        // Clear from data
        ItemCtrl.clearItems();

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Clears storage
        StorageCtrl.clearStorage();

        // Clears edit state
        UICtrl.clearEditState();

        // Clear from UI
        UICtrl.clearListItems();

        e.preventDefault();
    }

    // Public methods
    return {
        // Method to call upon page loading
        init: () => {
            // Gets rid of buttons for edit state
            UICtrl.clearEditState();

            // Assign item data to variable
            const items = ItemCtrl.getData();

            // Check for items
            if(items.length === 0) {
                // Hide item list when nothing's in it
                UICtrl.hideList();
            } else {
                // Put item data in UI
                UICtrl.populateItemList(items);
                // Get total calories
                const totalCalories = ItemCtrl.getTotalCalories();
                // Add total calories to UI
                UICtrl.showTotalCalories(totalCalories);
            }

            // Load Event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, StorageCtrl, UICtrl);

App.init();