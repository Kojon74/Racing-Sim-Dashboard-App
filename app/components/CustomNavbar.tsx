import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import React from "react";

type Props = {};

const CustomNavbar = (props: Props) => {
  return (
    <Navbar className="bg-black" maxWidth="full">
      <NavbarBrand>
        <h3 className="text-2xl">Delta</h3>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link className="btn" href="/login">
            Log in
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="btn btn-outline" href="/signup">
            Sign up
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default CustomNavbar;
