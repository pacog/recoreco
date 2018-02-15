import React from 'react';

import Paper from 'material-ui/Paper';
import Categories from '../../core/constants/categories';
import { blue300 } from 'material-ui/styles/colors';

const styles = {
    card: {
        margin: 8,
        padding: '2px 6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 6
    },
    text: {
        fontSize: 12
    }
};

export const FilmCategoryButton = createCategoryButton(Categories.movie);
export const TVShowCategoryButton = createCategoryButton(Categories.tvshow);
export const BookCategoryButton = createCategoryButton(Categories.book);
export const PlaceCategoryButton = createCategoryButton(Categories.place);
export const DocumentaryCategoryButton = createCategoryButton(Categories.documentary);
export const GameCategoryButton = createCategoryButton(Categories.game);
export const MusicCategoryButton = createCategoryButton(Categories.music);

function createCategoryButton(category) {
    class CategoryButton extends React.Component {
        constructor(props) {
            super(props);
            this.handleClick = this._onClick.bind(this);
        }
        _onClick() {
            if(this.props.onSelect) {
                this.props.onSelect(category.id);
            }
        }
        getZDepth() {
            if(this.props.selected) {
                return 1;
            }
            return 2;
        }
        getCardStyle() {
            const bgColorStyle = this.props.selected? {backgroundColor: blue300} : {};
            return Object.assign({}, styles.card, bgColorStyle);
        }
        render() {
            return (
                <Paper zDepth={this.getZDepth()}
                    {...this.props}
                    style={this.getCardStyle()}
                    onClick={this.handleClick}
                    >
                    <category.Icon style={styles.icon} />
                    <span style={styles.text}>{category.name} {this.props.selected}</span>
                </Paper>
            )
        }
    }
    CategoryButton.propTypes = {
        onSelect: React.PropTypes.func,
        selected: React.PropTypes.bool
    };
    return CategoryButton;
};
