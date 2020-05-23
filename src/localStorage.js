export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("ttt-game");
    if (serializedState === null) {
      return undefined;
    }
    const stateObj = JSON.parse(serializedState);
    return stateObj;
  } catch (err) {
    console.log("loading State Error ::", err);
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("ttt-game", serializedState);
  } catch (err) {
    // ignore write errors
    // console.log("Saving State Error ::", err);
  }
};

export const removeState = () => {
  try {
    localStorage.removeItem("ttt-game");
  } catch (err) {
    // ignore write errors
    // console.log("Remving State Error ::", err);
  }
};
