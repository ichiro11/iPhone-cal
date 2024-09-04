"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [result, setResult] = useState("0");
  const [isNewCalculation, setIsNewCalculation] = useState(true);

  const handleInput = (value: string) => {
    setDisplay((prev) => {
      if (isNewCalculation) {
        setIsNewCalculation(false);
        return value === "." ? "0." : value;
      }
      if (prev === "0" && value !== ".") return value;
      return prev + value;
    });
  };

  const handleOperator = (operator: string) => {
    setDisplay((prev) => {
      const lastChar = prev.slice(-1);
      if (["+", "-", "×", "÷"].includes(lastChar)) {
        return prev.slice(0, -1) + operator;
      }
      return prev + " " + operator + " ";
    });
    setIsNewCalculation(false);
  };

  const handleClear = () => {
    setDisplay("0");
    setResult("0");
    setIsNewCalculation(true);
  };

  const handleEquals = () => {
    try {
      const sanitizedDisplay = display.replace(/×/g, "*").replace(/÷/g, "/");
      const calculatedResult = eval(sanitizedDisplay).toString();
      setResult(calculatedResult);
      setDisplay(calculatedResult);
      setIsNewCalculation(true);
    } catch (error) {
      setResult("Error");
      setIsNewCalculation(true);
    }
  };

  const handlePercentage = () => {
    try {
      const value = parseFloat(display) / 100;
      setDisplay(value.toString());
      setResult(value.toString());
    } catch (error) {
      setResult("Error");
      setIsNewCalculation(true);
    }
  };

  const handlePlusMinus = () => {
    setDisplay((prev) => {
      if (prev.startsWith("-")) {
        return prev.slice(1);
      } else {
        return "-" + prev;
      }
    });
  };

  const buttonConfig = [
    { label: "AC", action: handleClear, className: "bg-gray-300 text-black" },
    {
      label: "+/-",
      action: handlePlusMinus,
      className: "bg-gray-300 text-black",
    },
    {
      label: "%",
      action: handlePercentage,
      className: "bg-gray-300 text-black",
    },
    {
      label: "÷",
      action: () => handleOperator("÷"),
      className: "bg-orange-500 text-white",
    },
    {
      label: "7",
      action: () => handleInput("7"),
      className: "bg-gray-700 text-white",
    },
    {
      label: "8",
      action: () => handleInput("8"),
      className: "bg-gray-700 text-white",
    },
    {
      label: "9",
      action: () => handleInput("9"),
      className: "bg-gray-700 text-white",
    },
    {
      label: "×",
      action: () => handleOperator("×"),
      className: "bg-orange-500 text-white",
    },
    {
      label: "4",
      action: () => handleInput("4"),
      className: "bg-gray-700 text-white",
    },
    {
      label: "5",
      action: () => handleInput("5"),
      className: "bg-gray-700 text-white",
    },
    {
      label: "6",
      action: () => handleInput("6"),
      className: "bg-gray-700 text-white",
    },
    {
      label: "-",
      action: () => handleOperator("-"),
      className: "bg-orange-500 text-white",
    },
    {
      label: "1",
      action: () => handleInput("1"),
      className: "bg-gray-700 text-white",
    },
    {
      label: "2",
      action: () => handleInput("2"),
      className: "bg-gray-700 text-white",
    },
    {
      label: "3",
      action: () => handleInput("3"),
      className: "bg-gray-700 text-white",
    },
    {
      label: "+",
      action: () => handleOperator("+"),
      className: "bg-orange-500 text-white",
    },
    {
      label: "0",
      action: () => handleInput("0"),
      className: "col-span-2 bg-gray-700 text-white",
    },
    {
      label: ".",
      action: () => handleInput("."),
      className: "bg-gray-700 text-white",
    },
    { label: "=", action: handleEquals, className: "bg-orange-500 text-white" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-80 p-4 bg-black rounded-lg shadow-lg">
        <div className="mb-4 bg-black text-white rounded-md overflow-hidden h-24 flex flex-col justify-end items-end p-2">
          <div className="text-2xl font-light mb-1 h-8 overflow-hidden">
            {display}
          </div>
          <div className="text-4xl font-semibold h-12 overflow-hidden">
            {result}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttonConfig.map((button, index) => (
            <Button
              key={index}
              className={`${button.className} ${
                button.label === "0" ? "col-span-2" : ""
              } rounded-full text-2xl font-semibold h-16 hover:opacity-80`}
              onClick={button.action}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
