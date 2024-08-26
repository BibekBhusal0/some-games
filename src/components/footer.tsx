import { ThemeSwitch } from "@/components/theme-switch";
import { FaGithub } from "react-icons/fa";
import { LuGlobe } from "react-icons/lu";
import { Tooltip } from "@nextui-org/tooltip";
import { Link } from "@nextui-org/link";

export const Footer = () => {
  const links = [
    {
      name: "View Source Code in Github",
      link: "https://github.com/BibekBhusal0/some-games",
      icon: <FaGithub />,
    },
    {
      name: "View on Website",
      link: "https://bibekbhusal0.github.io/some-games/",
      icon: <LuGlobe />,
    },
  ];
  return (
    <div className="w-full flex gap-2 justify-between px-3 items-center absolute bottom-4 left-0">
      <ThemeSwitch />
      <div className="flex justify-evenly gap-4">
        {links.map(({ name, link, icon }) => (
          <Tooltip key={name} showArrow content={name}>
            <Link
              isExternal
              className="text-xl "
              color="foreground"
              href={link}>
              {icon}
            </Link>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
