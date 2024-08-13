export type NavBarProps = {
  user: any;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuIsOpen: boolean;
  setNotificationIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notificationIsOpen: boolean;
  profileIsOpen: boolean;
  setProfileIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  asPathNestedRoutes: string[];
  pathnameNestedRoutes: string[];
};
