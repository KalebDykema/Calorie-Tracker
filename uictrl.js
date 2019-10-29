// UI Controller
const UICtrl = (function() {
    // UI selectors object
    const UISelectors = {
        itemList: '#item-list',
        listItem: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
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

        // Grabs right li element based on ID and updates it
        updateListItem: item => {
            let listItems = document.querySelectorAll(UISelectors.listItem);

            // Turn node into srray
            listItems = Array.from(listItems);

            listItems.forEach(listItem => {
                const itemID = listItem.id;

                if(itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `
                        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                        <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                        </a>
                    `;
                }
            });
        },

        // Deletes list item from UI
        deleteListItem: id => {
           const itemId = `#item-${id}`;
           const item = document.querySelector(itemId);
           item.remove();
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
        getSelectors: () => UISelectors,

        // Clears all list items
        clearListItems: () => {
            document.querySelector(UISelectors.itemList).innerHTML = '';

            UICtrl.hideList();
        }
    }
})();