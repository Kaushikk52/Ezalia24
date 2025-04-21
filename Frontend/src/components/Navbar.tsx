import type React from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  Baby,
  ChevronDown,
  EyeClosed,
  GalleryHorizontal,
  Heart,
  LogOut,
  Menu,
  Settings,
  Shirt,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoAnimation from "./LogoAnimation";
import { SearchBar } from "./Searchbar";

export default function Navbar() {
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    "mens" | "womens" | "kids" | "all"
  >("all");
  const navigate = useNavigate();

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      to={href}
      className="group relative text-white text-base font-medium hover:text-gray-900"
    >
      {children}
      <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );

  const DropdownLink = ({
    href,
    title,
    description,
    onClick,
    icon,
  }: {
    href: string;
    title: string;
    description: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  }) => (
    <Link
      to={href}
      className="flex flex-row items-center p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200"
      onClick={onClick}
    >
      <div className="text-gray-600">{icon}</div>
      <div className="ml-2 flex flex-col">
        <div className="font-semibold">{title}</div>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  );

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <div className="mx-auto px-4 py-4 flex justify-between items-center bg-white">
        <button
          className="text-gray-600 hover:text-gray-800 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
          <LogoAnimation />
        </div>
        <nav className="hidden md:flex space-x-8">
          <div
            className="relative group"
            onMouseEnter={() => setIsExploreOpen(true)}
            onMouseLeave={() => setIsExploreOpen(false)}
          >
            <button className="group relative text-base font-semibold text-gray-800 hover:text-gray-900 focus:outline-none">
              Catalogue
              <ChevronDown
                size={16}
                className="ml-1 inline-block transition-transform duration-200 group-hover:rotate-180"
              />
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <AnimatePresence>
              {isExploreOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-screen max-w-lg bg-white rounded-md shadow-lg py-1 z-20"
                >
                  <div className="flex">
                    {/* Left Side - Categories */}
                    <div className="w-1/2 bg-slate-50 p-2 h-full">
                      <button
                        className={`
              w-full text-left p-3 rounded-lg transition-colors duration-200 
              ${
                selectedCategory === "all" ? "bg-blue-100" : "hover:bg-slate-50"
              }
            `}
                        onClick={() => setSelectedCategory("all")}
                      >
                        <div className="font-semibold flex items-center">
                          <GalleryHorizontal className="mr-2" size={18} />
                          All
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Explore Projects & Properties
                        </p>
                      </button>

                      <button
                        className={`
              w-full text-left p-3 rounded-lg transition-colors duration-200 
              ${
                selectedCategory === "womens"
                  ? "bg-pink-200"
                  : "hover:bg-slate-50"
              }
            `}
                        onClick={() => setSelectedCategory("womens")}
                      >
                        <div className="font-semibold flex items-center">
                          <EyeClosed className="mr-2" size={18} />
                          Womens
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Explore residential & commercial properties
                        </p>
                      </button>

                      <button
                        className={`
              w-full text-left p-3 rounded-lg transition-colors duration-200 
              ${
                selectedCategory === "mens"
                  ? "bg-green-200"
                  : "hover:bg-slate-50"
              }
            `}
                        onClick={() => setSelectedCategory("mens")}
                      >
                        <div className="font-semibold flex items-center">
                          <Shirt className="mr-2" size={18} />
                          Mens
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Explore residential & commercial properties
                        </p>
                      </button>

                      <button
                        className={`
              w-full text-left p-3 rounded-lg transition-colors duration-200 
              ${
                selectedCategory === "kids"
                  ? "bg-yellow-200"
                  : "hover:bg-slate-50"
              }
            `}
                        onClick={() => setSelectedCategory("kids")}
                      >
                        <div className="font-semibold flex items-center">
                          <Baby className="mr-2" size={18} />
                          Kids
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Discover upcoming & ongoing real estate projects
                        </p>
                      </button>
                    </div>

                    {/* Right Side - Dropdown Links */}
                    <div className="grid gap-1 w-full">
                      <DropdownLink
                        href={`/listings/women/all`}
                        title="Womens"
                        description={`Discover all Womens Apparel`}
                      />
                      <DropdownLink
                        href={`/listings/all`}
                        title="Mens"
                        description={`Discover all Projects & Properties`}
                      />
                      <DropdownLink
                        href={`/listings/all`}
                        title="Kids"
                        description={`Discover all Projects & Properties`}
                      />
                      <DropdownLink
                        href={`/listings/all`}
                        title="Beauty"
                        description={`Discover all Projects & Properties`}
                      />
                      <DropdownLink
                        href={`/listings/all`}
                        title="Home & Kitchen"
                        description={`Discover all Projects & Properties`}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <NavLink href="/about">
            <span className="text-black">About</span>
          </NavLink>
          <NavLink href="/contact">
            <span className="text-black">Contact</span>
          </NavLink>
        </nav>
        <div className="hidden md:flex space-x-4">
          <SearchBar
            onSearch={(value) => console.log("Searching for:", value)}
          />
          <button
            className="px-4 py-2 md:px-4 md:py-2 flex items-center justify-center rounded-full bg-slate-100 text-black group text-sm md:text-base"
            onClick={() => navigate("/cart")}
          >
            <ShoppingBag className="w-3 h-3 md:w-5 md:h-5" />
          </button>

          {localStorage.getItem("token") !== null ? (
            <div
              className="relative"
              onMouseEnter={() => setIsAccountOpen(true)}
              onMouseLeave={() => setIsAccountOpen(false)}
            >
              <button className="group relative px-4 py-2 md:px-6 md:py-3 flex items-center justify-center rounded-full bg-slate-100 text-black group text-sm md:text-base">
                <span className="phone-none">Welcome</span>
                <ChevronDown
                  className={`w-5 h-5 md:w-6 md:h-6 transform transition-transform duration-300 ${
                    isAccountOpen === true ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {isAccountOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-20"
                  >
                    <div className="flex flex-col">
                      <DropdownLink
                        href="/wishlist"
                        title="Wishlist"
                        description="View your saved items"
                        icon={
                          <Heart
                            className="w-3 h-3 md:w-5 md:h-5"
                            fill="red"
                            stroke="none"
                            fillOpacity="0.7"
                          />
                        }
                      />
                      <DropdownLink
                        href="/profile"
                        title="Profile"
                        description="View your profile"
                        icon={<User className="h-5 w-5" />}
                      />
                      <DropdownLink
                        href="/settings"
                        title="Settings"
                        description="Manage your account settings"
                        icon={<Settings className="h-5 w-5" />}
                      />
                      <DropdownLink
                        href="/logout"
                        title="Logout"
                        description="Sign out of your account"
                        icon={<LogOut className="h-5 w-5" />}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              className="px-4 py-2 md:px-4 md:py-2 flex items-center justify-center rounded-full bg-slate-100 text-black group text-sm md:text-base"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <div className="text-xl font-semibold text-gray-800 flex items-center">
                <svg viewBox="0 0 100 100" className="w-5 h-5">
                  <path
                    d="M50,30 C35,10 0,15 0,50 C0,80 40,90 50,100 C60,90 100,80 100,50 C100,15 65,10 50,30 Z"
                    fill="#e41e26"
                  />
                </svg>
                {/* apply text spacing */}
                <a
                  className="text-2xl font-bold leading-none text-[#0099cc] items-stretch"
                  href="/"
                >
                  ezalia
                </a>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              <Link
                to="/"
                className="block py-2 text-lg font-semibold text-gray-800 hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <div className="mt-0"></div>
              <Link
                to="/about"
                className="block py-2 text-lg font-semibold text-gray-800 hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/services"
                className="block py-2 text-lg font-semibold text-gray-800 hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="block py-2 text-lg font-semibold text-gray-800 hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
