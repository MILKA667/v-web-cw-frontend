import { createContext, useState } from "react";

interface Result {
    name: string;
    image: string | undefined;
    video: string | undefined;
}

interface ResultContextValue {
    result: Result;
    setResult: (value: Result) => void;
}

export const ResultContext = createContext<ResultContextValue | undefined>(undefined);

export const ResultProvider = ({ children }: { children: any }) => {
    
    const [result, setResult] = useState<Result>({
        name: "",
        image: undefined,
        video: undefined,
    });

    return (
        <ResultContext.Provider value={{ result, setResult }}>
            {children}
        </ResultContext.Provider>
    );
};
