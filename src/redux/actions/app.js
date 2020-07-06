import {
  COLLPSE_CHANGE,
  TOGGLE_ALL,
  ACTION_SEARCH,
  DRAWER_OPEN_SIDEBAR,
  CLOSE_DRAWER_OPEN_SIDEBAR
} from "./constants";

export const getView = width => {
  let newView = "MobileView";
  if (width > 1220) {
    newView = "DesktopView";
  } else if (width > 767) {
    newView = "TabView";
  }
  return newView;
};

export const toggleCollapsed = () => ({
  type: COLLPSE_CHANGE
});
export const toggleAll = (width, height) => {
  const view = getView(width);
  const collapsed = view !== "DesktopView";
  return {
    type: TOGGLE_ALL,
    collapsed,
    view,
    height
  };
};
export const actionSearch = () => ({
  type: ACTION_SEARCH
});

export const actOpenSideBar = () => ({
  type: DRAWER_OPEN_SIDEBAR
});

export const actCloseSideBar = () => ({
  type: CLOSE_DRAWER_OPEN_SIDEBAR
});
