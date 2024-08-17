import MenuAnimation from "@/components/menu-items";
import { pages_link } from "./all_pages";

function Menu() {
  return (
    <div className="w-full flex flex-col justify-start text-center gap-5 h-[500px]">
      <h1 className="text-3xl pb-20">Game Logo</h1>
      <MenuAnimation menuItems={Object.keys(pages_link)} />
    </div>
  );
}

export default Menu;
