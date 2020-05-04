export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("game");
    if (serializedState === null) {
      return undefined;
    }
    const stateObj = JSON.parse(serializedState);
    return stateObj;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("game", serializedState);
  } catch (err) {
    // ignore write errors
  }
};
