const colors = {
  dark: {
    main_bg: "#080808",
    main_border: "gray",
    main_point_color: "#70a2ff",
  },
  purple: {
    main_bg: "#f7f0ff",
    main_border: "gray",
    main_point_color: "purple",
  },
  point_dark: {
    main_bg: "#161725",
    main_border: "gray",
    main_point_color: "orange",
  },
  light: {
    main_bg: "#ffffff",
    main_border: "gray",
    main_point_color: "#09004f",
  },
};

const theme = {
  colors,
};

export type CustomThemeType = {
  colors: {
    main_bg: string;
    main_border: string;
    main_point_color: string;
  };
};

export default theme;
