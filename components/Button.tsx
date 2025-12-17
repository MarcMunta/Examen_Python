import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyle = "px-6 py-3 rounded font-bold transition-all duration-200 uppercase tracking-wider transform hover:-translate-y-1 active:translate-y-0 shadow-lg border-b-4";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-800 shadow-indigo-900/50",
    secondary: "bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-900 shadow-slate-900/50",
    danger: "bg-red-600 hover:bg-red-500 text-white border-red-800 shadow-red-900/50",
    success: "bg-green-600 hover:bg-green-500 text-white border-green-800 shadow-green-900/50",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};