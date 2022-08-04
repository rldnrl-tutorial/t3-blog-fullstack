import React, { createContext, useContext, ReactNode } from "react";
import CardDescription from "./CardDescription";
import CardImage from "./CardImage";
import CardReadMoreButton from "./CardReadMoreButton";
import CardTitle from "./CardTitle";

type CardContextType = {
  to: string;
};

export const CardContext = createContext<CardContextType>({
  to: "",
});

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("This component must be used within a <Card> component.");
  }

  return context;
};

type CardProps = {
  to: string;
  children?: ReactNode;
};

export default function Card({ to, children }: CardProps) {
  return (
    <CardContext.Provider value={{ to }}>
      <div className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        {children}
      </div>
    </CardContext.Provider>
  );
}

Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Image = CardImage;
Card.ReadMoreButton = CardReadMoreButton;
