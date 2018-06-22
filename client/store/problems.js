import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PROBLEMS = 'GET_PROBLEMS'
const GET_SINGLE_PROBLEM = 'GET_SINGLE_PROBLEM'
const ADD_PROBLEM = 'ADD_PROBLEM'
const UPDATE_PROBLEM = 'UPDATE_PROBLEM'
const REMOVE_PROBLEM = 'REMOVE_PROBLEM'

/**
 * INITIAL STATE
 */
const initialState = []
/**
 * ACTION CREATORS
 */
const getProblems = problems => ({type: GET_PROBLEMS, problems})
const getSingleProblem = problem => ({type: GET_SINGLE_PROBLEM, problem})
const addProblems = problem => ({type: ADD_PROBLEM, problem})
const updateProblems = problem => ({type: UPDATE_PROBLEM, problem})
const removeProblems = problem => ({type: REMOVE_PROBLEM, problem})

/**
 * THUNK CREATORS
 */
export const fetchProblems = () => {
    return dispatch => {
        axios.get('/api/problems')
        .then(res => res.data)
        .then(problems => {
            dispatch(getProblems(problems))
        })
        .catch(console.error)
    }
}

export const fetchSingleProblem = (problemId) => {
    return dispatch => {
        axios.get(`/api/problems/${problemId}`)
          .then(res => res.data)
          .then(singleProblem => {
            dispatch(getSingleProblem(singleProblem))
          })
          .catch(console.error)
    }
}

export const postProblem = (problem) => {
    return dispatch => {
        axios.post('/api/problems', problem)
        .then(res => res.data)
        .then(createdProblem => {
            dispatch(addProblems(createdProblem))
        })
        .catch(console.error)
    }
}

export const putProblem = (id, problem) => {
    return dispatch => {
        axios.put(`/api/problems/${id}`, {...problem})
        .then(res => res.data)
        .then(updatedProblem => {
            const problem = updatedProblem[1]
            dispatch(updateProblems(problem))
        })
        .catch(console.error)
    }
}

export const deleteProblem = (id, problem) => {
    return dispatch => {
        axios.delete(`/api/problems/${id}`, {...problem})
        .then(res => res.data)
        .then(deletedProblem => {
            dispatch(removeProblems(deletedProblem))
        })
        .catch(console.error)
    }
}

//Reducer
export default function (state = initialState, action) {
    switch (action.type){
        case GET_PROBLEMS: {
            return {
                ...state,
                allProblems: action.problems
            }
        }
        case GET_SINGLE_PROBLEM: {
            return {
              ...state,
              singleProblem: action.singleProblem
            }
        }
        case ADD_PROBLEM: {
            return {
                ...state,
                allProblems: [...state.allProblems, action.problem]
            }
        }
        case UPDATE_PROBLEM: {
            return {
                ...state,
                allProblems: [...state.allProblems.filter(prod => prod.id !== action.problem.id), action.problem]
            }
        }
        default: {
            return state
        }
    }
}

