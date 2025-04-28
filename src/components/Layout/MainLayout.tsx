import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import * as React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

function MainLayout({children}: LayoutProps) {
    
    return (
        <>
            <Header/>
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default MainLayout;