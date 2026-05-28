'use client';

import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import { Menu, X } from "lucide-react";
import { Show, UserButton } from "@clerk/nextjs";
import { useState } from "react";
import {cn} from "@/lib/utils";

const navItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new" },
    { label: "Pricing", href: "/subscriptions" },
]

const Navbar = () => {
    const pathName = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <header className="w-full fixed top-0 z-50 bg-(--bg-primary) border-b border-(--border-subtle)">
            <div className="wrapper navbar-height py-4 flex justify-between items-center">
                <Link href="/" className="flex gap-2 items-center" onClick={closeMenu}>
                    <Image
                        src="/assets/image.png"
                        alt="Bookified"
                        width={36}
                        height={36}
                        className="navbar-logo-image"
                    />  
                    <span className="logo-text">Bookified</span>
                </Link>

                <nav className="hidden md:flex w-fit gap-7.5 items-center">
                    {navItems.map(({ label, href }) => {
                        const isActive = pathName === href || (href !== '/' && pathName.startsWith(href));

                        return (
                            <Link href={href} key={label} className={cn('nav-link-base', isActive ? 'nav-link-active' : 'text-black hover:opacity-70')}>
                                {label}
                            </Link>
                        )
                    })}

                    <div className="flex gap-7.5 items-center">
                        <Show when="signed-out">
                            <Link href="/sign-in" className="text-sm text-slate-700 hover:text-slate-900 transition">
                                Sign In
                            </Link>
                            <Link href="/sign-up" className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 inline-flex items-center justify-center">
                                Sign Up
                            </Link>
                        </Show>

                        <Show when="signed-in">
                            <div className="nav-user-link flex items-center gap-3">
                                <UserButton />
                            </div>
                        </Show>
                    </div>
                </nav>

                <button
                    type="button"
                    className="nav-menu-button md:hidden"
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((current) => !current)}
                >
                    {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>
            </div>

            {isOpen && (
                <div className="nav-mobile-panel md:hidden">
                    <nav className="wrapper nav-mobile-content">
                        {navItems.map(({ label, href }) => {
                            const isActive = pathName === href || (href !== '/' && pathName.startsWith(href));

                            return (
                                <Link
                                    href={href}
                                    key={label}
                                    onClick={closeMenu}
                                    className={cn('nav-mobile-link', isActive ? 'nav-mobile-link-active' : 'text-black')}
                                >
                                    {label}
                                </Link>
                            )
                        })}

                        <div className="nav-mobile-auth">
                            <Show when="signed-out">
                                <Link href="/sign-in" onClick={closeMenu} className="nav-mobile-link text-black">
                                    Sign In
                                </Link>
                                <Link href="/sign-up" onClick={closeMenu} className="nav-mobile-sign-up">
                                    Sign Up
                                </Link>
                            </Show>

                            <Show when="signed-in">
                                <div className="flex items-center justify-between gap-3 py-2">
                                    <span className="text-sm font-medium text-(--text-secondary)">Account</span>
                                    <UserButton />
                                </div>
                            </Show>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Navbar
