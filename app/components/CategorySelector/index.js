import React from 'react';

import Categories from '../../core/constants/categories';
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

const CategorySelector = ({value, onChange}) => {
    const handleSelection = (valueSelected) => {
        if(onChange) {
            onChange(valueSelected);
        }
    };
    return (
        <div style={containerStyle}>
            <FilmCategoryButton onSelect={handleSelection} selected={value==='movie'}/>
            <TVShowCategoryButton onSelect={handleSelection} selected={value==='tvshow'} />
            <BookCategoryButton onSelect={handleSelection} selected={value==='book'} />
            <PlaceCategoryButton onSelect={handleSelection} selected={value==='place'} />
            <DocumentaryCategoryButton onSelect={handleSelection} selected={value==='documentary'} />
            <GameCategoryButton onSelect={handleSelection} selected={value==='game'} />
            <MusicCategoryButton onSelect={handleSelection} selected={value==='music'} />
        </div>
    );
};

CategorySelector.propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.oneOf(Object.keys(Categories))
};

export default CategorySelector;
