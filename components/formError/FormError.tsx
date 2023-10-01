const FormError = ({ content }: FormErrorProps) => {
  return <p className="text-red-500 text-xs mb-1">{content}</p>;
};

export default FormError;

type FormErrorProps = {
  content: string;
};
