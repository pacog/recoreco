import React from 'react';

import { FilmCategoryButton,
         TVShowCategoryButton,
         BookCategoryButton,
         PlaceCategoryButton,
         DocumentaryCategoryButton,
         GameCategoryButton,
         MusicCategoryButton,
     } from '../CategoryButtons';

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '10px'
};

const CategorySelector = ( /*{value, onChange}*/) => {
    return (
        <div style={containerStyle}>
            <FilmCategoryButton />
            <TVShowCategoryButton />
            <BookCategoryButton />
            <PlaceCategoryButton />
            <DocumentaryCategoryButton />
            <GameCategoryButton />
            <MusicCategoryButton />
        </div>
    );
};

// CategorySelector.propTypes = {
//   // active: React.PropTypes.oneOf(['toWatch','history', 'add'])
// };

export default CategorySelector;
