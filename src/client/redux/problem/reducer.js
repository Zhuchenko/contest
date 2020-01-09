import {handleActions} from 'redux-actions'
import * as actions from './actions'

const initialState = {
    problems: [],
    creatingDialogIsOpen: false,
    isCreating: false,
    error: ''
};

const problemReducer = handleActions(
    {
        [actions.init]: () => initialState,

        [actions.getProblemsSuccess]: (state, {payload}) => ({...state, problems: payload.problems}),

        [actions.openProblemCreatingDialog]: (state) => ({
            ...state,
            creatingDialogIsOpen: true,
            isCreating: false,
            error: ''
        }),

        [actions.closeProblemCreatingDialog]: (state) => ({
            ...state,
            creatingDialogIsOpen: false,
            isCreating: false,
            error: ''
        }),

        [actions.addProblem]: (state) => ({
            ...state,
            creatingDialogIsOpen: true,
            isCreating: true,
            error: ''
        }),

        [actions.addProblemSuccess]: (state) => ({
            ...state,
            creatingDialogIsOpen: false,
            isCreating: false,
            error: ''
        }),

        [actions.addProblemFailure]: (state, {payload}) => ({
            ...state,
            creatingDialogIsOpen: true,
            isCreating: false,
            error: payload.error
        }),
    },
    initialState
);

export default problemReducer