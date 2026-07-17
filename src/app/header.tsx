import Link from 'next/link';

export default () => {
    return (
        <header className='flex w-full justify-between'>
            <h3>Spring boot blog application</h3>
            <ul className='mx-4 flex justify-between gap-4'>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/users'>Users</Link>
                </li>
            </ul>
        </header>
    );
};
