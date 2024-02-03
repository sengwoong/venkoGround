
import { Search } from "./search";
import { Actions } from "./actions";
import Logo from "./logo";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-screen h-20 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
    <div className="flex w-11/12 mx-auto   justify-between ">
      <Logo/>
      <Search />
      <Actions />
    </div>
  </nav>
  
  );
};
