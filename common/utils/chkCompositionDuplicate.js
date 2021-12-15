const chkCompositionDuplicate = (getValues, setError, clearErrors) => {
  const allValues = getValues(["composition1", "composition2", "composition3"]);

  const comp1Val = allValues["composition1"];
  const comp2Val = allValues["composition2"];
  const comp3Val = allValues["composition3"];
  if (
    (comp1Val === comp2Val && comp1Val !== "" && comp2Val !== "") ||
    (comp1Val === comp3Val && comp1Val !== "" && comp3Val !== "") ||
    (comp2Val === comp3Val && comp2Val !== "" && comp3Val !== "")
  ) {
    setError("composition1", {
      type: "duplicate",
      message: "選択が重複しています",
    });
  } else {
    clearErrors(["composition1", "composition2", "composition3"]);
  }
};

export { chkCompositionDuplicate };
