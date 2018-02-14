import React from 'react';

import { FilmCategoryButton, TVShowCategoryButton } from '../CategoryButtons';

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px'
};

const CategorySelector = ( /*{value, onChange}*/) => {
    return (
        <div style={containerStyle}>
            <FilmCategoryButton />
            <TVShowCategoryButton />
        </div>
    );
};

// CategorySelector.propTypes = {
//   // active: React.PropTypes.oneOf(['toWatch','history', 'add'])
// };

export default CategorySelector;
