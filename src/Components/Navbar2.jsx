import React, { useState, useCallback } from "react";
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

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

  const navItems = [
    { to: "4", label: "Product" },
    { to: "5", label: "Accessories" },
    { to: "7", label: "Team" },
    { to: "collabs", label: "Collaborators", offset: -150 },
    { to: "foot", label: "Contact" }
  ];

  return (
    <div className="fixed flex items-center justify-between w-screen h-24 px-10 text-black bg-white rounded-none md:h-20">
      <div className="w-2/3 p-3">
        <Typography variant="h3" className="font-logo text-3xl md:text-4xl bg-gradient-to-r from-[#EE1B49] to-[#FF99AA] bg-clip-text text-transparent">
          <Scrolllink to="home" smooth={true} duration={500} className="cursor-pointer">
            Syncubator
          </Scrolllink>
        </Typography>
      </div>

      <div className="items-center justify-center hidden gap-8 pr-8 font-sans lg:flex">
        {navItems.map(item => (
          <NavItem key={item.to} to={item.to} offset={item.offset}>
            {item.label}
          </NavItem>
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
            {navItems.map(item => (
              <Scrolllink key={item.to} to={item.to} smooth={true} duration={500} offset={item.offset} className="cursor-pointer">
                <MenuItem onClick={toggleMenu}>{item.label}</MenuItem>
              </Scrolllink>
            ))}
          </MenuList>
        </Menu>
      </div>
    </div>
  );
});

export default Navbar2;