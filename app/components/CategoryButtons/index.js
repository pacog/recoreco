import React from 'react';

import Paper from 'material-ui/Paper';
import IconFilm from 'material-ui/svg-icons/action/theaters';
import IconTVShow from 'material-ui/svg-icons/hardware/tv';

const styles = {
    card: {
        margin: 4,
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
export const TVShowCategoryButton = createCategoryButton(IconTVShow, 'Tv show');

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
