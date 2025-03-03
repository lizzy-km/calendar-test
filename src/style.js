export function flex(type) {
  const flex = {
    display: "flex",
    flexDirection: type | "row",
  };
}

export function padding(type) {
  const padding = {
    padding: type | "8px",
  };
}
