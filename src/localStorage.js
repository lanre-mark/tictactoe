export const loadState = () => {
  try {
    // console.log("Loading State");
    const serializedState = localStorage.getItem("game");
    if (serializedState === null) {
      // console.log("But nothing yet in state");
      return undefined;
    }
    const stateObj = JSON.parse(serializedState);
    // temporarily return null until computer simulation is completed
    return null; //stateObj;
  } catch (err) {
    // console.log("loading State Error ::", err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    // console.log("Saving State");
    const serializedState = JSON.stringify(state);
    localStorage.setItem("game", serializedState);
  } catch (err) {
    // ignore write errors
    // console.log("Saving State Error ::", err);
  }
};
