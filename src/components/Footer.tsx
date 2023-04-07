import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center h-16 bg-gray-800 text-white">
      <div className="text-lg font-bold">Pick-my-Meal</div>
      <div className="ml-4 text-sm">© {currentYear} All rights reserved</div>
    </footer>
  );
}

export default Footer;
