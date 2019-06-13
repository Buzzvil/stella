interface ActionEvent {
  type: string;
}

interface EventReducer<T> {
  (state: T, action: ActionEvent): T;
}

interface Config<T> {
  [key: string]: EventReducer<T>;
}

export default <T>(config: Config<T>): EventReducer<T> => {
    return (state, action) => {
        if (config[action.type]) {
            return config[action.type](state, action);
        }
        return state;
    };
};
