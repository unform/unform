export default function useField(name: string): {
    fieldName: string;
    registerField: (field: import("./types").UnformField) => void;
    defaultValue: any;
    error: string;
};
//# sourceMappingURL=useField.d.ts.map