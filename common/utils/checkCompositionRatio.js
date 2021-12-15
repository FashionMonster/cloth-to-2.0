const checkCompositionRatio = (getValues, setError, clearErrors) => {
  const allValues = getValues([
    "compositionRatio1",
    "compositionRatio2",
    "compositionRatio3",
  ]);

  //数値変換
  const compRatio1Val = parseInt(
    allValues["compositionRatio1"] === "" ? 0 : allValues["compositionRatio1"]
  );
  const compRatio2Val = parseInt(
    allValues["compositionRatio2"] === "" ? 0 : allValues["compositionRatio2"]
  );
  const compRatio3Val = parseInt(
    allValues["compositionRatio3"] === "" ? 0 : allValues["compositionRatio3"]
  );

  //合計値が最大値を超えていないか
  if (compRatio1Val + compRatio2Val + compRatio3Val > 100) {
    setError("compositionRatio2", {
      type: "totalRatioMax",
      message: "合計最大値は100です",
    });
    //0又はマイナスが含まれていないか
  } else if (
    (allValues["compositionRatio1"] !== "" && compRatio1Val < 1) ||
    (allValues["compositionRatio2"] !== "" && compRatio2Val < 1) ||
    (allValues["compositionRatio3"] !== "" && compRatio3Val < 1)
  ) {
    setError("compositionRatio2", {
      type: "ratioNegative",
      message: "最小値は1です",
    });
  } else {
    clearErrors(["compositionRatio2"]);
  }
};

export { checkCompositionRatio };
