"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { LucideMoon, LucideSun } from "lucide-react";

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                
                {theme === 'light' ? <LucideSun /> : <LucideMoon />}
                
                <span className="sr-only">Toggle theme</span>
            </Button>
    );
}

export { ThemeSwitcher };