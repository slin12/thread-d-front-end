const defaultColors = [
  [
    "rgb(150, 187, 187)",
    "rgb(97, 137, 133)",
    "rgb(65, 69, 53)",
    "rgb(242, 227, 188)",
    "rgb(193, 152, 117)"
  ],
  [
    "rgb(27, 6, 94)",
    "rgb(255, 71, 218)",
    "rgb(255, 135, 171)",
    "rgb(252, 200, 194)",
    "rgb(245, 236, 205)"
  ],
  [
    "rgb(8, 96, 95)",
    "rgb(23, 126, 137)",
    "rgb(89, 131, 129)",
    "rgb(142, 147, 109)",
    "rgb(162, 173, 89)"
  ],
  [
    "rgb(219, 213, 110)",
    "rgb(136, 171, 117)",
    "rgb(45, 147, 173)",
    "rgb(125, 124, 132)",
    "rgb(222, 143, 110)"
  ],
  [
    "rgb(203, 212, 194)",
    "rgb(219, 235, 192)",
    "rgb(195, 178, 153)",
    "rgb(129, 83, 85)",
    "rgb(82, 50, 73)"
  ]
];

export default (state = defaultColors, action) => {
  switch (action.type) {
    case "ADD_COLOR":
      return [...state, action.colors];
    default:
      return state;
  }
};
