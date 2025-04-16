type CodeBlockProps = {
  title: string;
  description: string;
  code: string;
};

export default function CodeBlock({
  title,
  description,
  code,
}: CodeBlockProps) {
  return (
    <div className="bg-gray-800 text-white rounded p-4 mb-4 shadow-md">
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="mb-2 text-gray-300">{description}</p>
      <pre className="bg-black text-green-400 rounded p-3 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}
