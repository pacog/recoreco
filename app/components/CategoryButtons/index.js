import React from 'react';

import Paper from 'material-ui/Paper';
import IconFilm from 'material-ui/svg-icons/action/theaters';
import IconTVShow from 'material-ui/svg-icons/hardware/tv';
import IconBook from 'material-ui/svg-icons/action/book';
import IconPlace from 'material-ui/svg-icons/maps/place';
import IconDocumentary from 'material-ui/svg-icons/action/account-balance';
import IconGame from 'material-ui/svg-icons/action/extension';
import IconMusic from 'material-ui/svg-icons/image/music-note';

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

export const FilmCategoryButton = createCategoryButton(IconFilm, 'Movie');
export const TVShowCategoryButton = createCategoryButton(IconTVShow, 'Tv Show');
export const BookCategoryButton = createCategoryButton(IconBook, 'Book');
export const PlaceCategoryButton = createCategoryButton(IconPlace, 'Place');
export const DocumentaryCategoryButton = createCategoryButton(IconDocumentary, 'Documentary');
export const GameCategoryButton = createCategoryButton(IconGame, 'Game');
export const MusicCategoryButton = createCategoryButton(IconMusic, 'Music');

function createCategoryButton(IconToUse, name) {
    return (props) => {
        return (
            <Paper zDepth={1}
                {...props}
                style={styles.card}
                >
                <IconToUse style={styles.icon} />
                <span style={styles.text}>{name}</span>
            </Paper>
        );
    };
};
