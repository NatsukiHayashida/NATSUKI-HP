import Image from 'next/image'
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <div className='flex items-center '>
                <Image className=' rounded-full  my-1 ' src='/image/Rotti.svg' width={50} height={50} alt='logo' />
            </div>
        </Link>
    );
}