# Define a dictionary with element information
periodic_table = {
    'H': {
        'name': 'Hydrogen',
        'symbol': 'H',
        'atomic_number': 1,
        'electron_configuration': '1s¹',
        'charge': 'Neutral',
    },
    'He': {
        'name': 'Helium',
        'symbol': 'He',
        'atomic_number': 2,
        'electron_configuration': '1s²',
        'charge': 'Neutral',
    },
    'Li': {
        'name': 'Lithium',
        'symbol': 'Li',
        'atomic_number': 3,
        'electron_configuration': '1s² 2s¹',
        'charge': 'Neutral',
    },
    'Be': {
        'name': 'Beryllium',
        'symbol': 'Be',
        'atomic_number': 4,
        'electron_configuration': '1s² 2s²',
        'charge': 'Neutral',
    },
    'B': {
        'name': 'Boron',
        'symbol': 'B',
        'atomic_number': 5,
        'electron_configuration': '1s² 2s² 2p¹',
        'charge': 'Neutral',
    },
    # Add more elements here
}

# Function to retrieve element information
def get_element_info(symbol):
    """
    Retrieve element information.
    """
    element = periodic_table.get(symbol)
    if element:
        return element
    else:
        return "Element not found in the periodic table."

# Input from the user
user_symbol = input("Enter the symbol of the element: ").strip().capitalize()

# Get and display element information
element_info = get_element_info(user_symbol)
if isinstance(element_info, dict):
    print(f"Element Name: {element_info['name']}")
    print(f"Symbol: {element_info['symbol']}")
    print(f"Atomic Number: {element_info['atomic_number']}")
    print(f"Electron Configuration: {element_info['electron_configuration']}")
    print(f"Charge: {element_info['charge']}")
else:
    print(element_info)

