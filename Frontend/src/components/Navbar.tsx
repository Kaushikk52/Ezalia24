'use client';
import type React from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Heart,
  Icon,
  LogOut,
  Menu,
  Settings,
  Shirt,
  ShoppingBag,
  SprayCan,
  User,
  X,
} from "lucide-react";
import { bottleBaby, dress, flowerPot } from "@lucide/lab";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SearchBar } from "@/components/Searchbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import axios from "axios";
import AuthPopup from "@/components/AuthPopup";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function Navbar() {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    "mens" | "womens" | "kids" | "beauty" | "home"
  >("womens");
  const [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    token: "",
  });
  const [toggle, setToggle] = useState(false);
  const [navigateTo, setNavigateTo] = useState("");
  const navigate = useRouter();
  const [loginStatus, setLoginStatus] = useState(false);

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
      href={href}
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
      href={href}
      className="flex flex-row items-center p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200"
      onClick={onClick}
    >
      <div className="text-gray-600">{icon}</div>
      <div className="ml-2 flex flex-col">
        <div className="font-semibold font-playfair">{title}</div>
        <p className="text-sm text-gray-500 font-merriweather">{description}</p>
      </div>
    </Link>
  );

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0 },
  };

  const isTokenExpired = (token: any) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      // Check if the token has an 'exp' property and if it's a number
      if (!decoded.exp || typeof decoded.exp !== "number") {
        return true; // Token is invalid or doesn't have an expiration time
      }
      return decoded.exp * 1000 < Date.now();
    } catch (err: any) {
      console.log(err.message);
      return true;
    }
  };

  const getUser = async () => {
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (!token) {
          setCurrentUser({
            firstName: "",
            lastName: "",
            email: "",
            role: "",
            token: "",
          });
          return;
        }
        const response = await axios.get(`${baseURL}/v1/api/user/principal`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 401) {
          setCurrentUser({
            firstName: "",
            lastName: "",
            email: "",
            role: "",
            token: "",
          });
          localStorage.removeItem("token");
        } else {
          setCurrentUser(response.data.users);
          setLoginStatus(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setToggle(false);
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUser();
    }
  }, [localStorage.getItem("token")]);

  const checkIfLogin = (route: string) => {
    if(window !== undefined){
      const token = localStorage.getItem("token");
      const isExpired = isTokenExpired(token);
      if (isExpired && loginStatus === false) {
        if(typeof window !== "undefined"){
          localStorage.removeItem("token");
          toast.error("Login is required");
        }
      } else {
        getUser();
      }
      // console.log("check if login", route, token);
    setNavigateTo(route);
    // console.log(route, toggle, token);
    if (token !== null && !toggle) {
      //user logged in and no popup
      navigate.push(route);
    } else if (token !== null && toggle === true) {
      //user logged in and still popup
      setToggle(false); // toggle not visible
    } else if (token === null) {
      //user not logged in
      setToggle(true); // toggle visible
    }
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      toggle && setToggle(false);
      setCurrentUser({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        token: "",
      });
      setLoginStatus(false);
      toast.success("Logged out successfully");
    }
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
          <Link href={"/"} className="flex items-center">
            <img src="/ezalia-logo.png" alt="" className="w-44 h-10 phone-none" />
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          <div
            className="relative group"
            onMouseEnter={() => setIsExploreOpen(true)}
            onMouseLeave={() => setIsExploreOpen(false)}
          >
            <button className="font-merriweather group relative text-base font-semibold text-gray-800 hover:text-gray-900 focus:outline-none">
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
                  className="absolute left-0 mt-2 w-screen max-w-2xl bg-white rounded-md shadow-lg py-1 z-20"
                >
                  <div className="flex">
                    {/* Left Side - Categories */}
                    <div className="w-1/2 bg-slate-50 p-2 h-full">
                      <button
                        className={`
              w-full text-left p-3 rounded-lg transition-colors duration-200 
              ${
                selectedCategory === "womens"
                  ? "bg-rose-100"
                  : "hover:bg-slate-50"
              }
            `}
                        onClick={() => setSelectedCategory("womens")}
                      >
                        <div className="font-semibold flex items-center font-playfair italic">
                          <Icon iconNode={dress} className="mr-2" size={18} />
                          Womens
                        </div>
                        <p className="text-sm text-gray-500 mt-1 font-merriweather">
                          Discover the latest in women’s fashion — dresses,
                          tops, ethnic wear, western styles & more.
                        </p>
                      </button>

                      <button
                        className={`
              w-full text-left p-3 rounded-lg transition-colors duration-200 
              ${
                selectedCategory === "mens" ? "bg-sky-100" : "hover:bg-slate-50"
              }
            `}
                        onClick={() => setSelectedCategory("mens")}
                      >
                        <div className="font-semibold flex items-center font-playfair italic">
                          <Shirt className="mr-2" size={18} />
                          Mens
                        </div>
                        <p className="text-sm text-gray-500 mt-1 font-merriweather">
                          Explore a wide range of men’s apparel — shirts,
                          t-shirts, jeans, formalwear & activewear.
                        </p>
                      </button>

                      <button
                        className={`
              w-full text-left p-3 rounded-lg transition-colors duration-200 
              ${
                selectedCategory === "kids"
                  ? "bg-yellow-100"
                  : "hover:bg-slate-50"
              }
            `}
                        onClick={() => setSelectedCategory("kids")}
                      >
                        <div className="font-semibold flex items-center font-playfair italic">
                          <Icon
                            iconNode={bottleBaby}
                            className="mr-2"
                            size={18}
                          />
                          Kids
                        </div>
                        <p className="text-sm text-gray-500 mt-1 font-merriweather">
                          Shop fun, colorful, & comfortable clothes for kids —
                          from infants to teens, for all occasions.
                        </p>
                      </button>

                      <button
                        className={`
              w-full text-left p-3 rounded-lg transition-colors duration-200 
              ${
                selectedCategory === "beauty"
                  ? "bg-purple-200"
                  : "hover:bg-slate-50"
              }
            `}
                        onClick={() => setSelectedCategory("beauty")}
                      >
                        <div className="font-semibold flex items-center font-playfair italic">
                          <SprayCan className="mr-2" size={18} />
                          Beauty
                        </div>
                        <p className="text-sm text-gray-500 mt-1 font-merriweather">
                          Elevate your look with skincare, makeup, & beauty
                          accessories from top brands.
                        </p>
                      </button>

                      <button
                        className={`
              w-full text-left p-3 rounded-lg transition-colors duration-200 
              ${
                selectedCategory === "home"
                  ? "bg-emerald-100"
                  : "hover:bg-slate-50"
              }
            `}
                        onClick={() => setSelectedCategory("home")}
                      >
                        <div className="font-semibold flex items-center font-playfair italic">
                          <Icon
                            iconNode={flowerPot}
                            className="mr-2"
                            size={18}
                          />
                          Home & Kitchen
                        </div>
                        <p className="text-sm text-gray-500 mt-1 font-merriweather">
                          Add style to your space with curated home décor,
                          kitchen essentials, & lifestyle accessories.
                        </p>
                      </button>
                    </div>

                    {/* Right Side - Dropdown Links */}
                    <div className="flex flex-col space-y-0.5">
                      {selectedCategory === "womens" && (
                        <>
                          <DropdownLink
                            href={`/listings/women/kurtis`}
                            title="Kurtis"
                            description={`Stylish kurtis for everyday wear & festive flair.`}
                          />
                          <DropdownLink
                            href={`/listings/women/sarees`}
                            title="Sarees"
                            description={`Traditional & designer sarees for every occasion.`}
                          />
                          <DropdownLink
                            href={`/listings/women/kurti-sets`}
                            title="Kurti Sets"
                            description={`Coordinated ethnic sets for a complete look.`}
                          />
                          <DropdownLink
                            href={`/listings/women/salwaar-material`}
                            title="Salwaar material"
                            description={`Unstitched salwaar fabrics in rich colors & patterns.`}
                          />
                          <DropdownLink
                            href={`/listings/women/night-wear`}
                            title="Night wear"
                            description={`Comfortable & chic nightwear for restful sleep.`}
                          />
                          <DropdownLink
                            href={`/listings/women/blouse`}
                            title="Blouse"
                            description={`Elegant blouses to pair with sarees & lehengas.`}
                          />
                        </>
                      )}

                      {selectedCategory === "mens" && (
                        <>
                          <DropdownLink
                            href={`/listings/men/shirt`}
                            title="Shirt"
                            description={`Smart casual & formal shirts for every look.`}
                          />
                          <DropdownLink
                            href={`/listings/men/tshirt`}
                            title="T-Shirt"
                            description={`Trendy & comfy t-shirts for everyday wear.`}
                          />
                          <DropdownLink
                            href={`/listings/men/waist-coat`}
                            title="Waist Coat"
                            description={`Sleek waistcoats for weddings & formal events.`}
                          />
                          <DropdownLink
                            href={`/listings/men/kurta`}
                            title="Kurta"
                            description={`Ethnic kurtas blending comfort & tradition.`}
                          />
                          <DropdownLink
                            href={`/listings/men/bottomwear`}
                            title="Bottomwear"
                            description={`Jeans, trousers & more for all-day comfort.`}
                          />
                        </>
                      )}

                      {selectedCategory === "kids" && (
                        <>
                          <DropdownLink
                            href={`/listings/kids/toys`}
                            title="Toys"
                            description="Fun toys that spark joy & creativity."
                          />
                          <DropdownLink
                            href={`/listings/kids/accessories`}
                            title="Kids Accessories"
                            description="Cool caps, belts, & bags for little ones."
                          />
                          <DropdownLink
                            href={`/listings/kids/stationary`}
                            title="Stationary"
                            description="Colorful stationery to make learning fun."
                          />
                          <DropdownLink
                            href={`/listings/kids/dress`}
                            title="Kids Dress"
                            description="Cute outfits for every kid’s moment."
                          />
                        </>
                      )}

                      {selectedCategory === "beauty" && (
                        <>
                          <DropdownLink
                            href={`/listings/beauty/footwear`}
                            title="Footwear"
                            description="Stylish, comfy pairs for every step."
                          />
                          <DropdownLink
                            href={`/listings/beauty/jewels`}
                            title="Jewels"
                            description="Everyday sparkle for every look."
                          />
                          <DropdownLink
                            href={`/listings/beauty/bags`}
                            title="Bags"
                            description="Chic bags for work or weekends."
                          />
                          <DropdownLink
                            href={`/listings/beauty/beauty`}
                            title="Beauty"
                            description="Essentials for skin, hair, & glow."
                          />
                          <DropdownLink
                            href={`/listings/beauty/dupatta-stoles`}
                            title="Dupatta & Stoles"
                            description="Finish your look with flair."
                          />
                        </>
                      )}

                      {selectedCategory === "home" && (
                        <>
                          <DropdownLink
                            href={`/listings/home/kitchenware`}
                            title="Kitchenware"
                            description="Essentials to elevate your cooking & dining."
                          />
                          <DropdownLink
                            href={`/listings/home/night-lamps`}
                            title="Night Lamps"
                            description="Add warmth & charm to your bedtime routine."
                          />
                          <DropdownLink
                            href={`/listings/home/personal-care`}
                            title="Personal Care"
                            description="Self-care tools for your daily wellness rituals."
                          />
                          <DropdownLink
                            href={`/listings/home/accessories`}
                            title="Home Accessories"
                            description="Style your space with modern décor accents."
                          />
                          <DropdownLink
                            href={`/listings/home/furnishing`}
                            title="Home Furnishing"
                            description="Soft furnishings for a cozy and elegant vibe."
                          />
                          <DropdownLink
                            href={`/listings/home/mugs`}
                            title="Mugs"
                            description="Sip in style with our designer mug collection."
                          />
                          <DropdownLink
                            href={`/listings/home/frame`}
                            title="Photo Frames"
                            description="Frame your memories with elegance & flair."
                          />
                          <DropdownLink
                            href={`/listings/home/coasters`}
                            title="Coasters"
                            description="Protect surfaces with style & practicality."
                          />
                          <DropdownLink
                            href={`/listings/home/hanging`}
                            title="Hanging Wall Art"
                            description="Artful pieces to bring your walls to life."
                          />
                          <DropdownLink
                            href={`/listings/home/holders`}
                            title="Keychain Holders"
                            description="Keep keys organized with creative wall hangers."
                          />
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <NavLink href="/about">
            <span className="text-black font-merriweather text-base">
              About
            </span>
          </NavLink>
          <NavLink href="/contact">
            <span className="text-black font-merriweather text-base">
              Contact
            </span>
          </NavLink>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          {/* Search - Base size */}
          <div className="relative w-auto">
            <SearchBar
              onSearch={(value) => console.log("Searching for:", value)}
            />
          </div>

          {/* Cart - 1x golden ratio size */}
          <div className="inline-block">
            <div className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="p-2.5 flex items-center justify-center rounded-full bg-slate-100 text-black group transition-colors hover:bg-slate-200"
                    onClick={() => navigate.push("/cart")}
                    aria-label="Shopping cart"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Your shopping cart is empty!</TooltipContent>
              </Tooltip>

              {/* Badge notification */}
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white font-bold font-merriweather rounded-full px-1.5 text-xs h-5 w-5 flex items-center justify-center">
                0
              </Badge>
            </div>
          </div>

          {/* Account - 1.6x golden ratio size */}

          {window!== undefined && localStorage.getItem("token") !== null && currentUser ? (
            <div
              className="relative"
              onMouseEnter={() => setIsAccountOpen(true)}
              onMouseLeave={() => setIsAccountOpen(false)}
            >
              <button className="group relative px-4 py-2 flex items-center space-x-2 justify-between rounded-full bg-slate-100 text-black transition-colors hover:bg-slate-200">
                <span className="hidden sm:inline-block font-medium font-merriweather">
                  {currentUser?.firstName}
                </span>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                  />
                  <AvatarFallback className="uppercase bg-slate-300 font-semibold">
                    {currentUser?.firstName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
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
                            className="w-5 h-5"
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
                        href="/"
                        onClick={handleLogout}
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
            <div className="flex items-center space-x-4 cursor-pointer">
              <button
                className="px-4 py-2 flex items-center justify-center rounded-full bg-slate-100 text-black group transition-colors hover:bg-slate-200 font-medium"
                onClick={() => checkIfLogin("/")}
              >
                Login
              </button>
              <AuthPopup
                popup={toggle}
                navigateTo={navigateTo}
                onLoginSuccess={getUser}
              />
            </div>
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
                href="/"
                className="block py-2 text-lg font-semibold text-gray-800 hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <div className="mt-0"></div>
              <Link
                href="/about"
                className="block py-2 text-lg font-semibold text-gray-800 hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/services"
                className="block py-2 text-lg font-semibold text-gray-800 hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/contact"
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
