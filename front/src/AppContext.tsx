import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface AppContextType {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  errorContext: string;
  setErrorContext: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<AppContextType>({
  token: null,
  setToken: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
  errorContext: "",
  setErrorContext: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorContext, setErrorContext] = useState("");

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        errorMessage,
        setErrorMessage,
        errorContext,
        setErrorContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
