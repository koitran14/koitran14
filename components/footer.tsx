const Footer = () => {
    return (  
        <footer>
            <div className="mx-auto pb-8">
                <p className="text-center sm:text-sm text-[10px] text-slate-500">
                    &copy; {new Date().getFullYear()} Trần Ngọc Đăng Khôi, Inc. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
 
export default Footer;