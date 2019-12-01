const combineReducers = (reducer: any) => {
  return (state: any = {}, action: any) => {
    const keys = Object.keys(reducer);
    const nextReducers: any = {};
    for (let i = 0; i < keys.length; i++) {
      const invoke = reducer[keys[i]](state[keys[i]], action);
      nextReducers[keys[i]] = invoke;
    }
    return nextReducers;
  };
};

export default combineReducers;
