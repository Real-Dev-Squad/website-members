import contributionsData from '@components/member-profile/mock/contributions.json';
import { useReducer, useState, useContext, createContext } from 'react';
import PropTypes from 'prop-types';

function reducer(contributions, action) {
    console.log("action");
    console.log(action);
    if (action.type == 'set_contributions') {
        contributions = { ...action.payload.contributions }
    }
    else if (action.type == 'noteworthy') {
        for (var i = 0; i < contributions.all.length; i++) {
            if (contributions.all[i].task.title == action.payload.title) {
                contributions.all[i].task.isNoteworthy = true;
                contributions.all[i].task.isOther = false;
                var task = contributions.all[i];
                contributions.noteworthy = [...contributions.noteworthy, task];
                contributions.all.splice(i, 1);
                break;
            }
        }
        // for (var i = 0; i < contributions.other.length; i++) {
        //     if (contributions.other[i].task.title == action.payload.title) {
        //         contributions.other[i].task.isNoteworthy = true;
        //         contributions.other[i].task.isOther = false;
        //         var task = contributions.other[i];
        //         contributions.noteworthy = [...contributions.noteworthy, task];
        //         contributions.other.splice(i, 1);
        //         break;
        //     }
        // }
    }
    else if (action.type == 'all') {
        for (var i = 0; i < contributions.noteworthy.length; i++) {
            if (contributions.noteworthy[i].task.title == action.payload.title) {

                contributions.noteworthy[i].task.isNoteworthy = false;
                contributions.noteworthy[i].task.isOther = false;

                var task = contributions.noteworthy[i];
                contributions.all = [...contributions.all, task];
                contributions.noteworthy.splice(i, 1);
                break;
            }
        }

        // for (var i = 0; i < contributions.other.length; i++) {
        //     if (contributions.other[i].task.title == action.payload.title) {
        //         contributions.other[i].task.isNoteworthy = false;
        //         contributions.other[i].task.isOther = false;
        //         var task = contributions.other[i];
        //         contributions.all = [...contributions.all, task];
        //         contributions.other.splice(i, 1);
        //         break;
        //     }
        // }
    }
    else {
        for (var i = 0; i < contributions.noteworthy.length; i++) {
            if (contributions.noteworthy[i].task.title == action.payload.title) {

                contributions.noteworthy[i].task.isNoteworthy = false;
                contributions.noteworthy[i].task.isOther = true;

                var task = contributions.noteworthy[i];
                contributions.other = [...contributions.other, task];
                contributions.noteworthy.splice(i, 1);
                break;
            }
        }

        for (var i = 0; i < contributions.all.length; i++) {
            if (contributions.all[i].task.title == action.payload.title) {
                contributions.all[i].task.isNoteworthy = false;
                contributions.all[i].task.isOther = true;
                var task = contributions.all[i];
                contributions.other = [...contributions.other, task];
                contributions.all.splice(i, 1);
                break;
            }
        }
    }
    console.log("return action");
    console.log(contributions);
    return { ...contributions };
}

export const ContributionContext = createContext([]);

// function ContributionsContext() {
//     [contributions, dispatch] = useReducer(reducer, contributionsData);
//     dispatch({ type: 'noteworthy', payload: { title: title } });
// }

export const ContributionsProvider = ({ children }) => {
    console.log("contributionsData");
    // console.log(contributionsData);
    const [contributionsState, dispatch] = useReducer(reducer, {});//contributionsData
    console.log("contributions provider");
    console.log(contributionsState);
    return (
        <ContributionContext.Provider value={{ contributionsState, dispatch }}>
            {children}
        </ContributionContext.Provider>
    );
};

//export default { ContributionContext, ContributionsProvider };

ContributionsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
