// Storage Controller

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
        items: [
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            // {id: 1, name: 'Cookie', calories: 400},
            // {id: 2, name: 'Eggs', calories: 300}
        ],
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

        // Returns data object
        logData: () => data
    }
})();

// UI Controller
const UICtrl = (function() {
    // UI selectors object
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        cardTitle: '.card-title'
    }

    // Public methods
    return {
        // Puts items into UI item list
        populateItemList: items => {
            let html = '';

            // Loops through teach item
            items.forEach(item => {
                html += `
                    <li class="collection-item" id="item-${item.id}">
                        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                        </a>
                    </li>
                `;
            })

            // Inserts items into UI
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        // Return item input values
        getItemInput: () => {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },

        // Adds new list item to the UI
        addListItem: item => {
            // Display list
            document.querySelector(UISelectors.itemList).style.display = 'block';

            // Create li
            let li = document.createElement('li');
            // Add classes
            li.className = 'collection-item';
            // Add id
            li.id = `item-${item.id}`;

            // Add content inside LI
            li.innerHTML = `
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            `;

            // Add li to UI
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },

        // Clear name and calorie inputs
        clearInput: () => {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        
        // Adds current item to form inputs
        addItemToForm: () => {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            // Changes UI to edit state
            UICtrl.showEditState();
        },

        // Shows buttons for edit state and hides add state
        showEditState: () => {
            document.querySelector(UISelectors.cardTitle).textContent = 'Edit Meal / Food Item';
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        
        // Hides buttons used in edit state
        clearEditState: () => {
            UICtrl.clearInput();
            document.querySelector(UISelectors.cardTitle).textContent = 'Add Meal / Food Item';
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        
        // Hide list; for when there's no items in it
        hideList: () => {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        // Shows the total calories in the UI
        showTotalCalories: totalCalories => {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },

        // Returns UISelectors
        getSelectors: () => UISelectors
    }
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
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
        console.log('test');

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
})(ItemCtrl, UICtrl);

App.init();