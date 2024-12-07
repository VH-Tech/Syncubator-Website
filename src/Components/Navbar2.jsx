import React, { useState, useCallback, useEffect } from "react";
import {
  IconButton,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from "@material-tailwind/react";
import { Link as Scrolllink } from "react-scroll";
import { Bars3Icon } from "@heroicons/react/24/solid";
import "../App.css";
import { Link, useLocation } from "react-router-dom";

const NavItem = React.memo(({ to, children, offset = 0 }) => (
  <Typography className="px-3 py-3 text-xl transition duration-500 rounded-md hover:bg-gray-200">
    <Scrolllink
      to={to}
      smooth={true}
      duration={500}
      offset={offset}
      className="cursor-pointer"
    >
      {children}
    </Scrolllink>
  </Typography>
));

const Navbar2 = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullNav, setShowFullNav] = useState(true);
  const location = useLocation();

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNewsClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navItems = [
    { to: "4", label: "Product", hideOnNews: true },
    { to: "5", label: "Accessories", hideOnNews: true },
    { to: "7", label: "Team", hideOnNews: true },
    { to: "collabs", label: "Collaborators", offset: -150, hideOnNews: true },
    { to: "foot", label: "Contact" },
    { to: "home", label: "Home", hideOnNews: true },
    { to: "/news", label: "News", isExternal: true }
  ];

  useEffect(() => {
    setShowFullNav(!location.pathname.includes('/news'));
  }, [location]);

  return (
    <div className="fixed flex items-center justify-between w-screen h-24 px-10 text-black bg-white rounded-none md:h-20">
      <div className="w-2/3 p-3">
        <Typography variant="h3" className="font-logo text-3xl md:text-4xl bg-gradient-to-r from-[#EE1B49] to-[#FF99AA] bg-clip-text text-transparent">
          <Link to="/" onClick={handleLogoClick} className="cursor-pointer">
            Syncubator
          </Link>
        </Typography>
      </div>

      <div className="items-center justify-center hidden gap-8 pr-8 font-sans lg:flex">
        {navItems
          .filter(item => showFullNav || !item.hideOnNews)
          .map(item => (
            item.isExternal ? (
              <Typography key={item.to} className="px-3 py-3 text-xl transition duration-500 rounded-md hover:bg-gray-200">
                <Link to={item.to} onClick={handleNewsClick} className="cursor-pointer">
                  {item.label}
                </Link>
              </Typography>
            ) : (
              <NavItem key={item.to} to={item.to} offset={item.offset}>
                {item.label}
              </NavItem>
            )
          ))}
      </div>

      <div className="block text-black rounded-md lg:hidden bg-blue-gray-100">
        <Menu open={isOpen} handler={toggleMenu} placement="bottom-end">
          <MenuHandler>
            <IconButton variant="text">
              <Bars3Icon className="w-8 h-8" />
            </IconButton>
          </MenuHandler>
          <MenuList className="bg-white">
            {navItems
              .filter(item => showFullNav || !item.hideOnNews)
              .map(item => (
                item.isExternal ? (
                  <Link key={item.to} to={item.to} onClick={handleNewsClick} className="cursor-pointer">
                    <MenuItem onClick={toggleMenu}>{item.label}</MenuItem>
                  </Link>
                ) : (
                  <Scrolllink key={item.to} to={item.to} smooth={true} duration={500} offset={item.offset} className="cursor-pointer">
                    <MenuItem onClick={toggleMenu}>{item.label}</MenuItem>
                  </Scrolllink>
                )
              ))}
          </MenuList>
        </Menu>
      </div>
    </div>
  );
});

export default Navbar2;