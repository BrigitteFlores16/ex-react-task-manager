export const initialState = {
  tasks: [],
  isLoading: true,
  error: null,
};

export const ACTIONS = {
  LOAD_TASKS: "LOAD_TASKS",
  ADD_TASK: "ADD_TASK",
  REMOVE_TASK: "REMOVE_TASK",
  UPDATE_TASK: "UPDATE_TASK",
  REMOVE_MULTIPLE_TASKS: "REMOVE_MULTIPLE_TASKS",
  SET_ERROR: "SET_ERROR",
  SET_LOADING: "SET_LOADING",
};

export function tasksReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_TASKS:
      return {
        ...state,
        tasks: action.payload,
        isLoading: false,
        error: null,
      };

    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case ACTIONS.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case ACTIONS.REMOVE_MULTIPLE_TASKS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => !action.payload.includes(task.id)),
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}
