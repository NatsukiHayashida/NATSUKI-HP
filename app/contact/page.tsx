// import Head from 'next/head';
import { Button } from '@/components/ui/button'; // 独自のButtonコンポーネントをインポート

export default function Contact() {
  return (
    <div className="container mx-auto  px-4 sm:px-6 lg:px-16 py-4">{/* パディングをレスポンシブに調整 */}
      <div className='py-4'>
        <h1 className="text-2xl text-center my-4">Contact Us</h1>
        <p className='mb-4 text-center text-muted-foreground'>
          Please fill this form in a decent manner.
        </p>
      </div>
      <form method="post" action="https://natsuki-hp.form.newt.so/v1/jAuz6cZim" className="w-full max-w-lg m-auto my-4">
 {/* 最大幅を調整 */}
        <div className="mb-4 ">
          <label htmlFor="name" className="block text-sm font-medium ">Name</label>
          <input
            type="text"
            id="name"
            name="Full name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="Email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium">Message</label>
          <textarea
            id="message"
            name="Message"
            rows={6}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
            required
          ></textarea>
        </div>
        <div className="flex justify-center"> {/* ボタンをX方向の中央配置 */}
          <Button type="submit" variant="default" className="py-2 px-4 border rounded-md shadow-sm text-sm font-medium">
            送信
          </Button>
        </div>
      </form>
    </div>
  );
}
