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
        <Link href="/">
          <h3>Delta</h3>
        </Link>
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
