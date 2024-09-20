import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center justify-between px-4 md:px-6 border-t bg-background">
            <div className='text-center sm:text-start'>
                <h1 className='text-lg font-bold'>Mh Events</h1>
                <p className="text-xs">© 2023 Mh Inc. All rights reserved.</p>
            </div>
            <nav className="sm:ml-auto flex flex-wrap items-center space-x-4 sm:gap-6 flex-1 justify-center">
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                    About Us
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                    Contact
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                    Terms of Service
                </Link>
                <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                    Privacy
                </Link>
            </nav>
            <div className="flex items-center space-x-4">
                <Link href="#" className="">
                    <TwitterIcon className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="">
                    <GithubIcon className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                </Link>
                <Link href="#" className="">
                    <LinkedinIcon className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;