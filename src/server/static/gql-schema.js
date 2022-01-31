module.exports = `
    """
    The Course represents a group of similar Dishes on the menu
    """
    type Course {
        """
        The sort index of the Course in the menu
        """
        sort: Int!
        """
        The Dishes of the Course
        """
        dishes: [Dish!]!
    }

    """
    The Dish represents the single item on the menu
    """
    type Dish {
        """
        The unique ID of the dish
        """
        id: ID!
        """
        The name of the dish
        """
        name: String!
        """
        The price of the dish
        """
        price: Float!
        """
        The amount of available units of the dish
        """
        stock: Int
        """
        The dishes to be excluded if this is selected
        """
        exclusions: [ID]
    }

    """
    The Menu represents the categorized dishes available in the restaurant
    """
    type Menu {
        """
        The starter category dishes
        """
        starters: Course!
        """
        The main category dishes
        """
        mains: Course!
        """
        The dessert category dishes
        """
        desserts: Course!
    }

    type Query {
        """
        The query to get the restaurant menu.
        """
        menu: Menu!
    }
`;
