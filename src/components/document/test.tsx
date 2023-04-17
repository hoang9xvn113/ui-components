import React, { ChangeEventHandler, TextareaHTMLAttributes, InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;
type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

interface Props {
  type: 'text' | 'textarea';
}

const Input: React.FC<Props & InputProps & TextAreaProps> = ({ type, ...props }) => {
  const renderInput = () => {
    return <input type="text" {...props} />;
  };

  const renderTextArea = () => {
    return <textarea {...props} />;
  };

  return type === 'textarea' ? renderTextArea() : renderInput();
};

export default Input;